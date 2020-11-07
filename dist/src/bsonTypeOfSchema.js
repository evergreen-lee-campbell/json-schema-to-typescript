"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bsonTypeOfSchema = void 0;
var typeOfSchema_1 = require("./typeOfSchema");
// a map to convert BSON Types to JSON Types as per:
// https://docs.mongodb.com/manual/reference/operator/query/type/#document-type-available-types
// where MongoDB $types are missing from the map, they have no appropriate JSON Schema type, and 
// will be handled by the default type-mapping. 
var bsonTypeToJsonType = new Map();
bsonTypeToJsonType.set("double", "number");
bsonTypeToJsonType.set("binData", "string"); // need to consider `contentEncoding` and `contentMediaType`
bsonTypeToJsonType.set("bool", "boolean");
bsonTypeToJsonType.set("int", "number");
bsonTypeToJsonType.set("long", "number");
bsonTypeToJsonType.set("objectId", "any");
function bsonTypeOfSchema(schema) {
    if (!schema.bsonType)
        return typeOfSchema_1.typeOfSchema(schema);
    switch (schema.bsonType) {
        default:
            if (!schema.type && bsonTypeToJsonType.get(schema.bsonType) !== undefined) {
                schema.type = bsonTypeToJsonType.get(schema.bsonType);
            }
            return typeOfSchema_1.typeOfSchema(schema);
    }
}
exports.bsonTypeOfSchema = bsonTypeOfSchema;
//# sourceMappingURL=bsonTypeOfSchema.js.map