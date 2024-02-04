import { SimplePool, nip19, nip04, generatePrivateKey, getPublicKey, getEventHash, getSignature } from 'nostr-tools'
class Utils {
  constructor () {
    this.nip04 = nip04
    this.nip19 = nip19
    this.generatePrivateKey = generatePrivateKey
    this.getPublicKey = getPublicKey
    this.SimplePool = SimplePool
    this.getEventHash = getEventHash
    this.getSignature = getSignature
  }
}
export default Utils
