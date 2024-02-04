import Market from './modules/market.js'
import Token from './modules/token.js'
import NostrProvider from './modules/providers.js'
import Utils from './modules/utils.js'
import NostrPool from './lib/nostrPool.js'
import CONFIG from './config/index.js'

class NASDK {
  // privateKey only use  when using in nodejs
  constructor ({ env, relays, privateKey, poolOptions } = {}) {
    this.env = env || 'development'
    this.config = CONFIG[this.env]
    this.privateKey = privateKey
    this.relays = relays || CONFIG[this.env].RELAYS
    this.nostrPool = new NostrPool({ ...poolOptions }, this.relays)
  }

  getConfig () {
    return this.config
  }

  getNostrPool () {
    return this.nostrPool
  }

  get provider () {
    if (typeof window !== 'undefined') {
      return new NostrProvider()
    }
  }

  get market () {
    return new Market(this.nostrPool, this.config, this.runCommand.bind(this))
  }

  get token () {
    return new Token(this.nostrPool, this.config, this.runCommand.bind(this))
  }

  get utils () {
    return new Utils()
  }

  runCommand (command, sendTo, queryOnly = false) {
    return this.nostrPool.execCommand({ command, sendTo, privateKey: this.privateKey, queryOnly })
  }
}
export default NASDK
