#!/usr/bin/env node

/* 变量声明 */
var inquirer = require('inquirer')
var state = 0
var errmsg = ''
const fs = require('fs');
const clear = require('clear')
const chalk = require('chalk')
const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const { clone } = require('./download')
const ora = require('ora')
/* 函数声明 */
const success = async (Name) => {
    clear()
    const data = await figlet('DONE!')
    console.log(chalk.green(data))
    console.log('💖💖💖💖💖💖💖💖💖💖')
    console.log(chalk.green(`cd ${Name}`))
    console.log('')
    console.log(chalk.green('npm start'))
    console.log('')
    console.log(chalk.green('enjoy hacking!'))
    console.log("💖💖💖💖💖💖💖💖💖💖")

}
const failed = async (err) => {
    clear()
    const data = await figlet('FAILED!')
    console.log(chalk.red(data))
    console.log('安装依赖失败,过程中可能存在安装问题,以下为错误详情')
    console.log(err)
}
const spawn = async (...args) => {
    const { spawn } = require('child_process')
    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.on('data', (data) => {
            state = 1
            resolve()
        })
        proc.stderr.on('data', (data) => {
            errmsg = data
            resolve()
        })
    })
}
const insDependies = async (Name) => {
    const orap = ora('安装依赖中')
    orap.start()
    await spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], { cwd: `./${Name}` })
    orap.stop()
    if (state == 1) {
        clear()
        success(Name)
        return
    } else {
        clear()
        failed(errmsg)
        return
    }
}
const chooseModel = async (Options) => {
    const Name = Options.appName
    const Language = Options.Language
    if (Language == 'TypeScript') {
        await clone('github:skywalkerOAO/TSTemplete', Name)
        if (fs.existsSync(`./${Name}`)) {
            insDependies(Name)
        }
    } else {
        await clone('github:skywalkerOAO/JSTemplete', Name)
        if (fs.existsSync(`./${Name}`)) {
            insDependies(Name)
        }
    }
}
/* 主函数 */
module.exports = async () => {
    clear()
    const data = await figlet('Hexar-XSDL')
    console.log(chalk.green(data))
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'appName',
                message: '请输入名称',
            },
            {
                type: 'rawlist',
                name: 'Language',
                message: '请选择语言',
                default: 'JavaScript',
                choices: ['JavaScript', 'TypeScript']
            },
        ])
        .then(answers => {
            chooseModel(answers)
        })

}