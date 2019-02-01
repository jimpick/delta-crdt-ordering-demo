const fs = require('fs')
const CRDTs = require('delta-crdts')
const RGA = CRDTs('rga')
const rgaType = CRDTs.type('rga')
const b58Decode = require('bs58').decode
const { decode, encode } = require('delta-crdts-msgpack-codec')

process.env['FORCE_COLOR'] = '1'
const { yellow, blue, magenta, red } = require('chalk')

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

const lines = fs.readFileSync('/Users/test1/tmp/debug1.out', 'utf8').split('\n')
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
  match = line.match(/Batch: \[.+\] \[(.*)\] "(.*)"/)
  if (match) {
    const clockCount = match[1].split(' ').map(clock => clock.match(/:(.*)$/)[1])
      .reduce((acc, clock) => acc + Number(clock), 0)
    if (clockCount !== match[2].length) {
      console.log(red('>>>> Batch clock mismatch!'))
    }
    // console.log('JimX', clocks, match[2])
  }
}
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

