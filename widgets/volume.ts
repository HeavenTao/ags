import findIcon from "lib/iconUtils"
function Volume() {
    return Widget.EventBox({
        onScrollUp: () => {
            console.log("UP")
        },
        onScrollDown: () => {
            console.log("Down")
        },
        child: Widget.Box({
            className: "box",
            spacing: 8,
            children: [
                Widget.Icon({
                    icon: findIcon("audio-on", "panel", "16")
                }),
                Widget.Label({
                    className: "volume",
                    label: "90%"
                })
            ]
        })
    })
}

export default Volume
