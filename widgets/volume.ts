import findIcon from "lib/iconUtils"
function Volume() {
    return Widget.Box({
        className: "box",
        spacing: 8,
        children: [
            Widget.Icon({
                icon: findIcon("audio-on", "panel", "16")
            }),
            Widget.Label({
                label: "90%"
            })
        ]
    })
}

export default Volume
