import Bar from './widgets/bar'

const bar = await Bar()

App.config({
    style: "./dist/style.css",
    windows: [bar],
})

export { }
