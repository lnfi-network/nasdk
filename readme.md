# NASDK
It is an SDK library developed based on the NOSTR ASSET protocol, used to connect plugin wallets that support NOSTR, perform transactions, and place orders.

## Support method list
### nasdk
1. getConfig
2. getNostrPool
### nasdk.market
1. listOrder
2. takeOrder
3. cancelOrder
4. repairOrder
### nasdk.token
1. approve
2. transfer
3. addAddressBook
4. deposit
5. widthdraw
### nasdk.provider
1. supportedProviderList
2. connect
### nasdk.utils
1. nip04
2. nip19
3. generatePrivateKey
4. getPublicKey
5. getEventHash

## Setup
### React
#### install
```
yarn add nasdk

//import bolt11min.js to public/index.xml through script src
<script src=`${yourpath}/bolt11.min.js``></script>
```
#### code
```
import {useCallback} from 'react
import NASDK from 'nasdk'
const nasdk = new NASDK({ env: 'development'}) // env: development | production
const onTransfer = useCallback(async()=>{
    const res = await nasdk.token.transfer({ tokenName: 'NOSTR', amount: 1, to: 'npub1zptcf2v9ms5dgd8mgulsckk04l9upr3lnerk6ckh9zyntzu0ness753zx8' })
},[])
return <>
{your code}
</>


```
### Node.js
#### install
```
yarn add websocket-polyfill bolt11 nasdk
```
#### code
```
import 'websocket-polyfill'
import 'bolt11'
import NASDK from 'nasdk'

const privateKey='45d914aef9c2f85a47b242ef684245c02e0af93d6f9031fcc3444ede8ac0a295'
const nasdk = new NASDK({ env: 'development', privateKey, poolOptions:{getTimeout:10*1000} })

 const res = await nasdk.market.listOrder({ side:'sell',amount:'100',price:'101',buyOrSellTokenName:'TRICK',payTokenName:'SATS'})

 // You can see more examples in the src/tests directory

```
### HTML
```
<scrpt src=`${youpath}/nasdk.umd.js`>
<script src=`${yourpath}/bolt11.min.js``></script>
<script>
     const nasdk = new NASDK({ env: 'development' })
     const supportedProviderNames = Object.keys(nasdk.provider.supportedProviderList)
     async function onConnect(providerName='alby') {
        const res = await nasdk.provider.connect(providerName)
     }
</script>
```
## Example
src/tests

## Running the test suite
```javascript
yarn node --experimental-vm-modules $(yarn bin jest) --detectOpenHandles
```

## License
MIT License

Copyright (c) 2024 Luke

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.