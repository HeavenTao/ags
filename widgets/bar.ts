import Clock from './clock'
import Volume from './volume'

function Right() {
    return Widget.Box({
        hpack: "end",
        spacing: 0,
        children: [
            Volume(),
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
