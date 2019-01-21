const CRDTs = require('delta-crdts')
const RGA = CRDTs('rga')
const b58Decode = require('bs58').decode
const { decode, encode } = require('delta-crdts-msgpack-codec')

const crdtId = id => b58Decode(id).slice(-4)

const r00S8c = RGA(crdtId('QmcnJwXLUE27YpyPR7GwRF8h6o1ouR6iBkcTUk9sShXS8c'))
const r01umQ = RGA(crdtId('QmYhezh22kguEdAHB6uqQKLFmT13K46oonvn3jFwCiyumQ'))
const r02ums = RGA(crdtId('QmdXPocZdyJyzXTCc5Z8Mfw35KV1ezC1St8es8UDYKMums'))
const r03Fo9 = RGA(crdtId('Qmc5WHmQzyBn9pi6qrMg9XHcU7m51Myo5CchEjMb3qmFo9'))
const r04VdK = RGA(crdtId('Qme7CEg2BoAXsbWgzEDefH3MFmPfqTAASuwE1ETz59sVdK'))
const r05PGt = RGA(crdtId('QmVPQLtqBwFga3HPRCVZT6ygk9qtXi8aRqTp72i6UTXPGt'))
const r06TK1 = RGA(crdtId('QmZrpe3pyKyNmjucMGgEsBAjRcGkcdgb3avsqYHTFndTK1'))
const r07MBt = RGA(crdtId('QmV8Cu1WNqBw6jHkBun8SHyuv8gHhpiHvtHww6EBkBWMBt'))

// >> push 5 PGt k
const r05PGt_delta1 = r05PGt.push('k')
console.log('05 PGt', r05PGt.value().join(''))

// TK1
r06TK1.apply(r05PGt.state()) // k
console.log('06 TK1', r06TK1.value().join(''))

// S8c
r00S8c.apply(r05PGt.state()) // k
console.log('00 S8c', r00S8c.value().join(''))

// MBt
r07MBt.apply(r05PGt.state()) // k
console.log('07 MBt', r07MBt.value().join(''))

// umQ
r01umQ.apply(r05PGt.state()) // k
console.log('01 umQ', r01umQ.value().join(''))

// >> push 3 Fo9 g
const r03Fo9_delta1 = r03Fo9.push('g')
console.log('03 Fo9', r03Fo9.value().join(''))

// Fo9
r03Fo9.apply(r05PGt.state()) // k
console.log('03 Fo9', r03Fo9.value().join(''))

// >> push 1 umQ c
const r01umQ_delta1 = r01umQ.push('c')
console.log('01 umQ', r01umQ.value().join(''))
const r01umQ_kc = r01umQ.state()

// >> push 6 TK1 m
const r06TK1_delta1 = r06TK1.push('m')
console.log('06 TK1', r06TK1.value().join(''))

// >> push 1 umQ d
const r01umQ_delta2 = r01umQ.push('d')
console.log('01 umQ', r01umQ.value().join(''))

// MBt
r07MBt.apply(r01umQ_delta1) // c
console.log('07 MBt', r07MBt.value().join(''))

// PGt
r05PGt.apply(r01umQ_delta1) // c
console.log('05 PGt', r05PGt.value().join(''))

// Fo9
r03Fo9.apply(r01umQ_delta1) // c
console.log('03 Fo9', r03Fo9.value().join(''))

// S8c
r00S8c.apply(r01umQ_delta1) // c
console.log('00 S8c', r00S8c.value().join(''))

// TK1
r06TK1.apply(r01umQ_delta1) // c
console.log('06 TK1', r06TK1.value().join(''))

// MBt
r07MBt.apply(r06TK1_delta1) // m
console.log('07 MBt', r07MBt.value().join(''))

// PGt
r05PGt.apply(r06TK1_delta1) // m
console.log('05 PGt', r05PGt.value().join(''))

// Fo9
r03Fo9.apply(r06TK1_delta1) // m
console.log('03 Fo9', r03Fo9.value().join(''))

// Fo9
r03Fo9.apply(r01umQ_delta2) // d
console.log('03 Fo9', r03Fo9.value().join(''))

