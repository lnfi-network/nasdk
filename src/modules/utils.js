import { SimplePool, nip19, nip04, generatePrivateKey, getPublicKey, getEventHash, getSignature } from 'nostr-tools'
/**
 * Utility class for common functions.
 * @module modules/utils
 */
export default class Utils {
  constructor () {
    /**
     * NIP04 utility functions.
     * @type {Object}
     */
    this.nip04 = nip04

    /**
     * NIP19 utility functions.
     * @type {Object}
     */
    this.nip19 = nip19

    /**
     * Generates a private key.
     * @function
     * @returns {string} The generated private key.
     */
    this.generatePrivateKey = generatePrivateKey

    /**
     * Gets the public key from a private key.
     * @function
     * @param {string} privateKey - The private key.
     * @returns {string} The public key.
     */
    this.getPublicKey = getPublicKey

    /**
     * Simple pool utility class.
     * @type {Class}
     */
    this.SimplePool = SimplePool

    /**
     * Gets the hash of an event.
     * @function
     * @param {Object} event - The event object.
     * @returns {string} The event hash.
     */
    this.getEventHash = getEventHash

    /**
     * Gets the signature of a message using a private key.
     * @function
     * @param {string} message - The message to sign.
     * @param {string} privateKey - The private key.
     * @returns {string} The signature.
     */
    this.getSignature = getSignature
  }
}
