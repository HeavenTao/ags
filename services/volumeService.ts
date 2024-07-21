import * as _ from 'lodash'

class VolumeService extends Service {
    static {
        Service.register(
            this,
            {
            },
            {
                'num': ['int', 'r'],
                'state': ['boolean', 'r']
            }
        )
    }
    private _state = false
    private _num = 0
    private setVolumeCb: _.DebouncedFunc<(num: number) => Promise<void>>
    private setStateCb: _.DebouncedFunc<(state: boolean) => Promise<void>>

    get num() {
        return this._num
    }

    get state() {
        return this._state
    }

    private async getVolumeNum() {
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

    private async getState() {
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

    constructor() {
        super()

        this.setVolumeCb = _.debounce(async (num: number) => {
            await Utils.execAsync([
                'amixer', 'sset', 'Master', `${num}%`
            ])
        }, 200)

        this.setStateCb = _.debounce(async (state: boolean) => {
            await Utils.execAsync([
                'amixer', 'sset', 'Master', state ? 'unmute' : 'mute'
            ])
        }, 200)

        this.init()
    }

    private async init() {
        this._num = await this.getVolumeNum()
        this._state = await this.getState()
        this.notify("num")
        this.notify("state")
    }

    async setVolumeUp() {
        if (this._num + 1 <= 100) {
            this._num++
            this.setVolumeCb(this._num)
            this.notify("num")
        }
    }

    async setVolumeDown() {
        if (this._num - 1 >= 0) {
            this._num--
            this.setVolumeCb(this._num)
            this.notify("num")
        }
    }

    async switchState() {
        this._state = !this._state;
        this.setStateCb(this._state)
        this.notify("state")
    }
}

const volumeService = new VolumeService()

export default volumeService
