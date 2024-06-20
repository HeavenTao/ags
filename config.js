const { speaker } = await Service.import("audio")
function Bar(monitor = 0) {

    return Widget.Window({
        monitor,
        name: "myBar",
        anchor: ['top', 'left', 'right'],
        child: Widget.Label({
            label: "hello",
            css: "min-height:100px"
        }),
        exclusivity: "normal",
        layer: "background"
    })
}

App.config({
    windows: [Bar(1)]
})
