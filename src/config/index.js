const CONFIG = {
  development: {
    RELAYS: ['wss://dev-relay.lnfi.network'],
    TOKEN_ROBOT_ADDR: 'npub196ms9l8z22at9s4dgqwvhtm5umh5a0lrpavyv2yv5mcjhvvxy5xs4qlpcs',
    MARKET_ROBOT_ADDR: 'npub14gdjypgqm6gzrkj0emnl4z0pks3605mkc9q28vnsqwxk2znvw23s9d5g29'
  },
  production: {
    RELAYS: ['wss://relay.lnfi.network'],
    TOKEN_ROBOT_ADDR: 'npub1dy7n73dcrs0n24ec87u4tuagevkpjnzyl7aput69vmn8saemgnuq0a4n6y',
    MARKET_ROBOT_ADDR: 'npub1zl7exeul3py65wt9ux243r0e3pukt8jza28xmpu844mj5wqpncaq0s2tyw'
  }
}
export default CONFIG
