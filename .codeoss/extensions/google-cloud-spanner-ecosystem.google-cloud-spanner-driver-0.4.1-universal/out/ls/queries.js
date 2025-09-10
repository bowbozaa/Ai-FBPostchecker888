"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@sqltools/types");
const factory_1 = __importDefault(require("@sqltools/base-driver/dist/lib/factory"));
const describeTable = factory_1.default `
SELECT * FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_CATALOG = ''
  AND TABLE_SCHEMA  = '${p => p.schema}'
  AND TABLE_NAME    = '${p => p.label}'
`;
const fetchColumns = factory_1.default `
SELECT
  C.COLUMN_NAME AS label,
  C.TABLE_NAME AS table,
  C.TABLE_SCHEMA AS schema,
  '${p => p.database}' AS database,
  C.SPANNER_TYPE AS dataType,
  C.SPANNER_TYPE AS detail,
  CASE
    WHEN STRPOS(SPANNER_TYPE, '(')=0 THEN NULL
    ELSE CAST(REPLACE(SUBSTR(C.SPANNER_TYPE, STRPOS(C.SPANNER_TYPE, '(')+1, STRPOS(C.SPANNER_TYPE, ')')-STRPOS(C.SPANNER_TYPE, '(')-1), 'MAX', CASE WHEN UPPER(C.SPANNER_TYPE) LIKE '%STRING%' THEN '2621440' ELSE '10485760' END) AS INT64)
  END AS size,
  CAST(C.COLUMN_DEFAULT AS STRING) AS defaultValue,
  CASE WHEN C.IS_NULLABLE = 'YES' THEN TRUE ELSE FALSE END AS isNullable,
  FALSE AS isPk,
  FALSE AS isFk,
  '${types_1.ContextValue.COLUMN}' as type
FROM INFORMATION_SCHEMA.COLUMNS AS C
WHERE TABLE_CATALOG = ''
AND   TABLE_SCHEMA  = '${p => p.schema}'
AND   TABLE_NAME    = '${p => p.label}'
ORDER BY ORDINAL_POSITION ASC
`;
const fetchRecords = factory_1.default `
SELECT *
FROM ${p => (p.table.label || p.table)}
LIMIT ${p => p.limit || 50}
OFFSET ${p => p.offset || 0};
`;
const countRecords = factory_1.default `
SELECT count(1) AS total
FROM ${p => (p.table.label || p.table)};
`;
const fetchTablesAndViews = (type) => factory_1.default `
SELECT '${p => p.database}' AS database,
       TABLE_SCHEMA AS schema,
       TABLE_NAME  AS label,
       '${type}' AS type,
       ${type === types_1.ContextValue.VIEW ? 'TRUE' : 'FALSE'} AS isView
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_CATALOG = ''
AND   TABLE_SCHEMA  = '${p => p.schema}'
/* The default schema only contains tables, all other schemata only contain views. */
AND   CASE WHEN TABLE_SCHEMA='' THEN 'TABLE' ELSE 'VIEW' END = ${type === types_1.ContextValue.TABLE ? `'TABLE'` : `'VIEW'`}
ORDER BY TABLE_NAME
`;
const fetchTables = fetchTablesAndViews(types_1.ContextValue.TABLE);
const fetchViews = fetchTablesAndViews(types_1.ContextValue.VIEW);
const searchTables = factory_1.default `
SELECT CASE WHEN TABLE_SCHEMA='' THEN TABLE_NAME ELSE TABLE_SCHEMA || '.' || TABLE_NAME END AS label,
       CASE WHEN TABLE_SCHEMA='' THEN 'TABLE' ELSE 'VIEW' END AS type
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_CATALOG = ''
  ${p => p.search ? `AND (
    (TABLE_SCHEMA='' AND LOWER(TABLE_NAME) LIKE '%${p.search.toLowerCase()}%')
    OR
    (LOWER(TABLE_SCHEMA) || '.' || LOWER(TABLE_NAME)) LIKE '%${p.search.toLowerCase()}%'
  )`
    : ''}
ORDER BY TABLE_NAME
`;
const searchColumns = factory_1.default `
SELECT C.COLUMN_NAME AS label,
       C.TABLE_NAME AS table,
       C.SPANNER_TYPE AS dataType,
       CASE WHEN C.IS_NULLABLE = 'YES' THEN TRUE ELSE FALSE END AS isNullable,
       FALSE AS isPk,
       '${types_1.ContextValue.COLUMN}' as type
FROM INFORMATION_SCHEMA.COLUMNS C
WHERE 1 = 1
${p => p.tables.filter(t => !!t.label).length
    ? `AND LOWER(C.TABLE_NAME) IN (${p.tables.filter(t => !!t.label).map(t => `'${t.label}'`.toLowerCase()).join(', ')})`
    : ''}
${p => p.search
    ? `AND (
    LOWER(C.TABLE_NAME || '.' || C.COLUMN_NAME) LIKE '%${p.search.toLowerCase()}%'
    OR LOWER(C.COLUMN_NAME) LIKE '%${p.search.toLowerCase()}%'
  )`
    : ''}
ORDER BY C.COLUMN_NAME ASC, C.ORDINAL_POSITION ASC
LIMIT ${p => p.limit || 100}
`;
const fetchSchemas = factory_1.default `
SELECT
  CASE WHEN SCHEMA_NAME = '' THEN '(default)' ELSE SCHEMA_NAME END AS label,
  SCHEMA_NAME AS schema,
  '${types_1.ContextValue.SCHEMA}' as type,
  'group-by-ref-type' as iconId,
  '${p => p.database}' as database
FROM INFORMATION_SCHEMA.SCHEMATA
`;
exports.default = {
    describeTable,
    countRecords,
    fetchColumns,
    fetchRecords,
    fetchSchemas,
    fetchTables,
    fetchViews,
    searchTables,
    searchColumns
};
//# sourceMappingURL=queries.js.map