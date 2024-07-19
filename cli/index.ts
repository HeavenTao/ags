import { readFile, writeFile } from "node:fs/promises"
import { $, Glob } from "bun"
import { basename, extname } from 'path'

const appDir = process.argv[2]

async function clearDist(exclude: string[] = []) {
    console.log("ClearDist...")
    const glob = new Glob(`${appDir}/dist/*.css`)
    for await (const file of glob.scan(".")) {
        let fileName = basename(file)
        if (!exclude.includes(fileName)) {
            await $`rm ${file}`
            console.log(`   delete ${file}`)
        }
    }
    console.log("ClearDist Done!")
}

async function buildSass() {
    console.log("Start Building ...")

    const glob = new Glob(`${appDir}/**/*.scss`)
    for await (const file of glob.scan(".")) {
        let name = basename(file)
        name = name.replace(extname(name), '')
        await $`sass --no-source-map ${file}:${appDir}/dist/${name}.css`
        console.log(`   build ${file} to ${appDir}/dist/${name}`)
    }
    console.log("Build Done!")
}

async function mergeCss() {
    console.log("Start Meger ...")
    let content = ''
    const glob = new Glob(`${appDir}/dist/*.css`)
    for await (const file of glob.scan(".")) {
        const text = await readFile(file)
        content += text;
        console.log(`   Merge ${file}`)
    }
    await writeFile(`${appDir}/dist/style.css`, content)
    console.log("Merger Done!")
}

await clearDist()
await buildSass()
await mergeCss()
await clearDist(['style.css'])

