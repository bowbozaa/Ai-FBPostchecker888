"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_driver_1 = __importDefault(require("@sqltools/base-driver"));
const queries_1 = __importDefault(require("./queries"));
const types_1 = require("@sqltools/types");
const uuid_1 = require("uuid");
const spanner_1 = require("@google-cloud/spanner");
const google_gax_1 = require("google-gax");
const parser_1 = require("./parser");
const DEFAULT_MAX_QUERY_RESULTS = 100000;
class CloudSpannerDriver extends base_driver_1.default {
    constructor() {
        super(...arguments);
        this.queries = queries_1.default;
        this.query = async (queries, opt = {}) => {
            const db = await this.open();
            const resultsAgg = [];
            const statementsArray = parser_1.SpannerQueryParser.parse(queries.toString());
            for (const sql of statementsArray) {
                const statementType = parser_1.SpannerQueryParser.getStatementType(sql);
                switch (statementType) {
                    case parser_1.StatementType.QUERY:
                        resultsAgg.push(await this.executeQuery(db, sql, opt));
                        break;
                    case parser_1.StatementType.DML:
                        resultsAgg.push(await this.executeDml(db, sql, opt));
                        break;
                    case parser_1.StatementType.DDL:
                        resultsAgg.push(await this.executeDdl(db, sql, opt));
                        break;
                    case parser_1.StatementType.UNSPECIFIED:
                        throw new Error(`Unsupported statement: ${sql}`);
                }
            }
            return resultsAgg;
        };
        this.sqlKeywords = 'SELECT,WITH,INSERT,UPDATE,DELETE,CREATE,ALTER,DROP';
        this.numericFunctions = "ABS,SIGN,IS_INF,IS_NAN,IEEE_DIVIDE,SQRT,POW,POWER,EXP,LN,LOG,LOG10,GREATEST,LEAST,DIV,MOD,ROUND,TRUNC,CEIL,CEILING,FLOOR,COS,COSH,ACOS,ACOSH,SIN,SINH,ASIN,ASINH,TAN,TANH,ATAN,ATANH,ATAN2,FARM_FINGERPRINT,SHA1,SHA256,SHA512";
        this.stringFunctions = "BYTE_LENGTH,CHAR_LENGTH,CHARACTER_LENGTH,CODE_POINTS_TO_BYTES,CODE_POINTS_TO_STRING,CONCAT,ENDS_WITH,FORMAT,FROM_BASE64,FROM_HEX,LENGTH,LPAD,LOWER,LTRIM,REGEXP_CONTAINS,REGEXP_EXTRACT,REGEXP_EXTRACT_ALL,REGEXP_REPLACE,REPLACE,REPEAT,REVERSE,RPAD,RTRIM,SAFE_CONVERT_BYTES_TO_STRING,SPLIT,STARTS_WITH,STRPOS,SUBSTR,TO_BASE64,TO_CODE_POINTS,TO_HEX,TRIM,UPPER,JSON_QUERY,JSON_VALUE";
        this.dateFunctions = "CURRENT_DATE,EXTRACT,DATE,DATE_ADD,DATE_SUB,DATE_DIFF,DATE_TRUNC,DATE_FROM_UNIX_DATE,FORMAT_DATE,PARSE_DATE,UNIX_DATE,CURRENT_TIMESTAMP,STRING,TIMESTAMP,TIMESTAMP_ADD,TIMESTAMP_SUB,TIMESTAMP_DIFF,TIMESTAMP_TRUNC,FORMAT_TIMESTAMP,PARSE_TIMESTAMP,TIMESTAMP_SECONDS,TIMESTAMP_MILLIS,TIMESTAMP_MICROS,UNIX_SECONDS,UNIX_MILLIS,UNIX_MICROS";
        this.completionsCache = null;
        this.getStaticCompletions = async () => {
            if (this.completionsCache)
                return this.completionsCache;
            this.completionsCache = {};
            const allFunctions = this.sqlKeywords + ',' + this.numericFunctions + ',' + this.stringFunctions + ',' + this.dateFunctions;
            allFunctions.split(',').forEach(f => {
                this.completionsCache[f] = {
                    label: f,
                    detail: f,
                    filterText: f,
                    sortText: (this.sqlKeywords.includes(f) ? '2:' : '') + f,
                    documentation: {
                        kind: 'markdown',
                        value: f,
                    },
                };
            });
            return this.completionsCache;
        };
    }
    async open() {
        if (this.connection) {
            return this.connection;
        }
        let options = {};
        options.projectId = this.credentials.project;
        options.keyFile = this.credentials.credentialsKeyFile;
        if (this.credentials.connectToEmulator) {
            options = Object.assign(options, {
                servicePath: this.credentials.emulatorHost || 'localhost',
                port: +(this.credentials.emulatorPort || '9010'),
                sslCreds: google_gax_1.grpc.credentials.createInsecure(),
            });
        }
        const spanner = new spanner_1.Spanner(options);
        const instance = spanner.instance(this.credentials.instance);
        if (this.credentials.connectToEmulator) {
            const [exists] = await instance.exists();
            if (!exists) {
                const [, operation] = await instance.create({
                    config: 'emulator-config',
                    nodes: 1,
                    displayName: 'Auto-created emulator instance',
                });
                await operation.promise();
            }
        }
        if (this.credentials.connectToEmulator) {
            const database = instance.database(this.credentials.database, { min: 0 });
            const [exists] = await database.exists();
            if (!exists) {
                const [, operation] = await instance.createDatabase(this.credentials.database);
                await operation.promise();
            }
        }
        this.credentials.maxQueryResults = this.credentials.maxQueryResults || DEFAULT_MAX_QUERY_RESULTS;
        const database = instance.database(this.credentials.database);
        this._databaseId = this.credentials.database;
        this.connection = Promise.resolve(database);
        return this.connection;
    }
    async close() {
        if (!this.connection)
            return Promise.resolve();
        const database = await this.connection;
        await database.close();
        this.connection = null;
    }
    async executeQuery(db, sql, opt) {
        const countQuery = `SELECT COUNT(*) FROM (${sql})`;
        const [count] = await db.run(countQuery);
        const recordCount = count[0][0].value.value;
        if (recordCount > this.credentials.maxQueryResults) {
            return {
                cols: ['Error'],
                connId: this.getId(),
                messages: [{ date: new Date(), message: `Query result is too large with ${recordCount} results. Limit the query results to max ${this.credentials.maxQueryResults} and rerun the query.` }],
                results: [{ Error: `Query result is too large with ${recordCount} results. Limit the query results to max ${this.credentials.maxQueryResults} and rerun the query.` }],
                query: sql,
                requestId: opt.requestId,
                resultId: uuid_1.v4(),
            };
        }
        const [rows, , metadata] = await db.run({ sql, json: true, jsonOptions: { wrapNumbers: true, includeNameless: true } });
        const cols = metadata.rowType.fields.map((field, index) => field.name ? field.name : `_${index}`);
        return {
            cols,
            connId: this.getId(),
            messages: [{ date: new Date(), message: `Query ok with ${rows.length} results` }],
            results: this.mapRows(rows, cols),
            query: sql,
            requestId: opt.requestId,
            resultId: uuid_1.v4(),
        };
    }
    async executeDml(db, sql, opt) {
        const [rowCount] = await db.runTransactionAsync(async (transaction) => {
            const count = await transaction.runUpdate(sql);
            await transaction.commit();
            return count;
        });
        return {
            cols: ['rowCount'],
            connId: this.getId(),
            messages: [{ date: new Date(), message: `Update ok with ${rowCount} updated rows` }],
            results: [{ rowCount }],
            query: sql,
            requestId: opt.requestId,
            resultId: uuid_1.v4(),
        };
    }
    async executeDdl(db, sql, opt) {
        const [operation] = await db.updateSchema({ statements: [sql] });
        await new Promise(function (resolve, reject) {
            operation.on("complete", resolve);
            operation.on("error", reject);
        });
        return {
            cols: ['Result'],
            connId: this.getId(),
            messages: [{ date: new Date(), message: `DDL statement executed successfully` }],
            results: [{ Result: 'Success' }],
            query: sql,
            requestId: opt.requestId,
            resultId: uuid_1.v4(),
        };
    }
    mapRows(rows, columns) {
        return rows.map((r) => {
            columns.forEach((col) => {
                if (r[col] && r[col].value) {
                    r[col] = r[col].value;
                }
            });
            return r;
        });
    }
    async testConnection() {
        await this.open();
        await this.query('SELECT 1', {});
    }
    async getChildrenForItem({ item, parent }) {
        switch (item.type) {
            case types_1.ContextValue.CONNECTION:
            case types_1.ContextValue.CONNECTED_CONNECTION:
                return this.queryResults(queries_1.default.fetchSchemas({ database: this._databaseId }));
            case types_1.ContextValue.SCHEMA:
                return [
                    { label: 'Tables', type: types_1.ContextValue.RESOURCE_GROUP, iconId: 'folder', childType: types_1.ContextValue.TABLE },
                    { label: 'Views', type: types_1.ContextValue.RESOURCE_GROUP, iconId: 'folder', childType: types_1.ContextValue.VIEW },
                ];
            case types_1.ContextValue.TABLE:
            case types_1.ContextValue.VIEW:
                return this.queryResults(queries_1.default.fetchColumns(item));
            case types_1.ContextValue.RESOURCE_GROUP:
                return this.getChildrenForGroup({ item, parent });
        }
        return [];
    }
    async getChildrenForGroup({ parent, item }) {
        switch (item.childType) {
            case types_1.ContextValue.TABLE:
                return this.queryResults(queries_1.default.fetchTables(parent));
            case types_1.ContextValue.VIEW:
                return this.queryResults(queries_1.default.fetchViews(parent));
        }
        return [];
    }
    async searchItems(itemType, search, _extraParams = {}) {
        switch (itemType) {
            case types_1.ContextValue.TABLE:
            case types_1.ContextValue.VIEW:
                return this.queryResults(queries_1.default.searchTables({ search }));
            case types_1.ContextValue.COLUMN:
                return this.queryResults(queries_1.default.searchColumns({ search, ..._extraParams }));
        }
        return [];
    }
}
exports.default = CloudSpannerDriver;
//# sourceMappingURL=driver.js.map