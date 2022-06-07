#!/usr/bin/env node

const program = require('commander')
const version = require("../package.json").version;
const init = require('./hexar-init')

program.version(version, "-v, --version")

program
    .command("init")
    .description("使用 hexar-cli 初始化项目")
    .action(() => {
        init()
    })


program.parse(process.argv)

