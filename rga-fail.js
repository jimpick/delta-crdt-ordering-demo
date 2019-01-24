const CRDTs = require('delta-crdts')
const RGA = CRDTs('rga')
const rgaType = CRDTs.type('rga')
const b58Decode = require('bs58').decode

const crdtId = id => b58Decode(id).slice(-4)

const replicaX = RGA('1')
const replicaY = RGA('2')

const deltaA = replicaY.push('a')

console.log('replicaY 1', replicaY.value().join(''))

const deltaE = replicaX.push('E')
const deltaF = replicaX.push('F')

console.log('replicaX 1', replicaX.value().join(''))

replicaY.apply(deltaE)
replicaY.apply(deltaF)

console.log('replicaY 2', replicaY.value().join(''))

const deltaB = replicaY.push('b')

console.log('replicaY 3', replicaY.value().join(''))

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


const replicaA = RGA('3')
const replicaB = RGA('2')
const replicaC = RGA('1')

replicaA.push('E')
replicaA.push('F')

console.log('replicaA 1', replicaA.value().join(''))

replicaB.push('b')
replicaB.apply(replicaA.state())

console.log('replicaB 1', replicaB.value().join(''))

const deltaC_a = replicaC.push('a')
console.log('replicaC a', replicaC.value().join(''))

replicaB.apply(deltaC_a)
console.log('replicaB 2', replicaB.value().join(''))

replicaA.apply(deltaC_a)
console.log('replicaA 2', replicaA.value().join(''))

