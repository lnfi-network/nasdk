import NASDK from '../src/index.js'
//import { getPublicKey, nip19 } from 'nostr-tools'
import 'websocket-polyfill'

/* only for jest test,remove in develop */
import "jest-extended"

// privateKey only use in nodejs
const privateKey = '45d914aef9c2f85a47b242ef684245c02e0af93d6f9031fcc3444ede8ac0a295'


let nasdk;

describe('MARKET', () => {
  beforeEach(() => {
    nasdk = new NASDK({ env: 'development', privateKey, poolOptions:{getTimeout:10*1000} })
  })
  it('listOrder', async () => {
    // need call approve to config.MARKET_ROBOT_ADDR first
    const res = await nasdk.market.listOrder({ side:'sell',amount:'100',price:'101',buyOrSellTokenName:'TRICK',payTokenName:'SATS'})
    expect([0, 500]).toContain(res.code);
  })
  it('takeOrder', async () => {
    // need call approve to config.MARKET_ROBOT_ADDR first
    const res = await nasdk.market.takeOrder(1706869981038)
    expect([0, 500]).toContain(res.code);
  })
  it('cancelOrder', async () => {
    const res = await nasdk.market.cancelOrder(1706870074955)
    expect([0, 500]).toContain(res.code);
  })
  it('repairOrder', async () => {
    const res = await nasdk.market.repairOrder(1706869981038)
    expect([0, 500]).toContain(res.code);
  })

})

