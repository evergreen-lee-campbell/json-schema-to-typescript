"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var ava_1 = require("ava");
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var path_1 = require("path");
var rimraf = require("rimraf");
function run() {
    ava_1.serial('pipe in, pipe out', function (t) {
        t.snapshot(child_process_1.execSync('shx cat ./test/resources/ReferencedType.json | node dist/src/cli.js', { encoding: 'utf-8' }).toString());
    });
    ava_1.serial('pipe in (schema without ID), pipe out', function (t) {
        t.snapshot(child_process_1.execSync('shx cat ./test/resources/ReferencedTypeWithoutID.json | node dist/src/cli.js', {
            encoding: 'utf-8'
        }).toString());
    });
    ava_1.serial('file in (no flags), pipe out', function (t) {
        t.snapshot(child_process_1.execSync('node dist/src/cli.js ./test/resources/ReferencedType.json').toString());
    });
    ava_1.serial('file in (--input), pipe out', function (t) {
        t.snapshot(child_process_1.execSync('node dist/src/cli.js --input ./test/resources/ReferencedType.json').toString());
    });
    ava_1.serial('file in (-i), pipe out', function (t) {
        t.snapshot(child_process_1.execSync('node dist/src/cli.js -i ./test/resources/ReferencedType.json').toString());
    });
    ava_1.serial('file in (-i), unreachable definitions flag, pipe out', function (t) {
        t.snapshot(child_process_1.execSync('node dist/src/cli.js -i ./test/resources/DefinitionsOnly.json --unreachableDefinitions').toString());
    });
    ava_1.serial('file in (-i), style flags, pipe out', function (t) {
        t.snapshot(child_process_1.execSync('node dist/src/cli.js -i ./test/resources/Enum.json --style.singleQuote --no-style.semi').toString());
    });
    ava_1.serial('file in (-i), pipe out (absolute path)', function (t) {
        t.snapshot(child_process_1.execSync("node dist/src/cli.js -i " + __dirname + "/../../test/resources/ReferencedType.json").toString());
    });
    ava_1.serial('pipe in, file out (--output)', function (t) {
        child_process_1.execSync('shx cat ./test/resources/ReferencedType.json | node dist/src/cli.js --output ./ReferencedType.d.ts');
        t.snapshot(fs_1.readFileSync('./ReferencedType.d.ts', 'utf-8'));
        fs_1.unlinkSync('./ReferencedType.d.ts');
    });
    ava_1.serial('pipe in, file out (-o)', function (t) {
        child_process_1.execSync('shx cat ./test/resources/ReferencedType.json | node dist/src/cli.js -o ./ReferencedType.d.ts');
        t.snapshot(fs_1.readFileSync('./ReferencedType.d.ts', 'utf-8'));
        fs_1.unlinkSync('./ReferencedType.d.ts');
    });
    ava_1.serial('file in (no flags), file out (no flags)', function (t) {
        child_process_1.execSync('node dist/src/cli.js ./test/resources/ReferencedType.json ./ReferencedType.d.ts');
        t.snapshot(fs_1.readFileSync('./ReferencedType.d.ts', 'utf-8'));
        fs_1.unlinkSync('./ReferencedType.d.ts');
    });
    ava_1.serial('file in (-i), file out (-o)', function (t) {
        child_process_1.execSync('node dist/src/cli.js -i ./test/resources/ReferencedType.json -o ./ReferencedType.d.ts');
        t.snapshot(fs_1.readFileSync('./ReferencedType.d.ts', 'utf-8'));
        fs_1.unlinkSync('./ReferencedType.d.ts');
    });
    ava_1.serial('file in (--input), file out (--output)', function (t) {
        child_process_1.execSync('node dist/src/cli.js --input ./test/resources/ReferencedType.json --output ./ReferencedType.d.ts');
        t.snapshot(fs_1.readFileSync('./ReferencedType.d.ts', 'utf-8'));
        fs_1.unlinkSync('./ReferencedType.d.ts');
    });
    ava_1.serial('--unknownAny', function (t) {
        t.snapshot(child_process_1.execSync('node dist/src/cli.js --unknownAny=false --input ./test/resources/ReferencedType.json').toString());
    });
    ava_1.serial('files in (-i), files out (-o)', function (t) {
        child_process_1.execSync("node dist/src/cli.js -i './test/resources/MultiSchema/**/*.json' -o ./test/resources/MultiSchema/out");
        fs_1.readdirSync('./test/resources/MultiSchema/out').forEach(function (f) {
            var path = "./test/resources/MultiSchema/out/" + f;
            t.snapshot(path);
            t.snapshot(fs_1.readFileSync(path, 'utf-8'));
            fs_1.unlinkSync(path);
        });
        rimraf.sync('./test/resources/MultiSchema/out');
    });
    ava_1.serial('files in (-i), pipe out', function (t) {
        t.snapshot(child_process_1.execSync("node dist/src/cli.js -i './test/resources/MultiSchema/**/*.json'").toString());
    });
    ava_1.serial('files in (-i), files out (-o) nested dir does not exist', function (t) {
        child_process_1.execSync("node dist/src/cli.js -i './test/resources/MultiSchema/**/*.json' -o ./test/resources/MultiSchema/foo/bar/out");
        fs_1.readdirSync('./test/resources/MultiSchema/foo/bar/out').forEach(function (f) {
            var path = "./test/resources/MultiSchema/foo/bar/out/" + f;
            t.snapshot(path);
            t.snapshot(fs_1.readFileSync(path, 'utf-8'));
            fs_1.unlinkSync(path);
        });
        rimraf.sync('./test/resources/MultiSchema/foo');
    });
    ava_1.serial('files in (-i), files out (-o) matching nested dir', function (t) {
        child_process_1.execSync("node dist/src/cli.js -i './test/resources/../../test/resources/MultiSchema2/' -o ./test/resources/MultiSchema2/out");
        getPaths('./test/resources/MultiSchema2/out').forEach(function (file) {
            t.snapshot(file);
            t.snapshot(fs_1.readFileSync(file, 'utf-8'));
            fs_1.unlinkSync(file);
        });
        rimraf.sync('./test/resources/MultiSchema2/out');
    });
}
exports.run = run;
function getPaths(path, paths) {
    if (paths === void 0) { paths = []; }
    if (fs_1.existsSync(path) && fs_1.lstatSync(path).isDirectory()) {
        fs_1.readdirSync(path_1.resolve(path)).forEach(function (item) { return getPaths(path_1.join(path, item), paths); });
    }
    else {
        paths.push(path);
    }
    return paths;
}
//# sourceMappingURL=testCLI.js.map