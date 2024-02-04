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

  /**
   * Sets the NostrProvider based on the provided provider name.
   * @param {string} providerName - The name of the provider.
   * @returns {boolean} - Returns true if the provider is supported and set successfully, otherwise false.
   */
  setNostrProvider (providerName) {
    if (this.supportedProviderList[providerName]) {
      window.nostrasset.nostr = this.supportedProviderList[providerName]
      return true
    }
    return false
  }

  /**
   * Connects to the NostrProvider based on the provided provider name.
   * @param {string} providerName - The name of the provider.
   * @returns {Promise<string>} - A promise that resolves to the public key of the connected NostrProvider.
   * @throws {Error} - Throws an error if the provider is not supported.
   */
  async connect (providerName) {
    const setProviderRet = this.setNostrProvider(providerName)
    if (!setProviderRet) {
      const supportProviderNames = Object.keys(this.supportedProviderList).join(',')
      throw new Error(`provider not supported,only support ${supportProviderNames} now`)
    }
    return await window.nostrasset.nostr.getPublicKey()
  }
}
