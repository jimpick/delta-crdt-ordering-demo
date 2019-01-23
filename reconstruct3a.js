const CRDTs = require('delta-crdts')
const RGA = CRDTs('rga')
const b58Decode = require('bs58').decode
const { decode, encode } = require('delta-crdts-msgpack-codec')
const rgaType = CRDTs.type('rga')

const crdtId = id => b58Decode(id).slice(-4)

const r00S8c = RGA(crdtId('QmcnJwXLUE27YpyPR7GwRF8h6o1ouR6iBkcTUk9sShXS8c'))
const r01umQ = RGA(crdtId('QmYhezh22kguEdAHB6uqQKLFmT13K46oonvn3jFwCiyumQ'))
const r02ums = RGA(crdtId('QmdXPocZdyJyzXTCc5Z8Mfw35KV1ezC1St8es8UDYKMums'))
const r03Fo9 = RGA(crdtId('Qmc5WHmQzyBn9pi6qrMg9XHcU7m51Myo5CchEjMb3qmFo9'))
const r04VdK = RGA(crdtId('Qme7CEg2BoAXsbWgzEDefH3MFmPfqTAASuwE1ETz59sVdK'))
const r05PGt = RGA(crdtId('QmVPQLtqBwFga3HPRCVZT6ygk9qtXi8aRqTp72i6UTXPGt'))
const r06TK1 = RGA(crdtId('QmZrpe3pyKyNmjucMGgEsBAjRcGkcdgb3avsqYHTFndTK1'))
const r07MBt = RGA(crdtId('QmV8Cu1WNqBw6jHkBun8SHyuv8gHhpiHvtHww6EBkBWMBt'))

const peers = [
  'r00S8c', 'r01umQ', 'r02ums', 'r03Fo9', 'r04VdK', 'r05PGt', 'r06TK1', 'r07MBt'
]
const crdtIdToName = new Map()
peers.forEach(name => {
  crdtIdToName.set(eval(name).id.toString('hex'), name)
  // console.log(name, eval(name).id, eval(name))
})

/*
const abRga = RGA('ab')
const deltaA = abRga.push('a')
const stateA = abRga.state()
const deltaB = abRga.push('b')
console.log('ab:\n', abRga.state())
printRgaMap(abRga.state())

console.log('deltaB:\n', deltaB)
printRgaMap(deltaB)

const ab2Rga = RGA('ab2')
ab2Rga.apply(stateA)
console.log('ab2-1:\n', ab2Rga.state())
printRgaMap(ab2Rga.state())
ab2Rga.apply(deltaB)
console.log('ab2-2:\n', ab2Rga.state())
printRgaMap(ab2Rga.state())

process.exit(0)
*/

const before = `
k8d0QJiSwMCSrGtnSEVCRWZ5SjZFPaFrkqxrZ0xFQlBIWWEydz2hbZKsa2dMRUJDTVQ0Zzg9oWOSrGtnVEVCUEhZYTJ3PaFukqxrZ1BFQkNNVDRnOD2hZJKsa2dIRUJEMGtCNW89oWWSrGtnYkVCQ0VzK1RvPaFp1EGQx8FAmJLArGtnSEVCRWZ5SjZFPZKsa2dIRUJFZnlKNkU9rGtnTEVCUEhZYTJ3PZKsa2dMRUJQSFlhMnc9rGtnTEVCQ01UNGc4PZKsa2dMRUJDTVQ0Zzg9rGtnVEVCUEhZYTJ3PZKsa2dURUJQSFlhMnc9rGtnUEVCQ01UNGc4PZKsa2dQRUJDTVQ0Zzg9rGtnYkVCQ0VzK1RvPZKsa2dIRUJEMGtCNW89wJKsa2diRUJDRXMrVG89rGtnSEVCRDBrQjVvPQ==
`.replace(/\n/g, '')
const beforeObj = decode(Buffer.from(before, 'base64'))
r06TK1.apply(beforeObj)

const deltaG = `
k8cRQJGSrGtnSEVCR3ZwYWd3PaFn1EGQxx9AkpLArGtnSEVCR3ZwYWd3PZKsa2dIRUJHdnBhZ3c9wA==
`.replace(/\n/g, '')
const r03Fo9_delta1 = decode(Buffer.from(deltaG, 'base64'))

