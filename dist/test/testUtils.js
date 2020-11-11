"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var ava_1 = require("ava");
var utils_1 = require("../src/utils");
function run() {
    ava_1.serial('pathTransform', function (t) {
        t.is(utils_1.pathTransform('types', 'schemas', 'schemas/foo/a.json'), 'types/foo');
        t.is(utils_1.pathTransform('./schemas/types', './schemas', 'schemas/foo/bar/a.json'), 'schemas/types/foo/bar');
        t.is(utils_1.pathTransform('types', './src/../types/../schemas', 'schemas/foo/a.json'), 'types/foo');
    });
    ava_1.serial('generateName', function (t) {
        var usedNames = new Set();
        t.is(utils_1.generateName('a', usedNames), 'A');
        t.is(utils_1.generateName('abc', usedNames), 'Abc');
        t.is(utils_1.generateName('ABcd', usedNames), 'ABcd');
        t.is(utils_1.generateName('$Abc_123', usedNames), '$Abc_123');
        t.is(utils_1.generateName('Abc-de-f', usedNames), 'AbcDeF');
        // Index should increment:
        t.is(utils_1.generateName('a', usedNames), 'A1');
        t.is(utils_1.generateName('a', usedNames), 'A2');
        t.is(utils_1.generateName('a', usedNames), 'A3');
    });
}
exports.run = run;
//# sourceMappingURL=testUtils.js.map