"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpannerQueryParser = exports.StatementType = void 0;
var StatementType;
(function (StatementType) {
    StatementType[StatementType["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    StatementType[StatementType["QUERY"] = 1] = "QUERY";
    StatementType[StatementType["DML"] = 2] = "DML";
    StatementType[StatementType["DDL"] = 3] = "DDL";
})(StatementType = exports.StatementType || (exports.StatementType = {}));
class SpannerQueryParser {
    static getStatementType(sql) {
        if (!sql) {
            return StatementType.UNSPECIFIED;
        }
        const statement = SpannerQueryParser.getFirstKeywordOutsideComments(sql).toUpperCase();
        if (statement.startsWith('SELECT') || statement.startsWith('WITH')) {
            return StatementType.QUERY;
        }
        if (statement.startsWith('INSERT') || statement.startsWith('UPDATE') || statement.startsWith('DELETE')) {
            return StatementType.DML;
        }
        if (statement.startsWith('CREATE') || statement.startsWith('ALTER') || statement.startsWith('DROP')) {
            return StatementType.DDL;
        }
        return StatementType.UNSPECIFIED;
    }
    static getFirstKeywordOutsideComments(sql) {
        var charArray = Array.from(sql);
        var nextChar = null;
        var isInComment = false;
        var commentChar = null;
        var keyword = '';
        for (var index = 0; index < charArray.length; index++) {
            var char = charArray[index];
            if ((index + 1) < charArray.length) {
                nextChar = charArray[index + 1];
            }
            else {
                nextChar = null;
            }
            if (((char == '#' && nextChar == ' ') || (char == '-' && nextChar == '-') || (char == '/' && nextChar == '*'))) {
                isInComment = true;
                commentChar = char;
                continue;
            }
            if (isInComment == true &&
                (((commentChar == '#' || commentChar == '-') && char == '\n') ||
                    (commentChar == '/' && (char == '*' && nextChar == '/')))) {
                if (commentChar == '/') {
                    index++;
                }
                isInComment = false;
                commentChar = null;
                continue;
            }
            if (isInComment == false) {
                if (char.trim() == '') {
                    if (keyword == '') {
                        continue;
                    }
                    return keyword;
                }
                keyword = keyword + char;
            }
        }
        return keyword;
    }
    static parse(query) {
        const delimiter = ';';
        var queries = [];
        var flag = true;
        while (flag) {
            if (restOfQuery == null) {
                restOfQuery = query;
            }
            var statementAndRest = SpannerQueryParser.getStatements(restOfQuery, delimiter);
            var statement = statementAndRest[0];
            if (statement != null && statement.trim() != '') {
                queries.push(statement);
            }
            var restOfQuery = statementAndRest[1];
            if (restOfQuery == null || restOfQuery.trim() == '') {
                break;
            }
        }
        return queries;
    }
    static getStatements(query, delimiter) {
        var charArray = Array.from(query);
        var previousChar = null;
        var nextChar = null;
        var isInComment = false;
        var commentChar = null;
        var isInString = false;
        var stringChar = null;
        var isInTripleQuotes = false;
        var resultQueries = [];
        for (var index = 0; index < charArray.length; index++) {
            var char = charArray[index];
            if (index > 0) {
                previousChar = charArray[index - 1];
            }
            if ((index + 1) < charArray.length) {
                nextChar = charArray[index + 1];
            }
            else {
                nextChar = null;
            }
            if (previousChar != '\\' && (char == "'" || char == '"' || char == '`') && isInString == false && isInComment == false) {
                isInString = true;
                stringChar = char;
                if ((index + 2) < charArray.length) {
                    if (charArray[index + 1] == char && charArray[index + 2] == char) {
                        index += 2;
                        isInTripleQuotes = true;
                    }
                }
                continue;
            }
            if (((char == '#' && nextChar == ' ') || (char == '-' && nextChar == '-') || (char == '/' && nextChar == '*')) &&
                isInString == false) {
                isInComment = true;
                commentChar = char;
                continue;
            }
            if (isInComment == true &&
                (((commentChar == '#' || commentChar == '-') && char == '\n') ||
                    (commentChar == '/' && (char == '*' && nextChar == '/')))) {
                isInComment = false;
                commentChar = null;
                continue;
            }
            if (previousChar != '\\' && char == stringChar && isInString == true) {
                if (isInTripleQuotes) {
                    if ((index + 2) < charArray.length && charArray[index + 1] == char && charArray[index + 2] == char) {
                        index += 2;
                        isInTripleQuotes = false;
                    }
                    else {
                        continue;
                    }
                }
                isInString = false;
                stringChar = null;
                continue;
            }
            if ((char.toLowerCase() === delimiter.toLowerCase()) &&
                isInString == false &&
                isInComment == false) {
                var splittingIndex = index + 1;
                resultQueries = SpannerQueryParser.getQueryParts(query, splittingIndex, 0);
                break;
            }
        }
        if (resultQueries.length == 0) {
            if (query != null) {
                query = query.trim();
            }
            resultQueries.push(query, null);
        }
        return resultQueries;
    }
    static getQueryParts(query, splittingIndex, numChars = 1) {
        var statement = query.substring(0, splittingIndex - 1);
        var restOfQuery = query.substring(splittingIndex + numChars);
        var result = [];
        if (statement != null) {
            statement = statement.trim();
        }
        result.push(statement);
        result.push(restOfQuery);
        return result;
    }
}
exports.SpannerQueryParser = SpannerQueryParser;
//# sourceMappingURL=parser.js.map