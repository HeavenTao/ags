const date = Variable("", {
    poll: [1000, "date '+%Y-%m-%d %H:%M'"]
})

function Clock() {
    return Widget.Box({
        child: Widget.CenterBox({
            className: "clock-box",
            centerWidget: Widget.Label({
                label: date.bind().as(v => v),
                className: "clock",
            }),
        })
    })
}

function Right() {
    return Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [
            Clock()
        ]
    })
}

function Bar(monitor = 1) {
    return Widget.Window({
        monitor,
        name: `bar-${monitor}`,
        anchor: ['top', 'left', 'right'],
        exclusivity: "exclusive",
        className: "window",
        child: Widget.CenterBox({
            endWidget: Right()
        })
    })
}

App.config({
    style: "./style.css",
    windows: [Bar()],
})

export { }
