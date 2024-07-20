import * as _ from 'lodash'
import findIcon from "lib/iconUtils"

const setVolumn = _.debounce(async (num) => {
    await Utils.execAsync([
        'amixer', 'sset', 'Master', `${num}%`
    ])
}, 200)

async function setVolumnState(state: boolean) {
    await Utils.execAsync([
        'amixer', 'sset', 'Master', state ? 'unmute' : 'mute'
    ])
}

async function getSystemVolumn(): Promise<number> {
    let text = await Utils.execAsync([
        'amixer', 'get', 'Master'
    ])

    var reg = /(?<=\[)\d*(?=%\])/
    var matchs = reg.exec(text)
    if (matchs) {
        return Number(matchs[0])
    } else {
        return 0
    }
}

async function getSystemVolumnState(): Promise<boolean> {
    let text = await Utils.execAsync([
        'amixer', 'get', 'Master'
    ])

    var reg = /(?<=\[)o.*(?=\])/
    var matchs = reg.exec(text)
    if (matchs) {
        if (matchs[0] === "on") {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

async function Volume() {
    const volNum = Variable(await getSystemVolumn())
    const state = Variable(await getSystemVolumnState())
    const audioOnPic = findIcon('audio-on', 'panel', '16')
    const audioOffPic = findIcon('audio-off', 'panel', '16')

    const iconPath = Variable(state.value ? audioOnPic : audioOffPic)

    return Widget.EventBox({
        onScrollUp: () => {
            if (volNum.value < 100) {
                volNum.value++
                setVolumn(volNum.value)
            }
        },
        onScrollDown: () => {
            if (volNum.value > 0) {
                volNum.value--
                setVolumn(volNum.value)
            }
        },
        onPrimaryClick: () => {
            state.value = !state.value;
            setVolumnState(state.value)
            iconPath.value = state.value ? audioOnPic : audioOffPic
        },
        child: Widget.Box({
            className: "box",
            spacing: 8,
            children: [
                Widget.Icon({
                    icon: iconPath.bind()
                }),
                Widget.Label({
                    className: "volume",
                    label: volNum.bind().as(v => `${v} %`)
                })
            ]
        })
    })
}

export default Volume