// S8c
r00S8c.apply(r06TK1_delta1) // m
console.log('00 S8c', r00S8c.value().join(''))

// umQ
r01umQ.apply(r06TK1_delta1) // m
console.log('01 umQ', r01umQ.value().join(''))

// >> push 6 TK1 n
const r06TK1_delta2 = r06TK1.push('n')
console.log('06 TK1', r06TK1.value().join(''))
const r06TK1_kmcn = r06TK1.state()

// MBt
r07MBt.apply(r01umQ_delta2) // d
console.log('07 MBt', r07MBt.value().join(''))

// S8c
r00S8c.apply(r01umQ_delta2) // d
console.log('00 S8c', r00S8c.value().join(''))

// PGt
r05PGt.apply(r01umQ_delta2) // d
console.log('05 PGt', r05PGt.value().join(''))

// >> push 3 Fo9 h
const r03Fo9_delta2 = r03Fo9.push('h')
console.log('03 Fo9', r03Fo9.value().join(''))

// TK1
r06TK1.apply(r01umQ_delta2) // d
console.log('06 TK1', r06TK1.value().join(''))

// VdK
r04VdK.apply(r01umQ_kc) // kc
console.log('04 VdK', r04VdK.value().join(''))

// VdK
r04VdK.apply(r01umQ_delta2) // d
console.log('04 VdK', r04VdK.value().join(''))

// umQ
r01umQ.apply(r06TK1_delta2) // n
console.log('01 umQ', r01umQ.value().join(''))

// S8c
r00S8c.apply(r06TK1_delta2) // n
console.log('00 S8c', r00S8c.value().join(''))

// PGt
r05PGt.apply(r06TK1_delta2) // n
console.log('05 PGt', r05PGt.value().join(''))

// VdK
r04VdK.apply(r06TK1_delta1) // m (via umQ)
console.log('04 VdK', r04VdK.value().join(''))

// VdK
r04VdK.apply(r06TK1_kmcn) // kmcn
console.log('04 VdK', r04VdK.value().join(''))

// >> push 0 S8c a
const r00S8c_delta1 = r00S8c.push('a')
console.log('00 S8c', r00S8c.value().join(''))

// Fo9
// Fo9 <- VdK kmcn
r03Fo9.apply(r06TK1_kmcn) // kmcn (via VdK)
console.log('03 Fo9', r03Fo9.value().join(''))

// >> push 7 MBt o
const r07MBt_delta1 = r07MBt.push('o')
console.log('07 MBt', r07MBt.value().join(''))

// MBt
r07MBt.apply(r06TK1_kmcn) // kmcn (via VdK)
console.log('07 MBt', r07MBt.value().join(''))

// >> push 5 PGt l
const r05PGt_delta2 = r05PGt.push('l')
console.log('05 PGt', r05PGt.value().join(''))

// >> push 7 MBt p
const r07MBt_delta2 = r07MBt.push('p')
console.log('07 MBt', r07MBt.value().join(''))

// MBt
r07MBt.apply(r03Fo9_delta1) // g
console.log('07 MBt', r07MBt.value().join(''))

// MBt
r07MBt.apply(r03Fo9_delta2) // h
console.log('07 MBt', r07MBt.value().join(''))

// >> push 2 ums e
const r02ums_delta1 = r02ums.push('e')
console.log('02 ums', r02ums.value().join(''))

// >> push 4 VdK i
const r04VdK_delta1 = r04VdK.push('i')
console.log('04 VdK', r04VdK.value().join(''))
const r04Vdk_kmcndi = r04VdK.state()

// Fo9
r03Fo9.apply(r02ums_delta1) // e
console.log('03 Fo9', r03Fo9.value().join(''))

// umQ
r01umQ.apply(r03Fo9_delta1) // g
console.log('01 umQ', r01umQ.value().join(''))

// umQ
r01umQ.apply(r03Fo9_delta2) // h
console.log('01 umQ', r01umQ.value().join(''))
const r01umQ_gkmcndh = r01umQ.state()

