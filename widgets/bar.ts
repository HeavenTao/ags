import Clock from './clock'

function Right() {
    return Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [
            Clock(),
        ]
    })
}

function Bar(monitor = 0) {
    return Widget.Window({
        monitor,
        name: `bar-${monitor}`,
        anchor: ['top', 'left', 'right'],
        exclusivity: "exclusive",
        className: "bar",
        child: Widget.CenterBox({
            endWidget: Right()
        })
    })
}

export default Bar
