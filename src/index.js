import Market from './modules/market.js'
import Token from './modules/token.js'
import NostrProvider from './modules/providers.js'
import Utils from './modules/utils.js'
import NostrPool from './lib/nostrPool.js'
import CONFIG from './config/index.js'

/**
 * NASDK class represents the main SDK for interacting with the NOSTR ASSET PROTOCOL.
 * @class
 * @module nasdk
 * @exports NASDK
 */
class NASDK {
  /**
   * Creates an instance of NASDK.
   * @constructor
   * @param {Object} options - The options for initializing NASDK.
   * @param {string} [options.env='development'] - The environment to use.
   * @param {Array} [options.relays] - The relays to use.
   * @param {string} [options.privateKey] - The private key to use.
   * @param {Object} [options.poolOptions] - The options for initializing NostrPool.
   */
  constructor ({ env, relays, privateKey, poolOptions } = {}) {
    this.env = env || 'development'
    this.config = CONFIG[this.env]
    this.privateKey = privateKey
    this.relays = relays || CONFIG[this.env].RELAYS
    this.nostrPool = new NostrPool({ ...poolOptions }, this.relays)
  }

  /**
   * Get the configuration object for the current environment.
   * @returns {Object} The configuration object.
   */
  getConfig () {
    return this.config
  }

  /**
   * Get the NostrPool instance.
   * @returns {NostrPool} The NostrPool instance.
   */
  getNostrPool () {
    return this.nostrPool
  }

  /**
   * Get the NostrProvider instance.
   * @returns {NostrProvider} The NostrProvider instance.
   */
  get provider () {
    if (typeof window !== 'undefined') {
      return new NostrProvider()
    }
  }

  /**
   * Get the Market instance.
   * @returns {Market} The Market instance.
   */
  get market () {
    return new Market(this.nostrPool, this.config, this.runCommand.bind(this))
  }

  /**
   * Get the Token instance.
   * @returns {Token} The Token instance.
   */
  get token () {
    return new Token(this.nostrPool, this.config, this.runCommand.bind(this))
  }

  /**
   * Get the Utils instance.
   * @returns {Utils} The Utils instance.
   */
  get utils () {
    return new Utils()
  }

  /**
   * Execute a command on the NostrPool.
   * @param {string} command - The command to execute.
   * @param {string} sendTo - The address to send the command to.
   * @param {boolean} [queryOnly=false] - Whether the command is for querying only.
   * @returns {Promise} A promise that resolves with the result of the command execution.
   */
  runCommand (command, sendTo, queryOnly = false) {
    return this.nostrPool.execCommand({ command, sendTo, privateKey: this.privateKey, queryOnly })
  }
}

export default NASDK
