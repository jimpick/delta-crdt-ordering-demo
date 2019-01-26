const fs = require('fs')
const CRDTs = require('delta-crdts')
const RGA = CRDTs('rga')
const rgaType = CRDTs.type('rga')
const b58Decode = require('bs58').decode
const { decode, encode } = require('delta-crdts-msgpack-codec')
const { yellow, blue, magenta } = require('chalk')

const crdtId = id => b58Decode(id).slice(-4)

const r00S8c = RGA(crdtId('QmcnJwXLUE27YpyPR7GwRF8h6o1ouR6iBkcTUk9sShXS8c'))
const r01umQ = RGA(crdtId('QmYhezh22kguEdAHB6uqQKLFmT13K46oonvn3jFwCiyumQ'))
const r02ums = RGA(crdtId('QmdXPocZdyJyzXTCc5Z8Mfw35KV1ezC1St8es8UDYKMums'))

const peers = [
  'r00S8c', 'r01umQ', 'r02ums'
]
const crdtIdToName = new Map()
peers.forEach(name => {
  crdtIdToName.set(eval(name).id.toString('hex'), name)
  // console.log(name, eval(name).id, eval(name))
})

const lines = fs.readFileSync('./debug6.out', 'utf8').split('\n')
let peerName
const deltas = []

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  console.log('Line:', i, line)
  let match
  match = line.match(/^Peer: (...)$/)
  if (match) {
    const peer = peers.filter(name => name.match(new RegExp(match[1] + '$')))
    peerName = peer[0]
    console.log(yellow(`Target: ${peerName}`))
    target = eval(peerName)
  }
  match = line.match(/^Data before: (.*)$/)
  if (match) {
    const before = decode(Buffer.from(match[1], 'base64'))
    printRgaMap(before)
    const temp = RGA('temp')
    temp.apply(before)
    console.log(blue(`  ${peerName} Trace before: `, temp.value().join('')))
    console.log(blue(`  ${peerName} Target before:`, target.value().join('')))
  }
  match = line.match(/^Diff: (.*)$/)
  if (match) {
    const diff = decode(Buffer.from(match[1], 'base64'))
    deltas.push(diff)
    console.log(`Delta ${deltas.length - 1}`)
    //printRgaMap(diff)
    printRgaMap(deltas[deltas.length - 1])
    target.apply(diff)
  }
  match = line.match(/^Data after: (.*)$/)
  if (match) {
    const after = decode(Buffer.from(match[1], 'base64'))
    printRgaMap(after)
    const temp = RGA('temp')
    temp.apply(after)
    console.log(magenta(`  ${peerName} Trace after: `, temp.value().join('')))
    console.log(magenta(`  ${peerName} Target after:`, target.value().join('')))
  }
  // if (i > 197 + 3) break
}
/*
console.log('Reconstruct Delta 93 from components:')
const deltaA = deltas[14] // S8c - 158 (push "a")
console.log('Delta 14: a')
printRgaMap(deltaA)
const deltaB = deltas[23] // S8c - 245 (push "b")
console.log('Delta 23: ?b')
printRgaMap(deltaB)
// const deltaC = deltas[32] // S8c - 334 (push "c")
// console.log('Delta 32: ?c')
// printRgaMap(deltaC)
// const deltaD = deltas[43] // S8c - 438 (push "d")
// console.log('Delta 43: ?d')
// printRgaMap(deltaD)
// const deltaE = deltas[49] // S8c - 493 (push "e")
// console.log('Delta 49: ?e')
// printRgaMap(deltaE)
// const deltaEbcda = deltas[75] // PGt - 734 (from S8c)
// console.log('Delta 75: ?e?bcda')
// printRgaMap(deltaEbcda)
// const deltaUvwxy = deltas[80] // PGt - 780 (from VdK)
// console.log('Delta 80: uvwxy')
// printRgaMap(deltaUvwxy)
let batch = rgaType.join(deltaA, deltaB)
// batch = rgaType.join(batch, deltaC)
// batch = rgaType.join(batch, deltaD)
// batch = rgaType.join(batch, deltaE)
// batch = rgaType.join(batch, deltaUvwxy)
console.log('Batch:')
printRgaMap(batch)
// console.log('Delta 93:')
// printRgaMap(deltas[93])
const test1 = RGA('test1')
test1.apply(deltaA)
console.log('test1 a', test1.value().join(''))
test1.apply(deltas[18]) // S8c - 197 (from TK1) EF
console.log('test1 aEF', test1.value().join(''))
test1.apply(deltaB)
console.log('test1 aEFb', test1.value().join(''))
const test2 = RGA('test2')
test2.apply(deltas[18]) // S8c - 197 (from TK1) EF
console.log('test2 EF', test2.value().join(''))
test2.apply(deltaA)
console.log('test2 aEF', test2.value().join(''))
test2.apply(deltaB)
console.log('test2 aEFb', test2.value().join(''))
const test3 = RGA('test3')
test3.apply(deltas[18]) // S8c - 197 (from TK1) EF
console.log('test3 EF', test3.value().join(''))
const batchTest3 = rgaType.join(deltaA, deltaB)
test3.apply(batchTest3)
console.log('test3 aEFb (bad)', test3.value().join(''))
*/
console.log('Done.')

function printRgaMap (state) {
  // console.log('Rga', state)
  const keys = [...state[2].keys()]
  let key = keys[0]
  do {
    printMapKey(state[0], key => state[2].get(key), key)
    key = state[2].get(key)
  } while (key && state[2].has(key))
  const deleted = [...state[1].values()]
  if (deleted.length > 0) {
    console.log('  Deleted:', deleted)
  }
  const unmergedEdges = [...state[3].values()]
  if (unmergedEdges.length > 0) {
    console.log('  Unmerged edges:')
    unmergedEdges.forEach(([left, right]) => printMapKey(
      state[0], () => right, left
    ))
  }
}

function printMapKey (vertexes, getRight, key) {
  let value1 = vertexes.get(key)
  value1 = value1 ? ` "${value1}"` : (key ? ' ???' : `null`)
  const key2 = getRight(key)
  let value2 = vertexes.get(key2)
  value2 = value2 ? `"${value2}"` : (key2 ? '???' : `null`)
  let vertex1
  if (key) {
    const [ clock, crdtId ] = decode(Buffer.from(key, 'base64'))
    let name = crdtIdToName.get(crdtId.toString('hex'))
    if (!name) name = crdtId
    vertex1 = `${key} / ${name}:${String(clock).padStart(2, '0')}`
  } else {
    vertex1 = `          null          ` 
  }
  let vertex2
  if (key2) {
    const [ clock, crdtId ] = decode(Buffer.from(key2, 'base64'))
    let name = crdtIdToName.get(crdtId.toString('hex'))
    if (!name) name = crdtId
    vertex2 = `${key2} / ${name}:${String(clock).padStart(2, '0')}`
  } else {
    vertex2 = `          null          ` 
  }
  // console.log(crdtId, clock, crdtId.toString('hex'))
  console.log(`  [${vertex1}] -> [${vertex2}] ${value1} -> ${value2}`)
}

