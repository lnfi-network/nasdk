/* eslint-disable camelcase */
import { SimplePool, nip19, nip04, generatePrivateKey, getPublicKey, getEventHash, getSignature } from 'nostr-tools'
export default class NostrPool {
  constructor (options, relays) {
    this.options = Object.keys(options).length > 0
      ? options
      : {
          getTimeout: 6 * 1000
        }
    this.pool = new SimplePool(this.options)
    this.relays = relays
  }

  async getSignedEvent ({ message, kind = 4, targetPubkey, privateKey, tags }) {
    if (!message) {
      throw new Error('No message provided.')
    }
    let ciphertext = ''
    let nostrAccount = ''
    if (kind === 4 && targetPubkey) {
      if (privateKey) {
        ciphertext = await nip04.encrypt(privateKey, targetPubkey, message)
        nostrAccount = getPublicKey(privateKey)
      } else {
        if (!window?.nostrasset?.nostr) {
          throw new Error('Please call setNostrProvider to set provider first.')
        }
        if (!window?.nostrasset?.nostr?.nip04) {
          throw new Error('Your wallet does not support nip04.')
        }
        nostrAccount = await window.nostrasset.nostr.getPublicKey()
        ciphertext = await window.nostrasset.nostr.nip04.encrypt(targetPubkey, message)
      }
    } else {
      ciphertext = message
    }
    const created_at = parseInt(Date.now() / 1000)
    let event = {
      content: ciphertext,
      kind,
      tags,
      created_at,
      pubkey: nostrAccount
    }
    event.id = getEventHash(event)
    if (!privateKey) {
      const signedEvent = await window.nostrasset.nostr.signEvent(event)
      event = signedEvent
    } else {
      event.sig = getSignature(event, privateKey)
    }
    return event
  }

  async execCommand ({ command, sendTo, privateKey, queryOnly = false }) {
    let robotPrivatekey
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem('tempNostrPrivateKey')) {
        const sk = generatePrivateKey()
        sessionStorage.setItem('tempNostrPrivateKey', sk)
      }
      robotPrivatekey = sessionStorage.getItem('tempNostrPrivateKey')
    } else if (typeof global !== 'undefined') {
      if (!privateKey) {
        throw new Error('No privateKey provided.')
      }
      robotPrivatekey = privateKey
    }
    const decodeSendTo = nip19.decode(sendTo).data

    const receiver = getPublicKey(robotPrivatekey)
    let result = null
    const kind = 4
    const tags = [
      ['p', decodeSendTo],
      ['r', 'json']
    ]
    if (!queryOnly) {
      tags.push(['a', receiver])
    }
    const signedEvent = await this.getSignedEvent({
      message: command,
      kind,
      targetPubkey: decodeSendTo,
      privateKey: queryOnly || typeof global !== 'undefined' ? robotPrivatekey : '',
      tags
    })

    const since = parseInt(Date.now() / 1000)
    const filter = {
      kinds: [kind],
      since,
      '#e': [signedEvent.id],
      '#p': [receiver]
    }
    const relays = this.relays

    await Promise.any(this.pool.publish(relays, signedEvent))
    const event = await this.pool.get(relays, filter)
    if (!event) {
      return { code: 400, data: 'timeout', message: 'timeout' }
    }
    const content = event.content
    const decryptContent = await nip04.decrypt(robotPrivatekey, decodeSendTo, content)
    if (decryptContent) {
      result = JSON.parse(decryptContent)
      return result
    }
  }
}
