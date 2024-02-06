"use strict";

import {build} from 'unbuild';
import {copyFile} from "node:fs";

const umdGenerate = {
    entries: [{
        builder: 'rollup',
        input: 'build/plain/json-cache.cjs',
        name: 'json-cache'
    }],
    outDir: 'lib',
    clean: true,
    declaration: false,
    failOnWarn: false,
    rollup: {
        emitCJS: true,
        output: {
            dir: 'lib',
            strict: true,
            generatedCode: {
                arrowFunctions: true,
                constBindings: true,
                objectShorthand: true,
                symbols: true,
            },
            extend: true,
            interop: 'auto',
            validate: true,
            exports: "auto",
            minifyInternalExports: true,
            name: 'SimplyBuilder',
            format: 'umd',
            entryFileNames: "json-cache.min.umd.js",
            compact: true,
        },
        esbuild: {
            minify: true,
            keepNames: true
        }
    },
    hooks: {
        "build:done": () => {
            copyFile('lib/json-cache.min.umd.js', 'lib/json-cache.min.umd.cjs', (r) => r);
            copyFile('lib/json-cache.min.umd.js', 'lib/json-cache.min.umd.mjs', (r) => r);
            copyFile('build/min/json-cache.cjs', 'lib/json-cache.min.common.cjs', (r) => r);
            copyFile('build/min/json-cache.mjs', 'lib/json-cache.min.esm.mjs', (r) => r);
            copyFile('build/docs/json-cache.d.ts', 'lib/json-cache.d.ts', (r) => r);
        }
    }
}
const plainMinify = {
    entries: [{
        builder: 'rollup',
        input: 'build/plain/json-cache.cjs',
        name: 'json-cache'
    }],
    outDir: 'build/min',
    clean: true,
    declaration: false,
    failOnWarn: false,
    rollup: {
        emitCJS: true,
        output: {
            dir: 'build/min',
            name: 'json-cache',
        },
        esbuild: {
            minify: true,
            keepNames: true
        }
    },
    hooks: {
        "build:done": ctx => {
            console.log("build/min/json-cache.min.cjs done");
        }
    }
};
const plainGenerate = {
    entries: [{
        builder: 'rollup',
        input: 'src/main.cjs',
        name: 'json-cache'
    }],
    outDir: 'build/plain',
    clean: true,
    declaration: false,
    failOnWarn: false,
    rollup: {
        inlineDependencies: true,
        emitCJS: true,
        output: {
            dir: 'build/plain',
            strict: true,
            generatedCode: {
                arrowFunctions: true,
                constBindings: true,
                objectShorthand: true,
                symbols: true,
            },
            interop: 'auto',
            validate: true,
            noConflict: true,
            exports: "named",
            minifyInternalExports: true,
            name: 'json-cache',
            format: 'cjs',
            entryFileNames: "json-cache.[format]",
            compact: true,
        }
    },
    hooks: {
        "build:done": ctx => {
            console.log("build/plain/json-cache.cjs done");
        }
    }
};
const docsGenerate = {
    entries: [{
        builder: 'untyped',
        input: 'src/main.cjs',
        name: 'json-cache'
    }],
    outDir: 'build/docs',
    clean: true,
    declaration: "node20",
    failOnWarn: false,
    rollup: {
        emitCJS: true
    },
    hooks: {
        "build:done": ctx => {
            console.log("docs done");
        }
    }
}

const umdGenerateAndLib = () => {
    build('.', false, umdGenerate).then();
}
const minFilesGenerate = () => {
    build('.', false, plainMinify).then(umdGenerateAndLib);
}
const plainCommonGenerate = () => {
    build('.', false, plainGenerate).then(minFilesGenerate);
}

const buildDocs = () => {
    build('.', false, docsGenerate).then(plainCommonGenerate);
}

buildDocs();