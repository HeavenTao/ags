import Clock from './clock'
import Volume from './volume'

async function Right() {
    const volume = await Volume()
    return Widget.Box({
        hpack: "end",
        spacing: 0,
        children: [
            volume,
            Clock(),
        ]
    })
}

async function Bar(monitor = 0) {
    const right = await Right()
    return Widget.Window({
        monitor,
        name: `bar-${monitor}`,
        anchor: ['top', 'left', 'right'],
        exclusivity: "exclusive",
        className: "bar",
        child: Widget.CenterBox({
            endWidget: right
        })
    })
}

export default Bar
