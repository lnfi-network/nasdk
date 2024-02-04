/**
 * Represents a Market.
 */
export default class Market {
  /**
   * Creates a new Market instance.
   * @param {Object} nostrPool - The nostrPool object.
   * @param {Object} config - The configuration object.
   * @param {Function} runCommand - The runCommand function.
   */
  constructor (nostrPool, config, runCommand) {
    this.nostrPool = nostrPool
    this.config = config
    this.sendTo = config.MARKET_ROBOT_ADDR
    this.runCommand = runCommand
  }

  /**
   * Lists an order.
   * @param {Object} options - The options for listing the order.
   * @param {string} options.side - The side of the order (buy or sell).
   * @param {number} options.amount - The amount of the order.
   * @param {string} options.price - The price of the order.
   * @param {string} options.buyOrSellTokenName - The name of the token to buy or sell.
   * @param {string} options.payTokenName - The name of the token to pay.
   * @returns {Promise} A promise that resolves with the result of the command.
   */
  listOrder ({ side, amount, price, buyOrSellTokenName, payTokenName }) {
    const command = `${side} ${amount} ${buyOrSellTokenName} at price ${price} ${payTokenName}`
    return this.runCommand(command, this.sendTo)
  }

  /**
   * Takes an order.
   * @param {string} orderId - The ID of the order to take.
   * @returns {Promise} A promise that resolves with the result of the command.
   */
  takeOrder (orderId) {
    const command = `take order ${orderId}`
    return this.runCommand(command, this.sendTo)
  }

  /**
   * Cancels an order.
   * @param {string} orderId - The ID of the order to cancel.
   * @returns {Promise} A promise that resolves with the result of the command.
   */
  cancelOrder (orderId) {
    const command = `cancel order ${orderId}`
    return this.runCommand(command, this.sendTo)
  }

  /**
   * Repairs an order.
   * @param {string} orderId - The ID of the order to repair.
   * @returns {Promise} A promise that resolves with the result of the command.
   */
  repairOrder (orderId) {
    const command = `repair order ${orderId}`
    return this.runCommand(command, this.sendTo)
  }
}
