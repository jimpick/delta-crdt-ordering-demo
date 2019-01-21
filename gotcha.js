const CRDTs = require('delta-crdts')
const RGA = CRDTs('rga')
const rgaType = CRDTs.type('rga')

const replica1 = RGA('replica1')
const deltaB = replica1.push('b')
const deltaX = replica1.push('x')
const deltaY = replica1.push('y')
console.log('Replica 1:', replica1.value().join(''))
const stateBXY = replica1.state()
console.log('BXY:\n', stateBXY)

const deltaA = replica1.insertAt(0, 'a')
console.log('Replica 1:', replica1.value().join(''))

const replica1a = RGA('_replica1a')

const deltaC = replica1a.push('c')
console.log('Replica 1a:', replica1a.value().join(''))

replica1a.apply(stateBXY)
console.log('Replica 1a:', replica1a.value().join(''))

replica1.apply(deltaC)
console.log('Replica 1:', replica1.value().join(''))

const replica2 = RGA('replica2')
replica2.apply(stateBXY)
console.log('Replica 2:', replica2.value().join(''))

replica2.apply(deltaC)
console.log('Replica 2:', replica2.value().join(''))

replica2.apply(deltaA)
console.log('Replica 2:', replica2.value().join(''))

const replica3 = RGA('replica2')
replica3.apply(stateBXY)
console.log('Replica 3:', replica3.value().join(''))

const batchAC = rgaType.join(deltaC, deltaA)
console.log('AC:\n', batchAC)
replica3.apply(batchAC)
console.log('Replica 3:', replica3.value().join(''))


