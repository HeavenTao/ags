import * as _ from 'lodash'
import _default from 'types/variable'

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
    #state = Variable(false)
    #num = Variable(0)
    #setVolumeCb: _.DebouncedFunc<(num: number) => Promise<void>>
    #setStateCb: _.DebouncedFunc<(state: boolean) => Promise<void>>

    get Num() {
        return this.#num
    }

    get State() {
        return this.#state
    }

    async #getVolumeNum() {
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

    async #getState() {
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

        this.#setVolumeCb = _.debounce(async (num: number) => {
            await Utils.execAsync([
                'amixer', 'sset', 'Master', `${num}%`
            ])
        }, 200)

        this.#setStateCb = _.debounce(async (state: boolean) => {
            await Utils.execAsync([
                'amixer', 'sset', 'Master', state ? 'unmute' : 'mute'
            ])
        }, 200)

        this.#init()
    }

    async #init() {
        this.#num.value = await this.#getVolumeNum()
        this.#state.value = await this.#getState()
    }

    async setVolumeUp() {
        if (this.#num.value + 1 <= 100) {
            this.#num.value++
            this.#setVolumeCb(this.#num.value)
        }
    }

    async setVolumeDown() {
        if (this.#num.value - 1 >= 0) {
            this.#num.value--
            this.#setVolumeCb(this.#num.value)
        }
    }

    async switchState() {
        this.#state.value = !this.#state.value;
        this.#setStateCb(this.#state.value)
    }
}

const volumeService = new VolumeService()

export default volumeService
