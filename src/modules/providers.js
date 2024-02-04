/**
 * Represents a NostrProvider.
 */
export default class NostrProvider {
  constructor () {
    window.nostrasset = window.nostrasset || {}
    this.supportedProviderList = {
      alby: window?.alby?.nostr,
      okx: window?.okxwallet?.nostr,
      onekey: window.$onekey?.nostr,
      tokenpocket: window?.tokenpocket?.nostr,
      injected: window.nostr
    }
  }

  getProvider () {
    return window.nostrasset.nostr
  }

  /**
   * Connects to the NostrProvider based on the provided provider name.
   * @param {string} providerName - The name of the provider.
   * @returns {Promise<string>} - A promise that resolves to the public key of the connected NostrProvider.
   * @throws {Error} - Throws an error if the provider is not supported.
   */
  async connect (providerName) {
    const supportProviderNames = Object.keys(this.supportedProviderList).join(',')
    if (!supportProviderNames.includes(providerName)) {
      throw new Error(`Provider not supported,only support ${supportProviderNames} now`)
    }
    if (!this.supportedProviderList[providerName]) {
      throw new Error(`No ${providerName} provider found`)
    }
    window.nostrasset.nostr = this.supportedProviderList[providerName]

    return await window.nostrasset.nostr.getPublicKey()
  }
}