// MBt
r07MBt.apply(r02ums_delta1) // e
console.log('07 MBt', r07MBt.value().join(''))

// TK1
r06TK1.apply(r02ums_delta1) // e
console.log('06 TK1', r06TK1.value().join(''))

// umQ
r01umQ.apply(r02ums_delta1) // e
console.log('01 umQ', r01umQ.value().join(''))

// MBt
r07MBt.apply(r04VdK_delta1) // i
console.log('07 MBt', r07MBt.value().join(''))

// TK1
r06TK1.apply(r04VdK_delta1) // i
console.log('06 TK1', r06TK1.value().join(''))

// PGt
r05PGt.apply(r02ums_delta1) // e
console.log('05 PGt', r05PGt.value().join(''))

// PGt
r05PGt.apply(r04VdK_delta1) // i
console.log('05 PGt', r05PGt.value().join(''))

// VdK
r04VdK.apply(r05PGt_delta2) // l
console.log('04 VdK', r04VdK.value().join(''))

// VdK
r04VdK.apply(r03Fo9_delta1) // g
console.log('04 VdK', r04VdK.value().join(''))

// VdK
r04VdK.apply(r02ums_delta1) // e
console.log('04 VdK', r04VdK.value().join(''))

// VdK
// VdK <- Fo9 he
r04VdK.apply(r03Fo9_delta2) // h
console.log('04 VdK', r04VdK.value().join(''))

// S8c
r00S8c.apply(r03Fo9_delta1) // g
console.log('00 S8c', r00S8c.value().join(''))

// S8c
// S8c <- Fo9 he
r00S8c.apply(r03Fo9_delta2) // h
r00S8c.apply(r02ums_delta1) // e
console.log('00 S8c', r00S8c.value().join(''))

// umQ
r01umQ.apply(r04VdK_delta1) // i (via TK1)
console.log('01 umQ', r01umQ.value().join(''))

// ums
r02ums.apply(r01umQ_gkmcndh) // gkmcndh
console.log('02 ums', r02ums.value().join(''))

// ums
r02ums.apply(r04Vdk_kmcndi) // kmcndi (via TK1)
console.log('02 ums', r02ums.value().join(''))

// MBt
r07MBt.apply(r00S8c_delta1) // a
console.log('07 MBt', r07MBt.value().join(''))

// TK1
// TK1 <- VdK lghe

/*
// Before: kmcndie
r06TK1.apply(r03Fo9_delta2) // h
r06TK1.apply(r05PGt_delta2) // l
r06TK1.apply(r03Fo9_delta1) // g
r06TK1.apply(r02ums_delta1) // e
console.log('06 TK1', r06TK1.value().join(''))
// After: gkmcndhlie
*/

// Before: kmcndie
console.log('h:\n', r03Fo9_delta2)
console.log('e:\n', r02ums_delta1)
console.log('l:\n', r05PGt_delta2)
console.log('g:\n', r03Fo9_delta1)

const indieRga = RGA('individual')
indieRga.apply(r06TK1.state())
indieRga.apply(r03Fo9_delta1) // g
indieRga.apply(r03Fo9_delta2) // h
indieRga.apply(r02ums_delta1) // e
indieRga.apply(r05PGt_delta2) // l
console.log('Jim indie value:', indieRga.value().join(''))
// Indie after: gkmcndhlie

console.log('r03Fo9_delta1 "g" base64:\n', encode(r03Fo9_delta1).toString('base64'))
console.log('r03Fo9_delta2 "h" base64:\n', encode(r03Fo9_delta2).toString('base64'))

const rgaType = CRDTs.type('rga')

const gRga = RGA('g')
gRga.apply(r06TK1.state())
gRga.apply(r03Fo9_delta1)
console.log('Jim g value:', gRga.value().join(''))
// G after: gkmcndie

const he = rgaType.join(r03Fo9_delta2, r02ums_delta1)
const heRga = RGA('he')
heRga.apply(r06TK1.state())
heRga.apply(he)
console.log('Jim he value:', heRga.value().join(''))
// He after: kmcndhie

