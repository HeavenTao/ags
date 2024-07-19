const entry = App.configDir + "/main.ts"
const cli = App.configDir + "/cli/index.ts"
const outdir = App.configDir + '/dist'

try {
    console.log("Start Building ts")
    await Utils.execAsync([
        'bun', 'build', entry,
        '--outdir', outdir,
        '--external', 'resource://*',
        '--external', 'gi://*'
    ])
    console.log("End Building ts")

    console.log("Start Building scss")
    await Utils.execAsync([
        'bun', 'run', cli, App.configDir
    ])
    console.log("End Building scss")

    console.log("Start")
    await import(`file://${outdir}/main.js`)

} catch (error) {
    console.error(error)
}
