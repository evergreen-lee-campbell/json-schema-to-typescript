import { JSONSchema, SCHEMA_TYPE } from "./types/JSONSchema";
import { typeOfSchema } from "./typeOfSchema";
import { JSONSchema4TypeName } from "json-schema";

// a map to convert BSON Types to JSON Types as per:
// https://docs.mongodb.com/manual/reference/operator/query/type/#document-type-available-types
// where MongoDB $types are missing from the map, they have no appropriate JSON Schema type, and 
// will be handled by the default type-mapping. 
const bsonTypeToJsonType: Map<string, JSONSchema4TypeName> = new Map<string, JSONSchema4TypeName>();
bsonTypeToJsonType.set("double", "number");
bsonTypeToJsonType.set("binData", "string");  // need to consider `contentEncoding` and `contentMediaType`
bsonTypeToJsonType.set("bool", "boolean");
bsonTypeToJsonType.set("int", "number");
bsonTypeToJsonType.set("long", "number");
bsonTypeToJsonType.set("objectId", "any");

export function bsonTypeOfSchema (schema: JSONSchema): SCHEMA_TYPE {
  if (!schema.bsonType) return typeOfSchema(schema);

  switch(schema.bsonType) {
    default:
      if (!schema.type && bsonTypeToJsonType.get(schema.bsonType) !== undefined) {
        schema.type = bsonTypeToJsonType.get(schema.bsonType);
      }

      return typeOfSchema(schema);
  }
}