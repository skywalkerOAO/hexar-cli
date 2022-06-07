#! /usr/bin/env node

const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const chalk = require('chalk')
const clear = require('clear')
module.exports.clone = async function (repo, desc) {
    const download = promisify(require('download-git-repo'))
    const ora = require('ora')
    const process = ora(`正在下载模板....${repo}`)
    process.start()
    await download(repo, desc)
        .then(() => { 
                process.succeed() 
            })
        .catch(async () => {
            clear()
            const data = await figlet('FAILED!')
            console.log(chalk.red(data))
            console.log('下载模板失败,请检查网络并重试')
            process.fail()
        })

}