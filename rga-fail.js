const CRDTs = require('delta-crdts')
const RGA = CRDTs('rga')
const rgaType = CRDTs.type('rga')

// Let's create the word 'pear' using two replicas
// 1. push 'p' to replicaPear
// 2. push 'e' and 'a' to replicaVowels
// 3. apply replicaVowels state to replicaPear
// 3. push 'r' to replicaPear ... spelling 'pear'

const replicaVowels = RGA('id1') // ID sort order matters
const replicaPear = RGA('id2')

const deltaP = replicaPear.push('p')

console.log('replicaPear initial:', replicaPear.value().join(''))

const deltaE = replicaVowels.push('e')
const deltaA = replicaVowels.push('a')

console.log('replicaVowels:', replicaVowels.value().join(''))

replicaPear.apply(replicaVowels.state())

console.log('replicaPear after applying vowels:', replicaPear.value().join(''))

const deltaR = replicaPear.push('r')

console.log('replicaPear final:', replicaPear.value().join(''))

console.log('')
console.log('Apply deltas in original order:')

const replica1 = RGA('replica1')
replica1.apply(deltaP)
replica1.apply(deltaE)
replica1.apply(deltaA)
replica1.apply(deltaR)
console.log('replica1:', replica1.value().join(''))

console.log('')
console.log('Apply deltas in modified order:')

const replica2 = RGA('replica2')
replica2.apply(deltaE)
replica2.apply(deltaA)
replica2.apply(deltaP)
replica2.apply(deltaR)
console.log('replica2:', replica2.value().join(''))

console.log('')
console.log('Apply deltas in a different order:')

const replica3 = RGA('replica3')
replica3.apply(deltaE)
replica3.apply(deltaA)
replica3.apply(deltaR)
replica3.apply(deltaP)
console.log('replica3:', replica3.value().join(''))

console.log('')
console.log('Apply deltas in another different order:')

const replica4 = RGA('replica4')
replica4.apply(deltaE)
replica4.apply(deltaP)
replica4.apply(deltaA)
replica4.apply(deltaR)
console.log('replica4:', replica4.value().join(''))

console.log('')
console.log('Batch "p" and "r" (fails):')

const replica5 = RGA('replica5')
replica5.apply(deltaE)
replica5.apply(deltaA)
const batchReplica5PR = rgaType.join(deltaP, deltaR)
replica5.apply(batchReplica5PR)
console.log('replica5:', replica5.value().join(''))

console.log('')
console.log('Batch "p" and "r" reversed (fails):')

const replica6 = RGA('replica6')
replica6.apply(deltaE)
replica6.apply(deltaA)
const batchReplica6RP = rgaType.join(deltaR, deltaP)
replica6.apply(batchReplica6RP)
console.log('replica6:', replica6.value().join(''))
