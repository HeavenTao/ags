import { writeFile } from "node:fs/promises"
import { Glob } from "bun"

const appDir = process.argv[2]

async function mergeCss() {
    let content = ''
    const glob = new Glob(`${appDir}/style/*.css`)
    for await (const file of glob.scan(".")) {
        content += `@import url("${file}");\n`
    }
    await writeFile(`${appDir}/dist/style.css`, content)
}

await mergeCss()

