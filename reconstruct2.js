const CRDTs = require('delta-crdts')
const RGA = CRDTs('rga')
const b58Decode = require('bs58').decode

const crdtId = id => b58Decode(id).slice(-4)

const r00S8c = RGA(crdtId('QmcnJwXLUE27YpyPR7GwRF8h6o1ouR6iBkcTUk9sShXS8c'))
const r01umQ = RGA(crdtId('QmYhezh22kguEdAHB6uqQKLFmT13K46oonvn3jFwCiyumQ'))
const r02ums = RGA(crdtId('QmdXPocZdyJyzXTCc5Z8Mfw35KV1ezC1St8es8UDYKMums'))
const r03Fo9 = RGA(crdtId('Qmc5WHmQzyBn9pi6qrMg9XHcU7m51Myo5CchEjMb3qmFo9'))
const r04VdK = RGA(crdtId('Qme7CEg2BoAXsbWgzEDefH3MFmPfqTAASuwE1ETz59sVdK'))
const r05PGt = RGA(crdtId('QmVPQLtqBwFga3HPRCVZT6ygk9qtXi8aRqTp72i6UTXPGt'))
const r06TK1 = RGA(crdtId('QmZrpe3pyKyNmjucMGgEsBAjRcGkcdgb3avsqYHTFndTK1'))
const r07MBt = RGA(crdtId('QmV8Cu1WNqBw6jHkBun8SHyuv8gHhpiHvtHww6EBkBWMBt'))
const r0892B = RGA(crdtId('QmWxQttBj8b2S2vwDyxwxh3uWcbzs5Gxc1digTNx8BE92B'))

// >> push 4 VdK i
const r04VdK_delta1 = r04VdK.push('i')
console.log('04 VdK', r04VdK.value().join(''))

// >> push 4 VdK j
const r04VdK_delta2 = r04VdK.push('j')
console.log('04 VdK', r04VdK.value().join(''))
const r04VdK_ij = r04VdK.state()

// >> push 7 MBt o
const r07MBt_delta1 = r07MBt.push('o')
console.log('07 MBt', r07MBt.value().join(''))

// >> push 5 PGt k
const r05PGt_delta1 = r05PGt.push('k')
console.log('05 PGt', r05PGt.value().join(''))
const r05PGt_k = r05PGt.state()

// >> push 0 S8c a
const r00S8c_delta1 = r00S8c.push('a')
console.log('00 S8c', r00S8c.value().join(''))

// >> push 8 92B q
const r0892B_delta1 = r0892B.push('q')
console.log('08 92B', r0892B.value().join(''))
const r0892B_q = r0892B.state()

// PGt
r05PGt.apply(r04VdK.state()) // ij
console.log('05 PGt', r05PGt.value().join(''))

// 92B
r0892B.apply(r04VdK.state()) // ij
console.log('08 92B', r0892B.value().join(''))
const r0892B_qij = r0892B.state()

// Fo9
r03Fo9.apply(r05PGt_k) // k
console.log('03 Fo9', r03Fo9.value().join(''))

// VdK
r04VdK.apply(r05PGt.state()) // k
console.log('04 VdK', r04VdK.value().join(''))

// 92B
r0892B.apply(r05PGt.state()) // k
console.log('08 92B', r0892B.value().join(''))

// Fo9
r03Fo9.apply(r0892B_q) // q
console.log('03 Fo9', r03Fo9.value().join(''))

// Fo9
r03Fo9.apply(r0892B.state()) // qkij
console.log('03 Fo9', r03Fo9.value().join(''))

// ums
r02ums.apply(r04VdK_ij) // ij
console.log('02 ums', r02ums.value().join(''))

// TK1
r06TK1.apply(r04VdK_ij) // ij
console.log('06 TK1', r06TK1.value().join(''))

// TK1
r06TK1.apply(r04VdK.state()) // kij
console.log('06 TK1', r06TK1.value().join(''))

// ums
r02ums.apply(r0892B_qij) // qij
console.log('02 ums', r02ums.value().join(''))

// ums
r02ums.apply(r05PGt_delta1) // k (via 92B)
console.log('02 ums', r02ums.value().join(''))

// umQ
r01umQ.apply(r05PGt.state()) // kij
console.log('01 umQ', r01umQ.value().join(''))

// umQ
r01umQ.apply(r0892B_qij) // qij
console.log('01 umQ', r01umQ.value().join(''))

// VdK
r04VdK.apply(r0892B_delta1) // q (via Fo9)
console.log('04 VdK', r04VdK.value().join(''))

// PGt
r05PGt.apply(r0892B_delta1) // q (via Fo9)
console.log('05 PGt', r05PGt.value().join(''))

// TK1
r06TK1.apply(r0892B.state()) // qkij
console.log('06 TK1', r06TK1.value().join(''))

// >> push 0 S8c b
const r00S8c_delta2 = r00S8c.push('b')
console.log('00 S8c', r00S8c.value().join(''))

// >> push 3 Fo9 g
const r03Fo9_delta1 = r03Fo9.push('g')
console.log('03 Fo9', r03Fo9.value().join(''))

// >> push 8 92B r
const r0892B_delta2 = r0892B.push('r')
console.log('08 92B', r0892B.value().join(''))

// Fo9
r03Fo9.apply(r0892B_delta2) // r (via 92B)
console.log('03 Fo9', r03Fo9.value().join(''))

// ums
r02ums.apply(r00S8c.state()) // ab
console.log('02 ums', r02ums.value().join(''))

// >> push 5 PGt l
const r05PGt_delta2 = r05PGt.push('l')
console.log('05 PGt', r05PGt.value().join(''))

// VdK
r04VdK.apply(r00S8c.state()) // ab
console.log('04 VdK', r04VdK.value().join(''))

// 92B
r0892B.apply(r00S8c.state()) // ab
console.log('08 92B', r0892B.value().join(''))

// 92B
r0892B.apply(r07MBt.state()) // o
console.log('08 92B', r0892B.value().join(''))

// TK1
r06TK1.apply(r07MBt.state()) // o
console.log('06 TK1', r06TK1.value().join(''))

// TK1
r06TK1.apply(r0892B_delta2) // r (via 92b)
console.log('06 TK1', r06TK1.value().join(''))

// Fo9
r03Fo9.apply(r07MBt.state()) // o
console.log('03 Fo9', r03Fo9.value().join(''))

process.exit(0)
// ums
// umQ
// S8c
// PGt
// PGt


// >> push 6 TK1 m
const r06TK1_delta1 = r06TK1.push('m')
console.log('06 TK1', r06TK1.value().join(''))

// >> push 6 TK1 n
const r06TK1_delta2 = r06TK1.push('n')
console.log('06 TK1', r06TK1.value().join(''))

// >> push 2 ums e
const r02ums_delta1 = r02ums.push('e')
console.log('02 ums', r02ums.value().join(''))

// >> push 3 Fo9 h
const r03Fo9_delta2 = r03Fo9.push('h')
console.log('03 Fo9', r03Fo9.value().join(''))

// >> push 1 umQ c
const r01umQ_delta1 = r01umQ.push('c')
console.log('01 umQ', r01umQ.value().join(''))

// >> push 7 MBt p
const r07MBt_delta2 = r07MBt.push('p')
console.log('07 MBt', r07MBt.value().join(''))

// >> push 1 umQ d
const r01umQ_delta2 = r01umQ.push('d')
console.log('01 umQ', r01umQ.value().join(''))

// >> push 2 ums f
const r02ums_delta2 = r02ums.push('f')
console.log('02 ums', r02ums.value().join(''))




