import NASDK from '../src/index.js'
import "jest-extended"
import { getPublicKey, nip19 } from 'nostr-tools'
import 'websocket-polyfill'
import "./bolt11.min.js"
// privateKey only use  when using in nodejs
const privateKey = '45d914aef9c2f85a47b242ef684245c02e0af93d6f9031fcc3444ede8ac0a295'
const curOwnerAddress = nip19.npubEncode(getPublicKey(privateKey))

let nasdk;

describe('TOKEN', () => {
  beforeEach(() => {
    nasdk = new NASDK({ env: 'development', privateKey, poolOptions:{getTimeout:10*1000} })
  })
  
  it('approve', async () => {
    const res = await nasdk.token.approve({ tokenName: 'NOSTR', amount: 100, approveTo: 'npub1zptcf2v9ms5dgd8mgulsckk04l9upr3lnerk6ckh9zyntzu0ness753zx8' })
    expect(res.code).toBe(0)
  })
  it('transfer', async () => {
    const res = await nasdk.token.transfer({ tokenName: 'NOSTR', amount: 1, to: 'npub1zptcf2v9ms5dgd8mgulsckk04l9upr3lnerk6ckh9zyntzu0ness753zx8' })
    expect(res.code).toBe(0)
  })
  it('addAddressBook', async () => {
    const res = await nasdk.token.addAddressBook({ address: 'npub1zptcf2v9ms5dgd8mgulsckk04l9upr3lnerk6ckh9zyntzu0ness753zx8', name: 'test' })
    expect([0, 500]).toContain(res.code);
    const retQuery = await nasdk.token.queryAddressBook(curOwnerAddress)
    expect(retQuery.code).toBe(0)
  })
  it('deposit', async () => {
    const res = await nasdk.token.deposit({ amount: 101, to: curOwnerAddress })
    expect(res.code).toBe(0)
  })
  it('widthdraw', async () => {
    const res = await nasdk.token.withdraw({ invoice:'lnbc1u1pjmev08pp5mp0c87rm40y9qvva2xfq32dc6rvmjjdum6p242ujvu740tg0gddsdq5g9kxy7fqd9h8vmmfvdjscqzzsxqyz5vqsp5wxjwmfr79h7y8wn6p4dn6ts8pzgvl9jnzg8vltr9enpwlkwc2zes9qyyssqk2729du5xjgxh3cc5xesyuxpd7dkwgwvs7s79mpknuuz6au7rgz97kvyz8lkpl25vxuy3qpsx72fqux2yk32tgrsq7d0q86h27hnr9cp0zr6cm' })
    expect([0, 500]).toContain(res.code);
  })
})

