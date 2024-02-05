/**
 * Represents a Token.
 * @module modules/token
 */
export default class Token {
  /**
   * Creates a new instance of the Token class.
   * @param {Object} nostrPool - The nostrPool object.
   * @param {Object} config - The configuration object.
   * @param {Function} runCommand - The runCommand function.
   */
  constructor (nostrPool, config, runCommand) {
    this.nostrPool = nostrPool
    this.config = config
    this.sendTo = config.TOKEN_ROBOT_ADDR
    this.runCommand = runCommand
  }

  /**
   * Approves the transfer of tokens.
   * @param {Object} options - The options for approving the transfer.
   * @param {string} options.tokenName - The name of the token.
   * @param {number} options.amount - The amount of tokens to approve.
   * @param {string} options.approveTo - The address to approve the tokens to.
   * @returns {Promise} A promise that resolves when the transfer is approved.
   */
  approve ({ tokenName, amount, approveTo }) {
    const command = `approve ${amount} ${tokenName} to ${approveTo}`
    return this.runCommand(command, this.sendTo)
  }

  /**
   * Transfers tokens to another address.
   * @param {Object} options - The options for transferring the tokens.
   * @param {string} options.tokenName - The name of the token.
   * @param {number} options.amount - The amount of tokens to transfer.
   * @param {string} options.to - The address to transfer the tokens to.
   * @returns {Promise} A promise that resolves when the transfer is complete.
   */
  transfer ({ tokenName, amount, to }) {
    const command = `transfer ${amount} ${tokenName} to ${to}`
    return this.runCommand(command, this.sendTo)
  }

  /**
   * Adds an address to the address book.
   * @param {Object} options - The options for adding the address.
   * @param {string} options.address - The address to add.
   * @param {string} options.name - The name associated with the address.
   * @returns {Promise} A promise that resolves when the address is added.
   */
  addAddressBook ({ address, name }) {
    const command = `add address ${address} name ${name}`
    return this.runCommand(command, this.sendTo)
  }

  /**
   * Queries the address book for a given address.
   * @param {string} npubEncodeAddr - The encoded address to query.
   * @returns {Promise} A promise that resolves with the address book information.
   */
  queryAddressBook (npubEncodeAddr) {
    const command = `address book of ${npubEncodeAddr}`
    return this.runCommand(command, this.sendTo, true)
  }

  /**
   * Deposits tokens to an address.
   * @param {Object} options - The options for depositing the tokens.
   * @param {number} options.amount - The amount of tokens to deposit.
   * @param {string} options.to - The address to deposit the tokens to.
   * @returns {Promise} A promise that resolves when the deposit is complete.
   */
  deposit ({ amount, to }) {
    const command = `deposit ${amount} sats to ${to}`
    return this.runCommand(command, this.sendTo)
  }

  /**
   * Withdraws tokens from an address.
   * @param {Object} options - The options for withdrawing the tokens.
   * @param {string} options.invoice - The invoice to withdraw the tokens to.
   * @returns {Promise} A promise that resolves when the withdrawal is complete.
   * @throws {Error} If bolt11 is not installed or the invoice is invalid.
   */
  withdraw ({ invoice }) {
    const amount = typeof window === 'undefined' ? global?.lightningPayReq?.decode(invoice).satoshis : window?.lightningPayReq?.decode(invoice)?.satoshis || 0
    if (!amount) throw new Error('Invalid invoice')
    const command = `withdraw ${amount} sats to ${invoice}`
    return this.runCommand(command, this.sendTo)
  }
}