const deltaH = `
k8cRQJGSrGtnYkVCR3ZwYWd3PaFo1EGQxzpAk5LArGtnUEVCQ01UNGc4PZKsa2dQRUJDTVQ0Zzg9rGtnYkVCR3ZwYWd3PZKsa2diRUJHdnBhZ3c9wA==
`.replace(/\n/g, '')
const r03Fo9_delta2 = decode(Buffer.from(deltaH, 'base64'))

// Before:
// console.log('Before r06TK1:\n', r06TK1.state())
console.log('Before:\n', beforeObj)
printRgaMap(beforeObj)

console.log('Before r06TK1 value:\n', r06TK1.value().join(''))
// console.log('r06TK1 base64:\n', encode(r06TK1.state()).toString('base64'))
// Before: kmcndie

console.log('g:\n', r03Fo9_delta1)
printRgaMap(r03Fo9_delta1)
console.log('h:\n', r03Fo9_delta2)
printRgaMap(r03Fo9_delta2)

// Apply deltas independently 
// Before: kmcndie
const indieRga = RGA('individual')
indieRga.apply(r06TK1.state())
indieRga.apply(r03Fo9_delta1) // g (order does not matter)
indieRga.apply(r03Fo9_delta2) // h (order does not matter)
console.log('indie:\n', indieRga.state())
printRgaMap(indieRga.state())
console.log('Indie value:', indieRga.value().join(''))
// Indie after: gkmcndhie

const gRga = RGA('g')
gRga.apply(r06TK1.state())
gRga.apply(r03Fo9_delta1)
console.log('"g":\n', gRga.state())
printRgaMap(gRga.state())
console.log('"g" value:', gRga.value().join(''))
// G after: gkmcndie
// Note: g at front of string (fixed)

const hRga = RGA('h')
hRga.apply(r06TK1.state())
hRga.apply(r03Fo9_delta2)
console.log('"h":\n', hRga.state())
printRgaMap(hRga.state())
console.log('"h" value:', hRga.value().join(''))
// H after: gkmcndhie
// Note: h in same position as indie

const hg = rgaType.join(r03Fo9_delta2, r03Fo9_delta1)
console.log('hg:\n', hg)
printRgaMap(hg)
const hgRga = RGA('hg')
hgRga.apply(r06TK1.state())
hgRga.apply(hg)
console.log('"hg":\n', hgRga.state())
printRgaMap(hgRga.state())
console.log('"hg" value:', hgRga.value().join(''))
// Hg after: kmcndhige
// Note: g ends up late in string

try {
  const gh = rgaType.join(r03Fo9_delta1, r03Fo9_delta2)
  console.log('gh:\n', hg)
  printRgaMap(gh)
  const ghRga = RGA('gh')
  ghRga.apply(r06TK1.state())
  ghRga.apply(gh)
  console.log('"gh":\n', ghRga.state())
  printRgaMap(ghRga.state())
  console.log('"gh" value:', ghRga.value().join(''))
} catch (e) {
  console.log('"gh" exc:', e.message)
}
// Gh after: Exception

function printRgaMap (state) {
  let key = null
  do {
    printMapKey(state, key)
    key = state[2].get(key)
  } while (key)
}

function printMapKey (state, key) {
  let value1 = state[0].get(key)
  value1 = value1 ? ` "${value1}"` : (key ? ' ???' : `null`)
  const key2 = state[2].get(key)
  let value2 = state[0].get(key2)
  value2 = value2 ? `"${value2}"` : (key2 ? '???' : `null`)
  let vertex1
  if (key) {
    const [ clock, crdtId ] = decode(Buffer.from(key, 'base64'))
    let name = crdtIdToName.get(crdtId.toString('hex'))
    if (!name) name = crdtId
    vertex1 = `${key} / ${name}:${clock}`
  } else {
    vertex1 = `         null          ` 
  }
  let vertex2
  if (key2) {
    const [ clock, crdtId ] = decode(Buffer.from(key2, 'base64'))
    let name = crdtIdToName.get(crdtId.toString('hex'))
    if (!name) name = crdtId
    vertex2 = `${key2} / ${name}:${clock}`
  } else {
    vertex2 = `         null          ` 
  }
  // console.log(crdtId, clock, crdtId.toString('hex'))
  console.log(`  [${vertex1}] -> [${vertex2}] ${value1} -> ${value2}`)
}

