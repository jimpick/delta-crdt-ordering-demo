const CRDTs = require('delta-crdts')

const RGA = CRDTs('rga')

let rABC = RGA('rABC')
const rABC_deltaA = rABC.push('a')
const rABC_deltaB = rABC.push('b')
const rABC_deltaC = rABC.push('c')

console.log('rABC', rABC.value().join(''))

let rDEF = RGA('rDEF')
const rDEF_deltaD = rDEF.push('d')
const rDEF_deltaE = rDEF.push('e')
const rDEF_deltaF = rDEF.push('f')

console.log('rDEF', rDEF.value().join(''))

let rDEFABC = RGA('rDEFABC')
rDEFABC.apply(rABC.state())
rDEFABC.apply(rDEF.state())

console.log('rDEFABC', rDEFABC.value().join(''))

let rXYZ = RGA('rXYZ')
const rXYZ_deltaX = rXYZ.push('x')
const rXYZ_deltaY = rXYZ.push('y')
const rXYZ_deltaZ = rXYZ.push('z')

console.log('rXYZ', rXYZ.value().join(''))

let rXYZDEFABC1 = RGA('rXYZDEFABC1')
rXYZDEFABC1.apply(rABC.state())
rXYZDEFABC1.apply(rDEF.state())
rXYZDEFABC1.apply(rXYZ.state())

console.log('rXYZDEFABC1', rXYZDEFABC1.value().join(''))

let rXYZDEFABC2 = RGA('rXYZDEFABC2')
rXYZDEFABC2.apply(rXYZ.state())
rXYZDEFABC2.apply(rDEF.state())
rXYZDEFABC2.apply(rABC.state())

console.log('rXYZDEFABC2', rXYZDEFABC2.value().join(''))

let rXYZDEFABC3 = RGA('rXYZDEFABC3')
rXYZDEFABC3.apply(rXYZ.state())
rXYZDEFABC3.apply(rABC.state())
rXYZDEFABC3.apply(rDEF.state())

console.log('rXYZDEFABC3', rXYZDEFABC3.value().join(''))

let rXYZJKDEFABC = RGA('rXYZJKDEFABC')
rXYZJKDEFABC.apply(rXYZ.state())
const rXYZJKDEFABC_deltaJ = rXYZJKDEFABC.push('j')
const rXYZJKDEFABC_deltaK = rXYZJKDEFABC.push('k')
rXYZJKDEFABC.apply(rABC.state())
rXYZJKDEFABC.apply(rDEF.state())

console.log('rXYZJKDEFABC', rXYZJKDEFABC.value().join(''))

let rXYZJKDEFABC2 = RGA('rXYZJKDEFABC2')
rXYZJKDEFABC2.apply(rXYZ.state())
rXYZJKDEFABC2.apply(rABC.state())
rXYZJKDEFABC2.apply(rDEF.state())
rXYZJKDEFABC2.apply(rXYZJKDEFABC_deltaJ)
rXYZJKDEFABC2.apply(rXYZJKDEFABC_deltaK)

console.log('rXYZJKDEFABC2', rXYZJKDEFABC2.value().join(''))

try {
  let rXYZJKDEFABC3 = RGA('rXYZJKDEFABC3')
  rXYZJKDEFABC3.apply(rXYZ.state())
  rXYZJKDEFABC3.apply(rXYZJKDEFABC_deltaK)
  rXYZJKDEFABC3.apply(rXYZJKDEFABC_deltaJ)
  rXYZJKDEFABC3.apply(rABC.state())
  rXYZJKDEFABC3.apply(rDEF.state())

  console.log('rXYZJKDEFABC3', rXYZJKDEFABC3.value().join(''))
} catch (e) {
  console.error('rXYZJKDEFABC3 Exception:', e.message)
}

try {
  let rXYZJKDEFABC4 = RGA('rXYZJKDEFABC4')
  rXYZJKDEFABC4.apply(rDEF.state())
  rXYZJKDEFABC4.apply(rXYZJKDEFABC_deltaJ)
  rXYZJKDEFABC4.apply(rXYZJKDEFABC_deltaK)
  rXYZJKDEFABC4.apply(rABC.state())
  rXYZJKDEFABC4.apply(rXYZ.state())

  console.log('rXYZJKDEFABC4', rXYZJKDEFABC4.value().join(''))
} catch (e) {
  console.error('rXYZJKDEFABC4 Exception:', e.message)
}

let rXYZJK = RGA('rXYZJK')
rXYZJK.apply(rXYZ.state())
rXYZJK.apply(rXYZJKDEFABC_deltaJ)
rXYZJK.apply(rXYZJKDEFABC_deltaK)

console.log('rXYZJK', rXYZJK.value().join(''))

let rXYZJKDEFABC5 = RGA('rXYZJKDEFABC5')
rXYZJKDEFABC5.apply(rDEF.state())
rXYZJKDEFABC5.apply(rABC.state())
rXYZJKDEFABC5.apply(rXYZJK.state())

console.log('rXYZJKDEFABC5', rXYZJKDEFABC5.value().join(''))

let rXYZABC = RGA('rXYZABC')
rXYZABC.apply(rXYZ.state())
rXYZABC.apply(rABC.state())

console.log('rXYZABC', rXYZABC.value().join(''))

let rXYZDEF = RGA('rXYZDEF')
rXYZDEF.apply(rXYZ.state())
rXYZDEF.apply(rDEF.state())

console.log('rXYZDEF', rXYZDEF.value().join(''))

let rXYZJKABC = RGA('rXYZJKABC')
rXYZJKABC.apply(rXYZJK.state())
rXYZJKABC.apply(rABC.state())

console.log('rXYZJKABC', rXYZJKABC.value().join(''))

let rXYZJKDEFABC6 = RGA('rXYZJKDEFABC6')
rXYZJKDEFABC6.apply(rXYZJKABC.state())
rXYZJKDEFABC6.apply(rDEF.state())

console.log('rXYZJDEFKABC6', rXYZJKDEFABC6.value().join(''))

let rXYZJKDEFABC7 = RGA('rXYZJKDEFABC6')
rXYZJKDEFABC7.apply(rDEF.state())
rXYZJKDEFABC7.apply(rXYZJKABC.state())

console.log('rXYZJDEFKABC7', rXYZJKDEFABC7.value().join(''))