const hg = rgaType.join(r03Fo9_delta2, r03Fo9_delta1)
const hgRga = RGA('hg')
hgRga.apply(r06TK1.state())
hgRga.apply(hg)
console.log('hg:\n', hg)
console.log('hg keys:')
;[...hg[2].keys()].forEach(key => {
  if (!key) return
  console.log(`  ${key}:`, decode(Buffer.from(key, 'base64')))
})
console.log('Jim hg value:', hgRga.value().join(''))
// Hg after: kmcndhige

try {
  const gh = rgaType.join(r03Fo9_delta1, r03Fo9_delta2)
  const ghRga = RGA('gh')
  ghRga.apply(r06TK1.state())
  ghRga.apply(gh)
  console.log('Jim gh value:', ghRga.value().join(''))
} catch (e) {
  console.log('Jim gh exc:', e.message)
}
// Gh after: Exception


/*
const helRga = RGA('hel')
helRga.apply(hel)
console.log('Jim hel value:', helRga.value().join(''))
*/

/*
const lgheDump = `
k8dEQJWSrGtnYkVCRWZ5SjZFPaFsksDAkqxrZ0hFQkd2cGFndz2hZ5Ksa2diRUJHdnBhZ3c9oWiSrGtnSEVCRDBrQjVvPaFl1EGQx4tAlpLArGtnUEVCQ01UNGc4PZKsa2dQRUJDTVQ0Zzg9rGtnYkVCR3ZwYWd3PZKsa2diRUJFZnlKNkU9rGtnSEVCR3ZwYWd3PZKsa2dIRUJHdnBhZ3c9rGtnSEVCRDBrQjVvPZKsa2diRUJHdnBhZ3c9rGtnYkVCRWZ5SjZFPZKsa2dIRUJEMGtCNW89wA==
`.replace(/\n/g, '')
const lghe = decode(Buffer.from(lgheDump, 'base64'))
console.log('lghe:\n', lghe)
*/
/*
const lgheRga = RGA('lghe')
lgheRga.apply(lghe)
console.log('Jim lghe value:', lgheRga.value().join(''))
*/

/*
r06TK1.apply(lghe) // lghe
console.log('06 TK1', r06TK1.value().join(''))
// After: kmcndhlige
*/

process.exit(0)


// umQ
r01umQ.apply() // 
console.log('01 umQ', r01umQ.value().join(''))

// PGt
r05PGt.apply() // 
console.log('05 PGt', r05PGt.value().join(''))

// PGt
r05PGt.apply() // 
console.log('05 PGt', r05PGt.value().join(''))

// PGt
r05PGt.apply() // 
console.log('05 PGt', r05PGt.value().join(''))

// MBt
r07MBt.apply() // 
console.log('07 MBt', r07MBt.value().join(''))

// Fo9
r03Fo9.apply() // 
console.log('03 Fo9', r03Fo9.value().join(''))

// umQ
r01umQ.apply() // 
console.log('01 umQ', r01umQ.value().join(''))

// ums
r02ums.apply() // 
console.log('02 ums', r02ums.value().join(''))

// ums
r02ums.apply() // 
console.log('02 ums', r02ums.value().join(''))

// VdK
r04VdK.apply() // 
console.log('04 VdK', r04VdK.value().join(''))

// TK1
r06TK1.apply() // 
console.log('06 TK1', r06TK1.value().join(''))

// S8c
r00S8c.apply() // 
console.log('00 S8c', r00S8c.value().join(''))

// Fo9
r03Fo9.apply() // 
console.log('03 Fo9', r03Fo9.value().join(''))

// S8c
r00S8c.apply() // 
console.log('00 S8c', r00S8c.value().join(''))

// >> push 0 S8c b
const r00S8c_delta2 = r00S8c.push('b')
console.log('00 S8c', r00S8c.value().join(''))

// >> push 4 VdK j
const r04VdK_delta2 = r04VdK.push('j')
console.log('04 VdK', r04VdK.value().join(''))

// >> push 2 ums f
const r02ums_delta2 = r02ums.push('f')
console.log('02 ums', r02ums.value().join(''))



