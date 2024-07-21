import findIcon from "lib/iconUtils"
import volumeService from "services/volumeService"

async function Volume() {
    const audioOnPic = findIcon('audio-on', 'panel', '16')
    const audioOffPic = findIcon('audio-off', 'panel', '16')

    return Widget.EventBox({
        onScrollUp: () => {
            volumeService.setVolumeUp()
        },
        onScrollDown: () => {
            volumeService.setVolumeDown()
        },
        onPrimaryClick: () => {
            volumeService.switchState()
        },
        child: Widget.Box({
            className: "box",
            spacing: 0,
            children: [
                Widget.Icon({
                    icon: volumeService.bind("state").as(v => {
                        if (v) {
                            return audioOnPic
                        } else {
                            return audioOffPic
                        }
                    })
                }),
                Widget.Label({
                    className: "volume",
                    label: volumeService.bind("num").as(v => `${v} %`)
                })
            ]
        })
    })
}

export default Volume
