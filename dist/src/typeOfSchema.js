"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOfSchema = void 0;
var lodash_1 = require("lodash");
/**
 * Duck types a JSONSchema schema or property to determine which kind of AST node to parse it into.
 */
function typeOfSchema(schema) {
    if (schema.tsType)
        return 'CUSTOM_TYPE';
    if (schema.allOf)
        return 'ALL_OF';
    if (schema.anyOf)
        return 'ANY_OF';
    if (schema.oneOf)
        return 'ONE_OF';
    if (Array.isArray(schema.type))
        return 'UNION';
    if (schema.type === 'null')
        return 'NULL';
    if (schema.enum && schema.tsEnumNames)
        return 'NAMED_ENUM';
    if (schema.enum)
        return 'UNNAMED_ENUM';
    if (schema.$ref)
        return 'REFERENCE';
    switch (schema.type) {
        case 'string':
            switch (schema.format) {
                case 'date-time':
                    return 'DATE';
                default:
                    return 'STRING';
            }
        case 'number':
            return 'NUMBER';
        case 'integer':
            return 'NUMBER';
        case 'boolean':
            return 'BOOLEAN';
        case 'object':
            if (!lodash_1.isPlainObject(schema.additionalProperties) && !schema.patternProperties && !schema.properties) {
                return 'UNNAMED_SCHEMA';
            }
            break;
        case 'array':
            if (schema.items)
                return 'TYPED_ARRAY';
            return 'UNTYPED_ARRAY';
        case 'any':
            return 'ANY';
    }
    if (schema.items)
        return 'TYPED_ARRAY';
    switch (typeof schema.default) {
        case 'boolean':
            return 'BOOLEAN';
        case 'number':
            return 'NUMBER';
        case 'string':
            return 'STRING';
    }
    if (schema.id)
        return 'NAMED_SCHEMA';
    if (lodash_1.isPlainObject(schema) && Object.keys(schema).length)
        return 'UNNAMED_SCHEMA';
    return 'ANY';
}
exports.typeOfSchema = typeOfSchema;
//# sourceMappingURL=typeOfSchema.js.map