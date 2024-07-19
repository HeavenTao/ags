import findIcon from "lib/iconUtils"

const date = Variable("", {
    poll: [1000, "date '+%Y-%m-%d %H:%M'"]
})

function Clock() {
    return Widget.Box({
        className: 'box',
        children: [
            Widget.Icon({
                icon: findIcon("calendar", "apps", "16")
            }),
            Widget.Label({
                label: date.bind().as(v => v),
                className: "clock",
            })
        ]
    })
}

export default Clock
