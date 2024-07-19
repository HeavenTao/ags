
const { Gio } = imports.gi

type Size = '8' | '16' | '18' | '22' | '24' | '32' | '42' | '48' | '64' | '84' | '96' | '128'
const basePath = '/usr/share/icons/Papirus'

const cache: string[] = []

function findIcon(name: string, category: string, size: Size = '16'): string {
    const filePath = `${basePath}/${size}x${size}/${category}/${name}.svg`

    if (cache.includes(filePath)) {
        console.log("cache 命中")
        return filePath;
    } else {
        const file = Gio.File.new_for_path(filePath)
        const exists = file.query_exists(null)
        if (exists) {
            cache.push(filePath)
            return filePath
        } else {
            console.log("findIcon not find", filePath)
            return ""
        }
    }

}

export default findIcon
