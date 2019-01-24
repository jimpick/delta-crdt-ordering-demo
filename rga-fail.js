const CRDTs = require('delta-crdts')
const RGA = CRDTs('rga')
const rgaType = CRDTs.type('rga')
const b58Decode = require('bs58').decode

const crdtId = id => b58Decode(id).slice(-4)

const r00S8c = RGA(crdtId('QmcnJwXLUE27YpyPR7GwRF8h6o1ouR6iBkcTUk9sShXS8c'))
const r06TK1 = RGA(crdtId('QmZrpe3pyKyNmjucMGgEsBAjRcGkcdgb3avsqYHTFndTK1'))

const deltaA = r00S8c.push('a')

const deltaE = r06TK1.push('E')
const deltaF = r06TK1.push('F')

r00S8c.apply(deltaE)
r00S8c.apply(deltaF)

console.log('r00S8c 1', r00S8c.value().join(''))

const deltaB = r00S8c.push('b')

console.log('r00S8c 2', r00S8c.value().join(''))

const replica1 = RGA('replica1')
replica1.apply(deltaA)
replica1.apply(deltaE)
replica1.apply(deltaF)
replica1.apply(deltaB)
console.log('replica1', replica1.value().join(''))

const replica2 = RGA('replica2')
replica2.apply(deltaE)
replica2.apply(deltaF)
replica2.apply(deltaA)
replica2.apply(deltaB)
console.log('replica2', replica2.value().join(''))

const replica3 = RGA('replica3')
replica3.apply(deltaE)
replica3.apply(deltaF)
replica3.apply(deltaB)
replica3.apply(deltaA)
console.log('replica3', replica3.value().join(''))

const replica4 = RGA('replica4')
replica4.apply(deltaE)
replica4.apply(deltaA)
replica4.apply(deltaF)
replica4.apply(deltaB)
console.log('replica4', replica4.value().join(''))

const replica5 = RGA('replica5')
replica5.apply(deltaE)
replica5.apply(deltaF)
const batchReplica5AB = rgaType.join(deltaA, deltaB)
replica5.apply(batchReplica5AB)
console.log('replica5', replica5.value().join(''))

const replica6 = RGA('replica6')
replica6.apply(deltaE)
replica6.apply(deltaF)
const batchReplica6AB = rgaType.join(deltaB, deltaA)
replica6.apply(batchReplica6AB)
console.log('replica6', replica6.value().join(''))

const replica7 = RGA('replica7')
const batchReplica7EF = rgaType.join(deltaE, deltaF)
replica7.apply(batchReplica7EF)
replica7.apply(deltaA)
replica7.apply(deltaB)
console.log('replica7', replica7.value().join(''))

const replica8 = RGA('replica8')
const batchReplica8EF = rgaType.join(deltaF, deltaE)
replica8.apply(batchReplica8EF)
replica8.apply(deltaA)
replica8.apply(deltaB)
console.log('replica8', replica8.value().join(''))






