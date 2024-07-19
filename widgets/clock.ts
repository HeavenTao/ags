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

export default Clock
