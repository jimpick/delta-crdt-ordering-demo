const { decode } = require('delta-crdts-msgpack-codec')
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

const before = 'k8ckQJOSwMCSrGtnSEVCRWZ5SjZFPaFrkqxrZ0xFQkNNVDRnOD2hY9RBkMc6QJOSwKxrZ0hFQkVmeUo2RT2SrGtnSEVCRWZ5SjZFPaxrZ0xFQkNNVDRnOD2SrGtnTEVCQ01UNGc4PcA='
const diff = 'k8cRQJGSrGtnUEVCQ01UNGc4PaFk1EGQxzpAk5LArGtnTEVCQ01UNGc4PZKsa2dMRUJDTVQ0Zzg9rGtnUEVCQ01UNGc4PZKsa2dQRUJDTVQ0Zzg9wA=='
const after = 'k8c0QJSSwMCSrGtnSEVCRWZ5SjZFPaFrkqxrZ0xFQkNNVDRnOD2hY5Ksa2dQRUJDTVQ0Zzg9oWTUQZDHVUCUksCsa2dIRUJFZnlKNkU9kqxrZ0hFQkVmeUo2RT2sa2dMRUJDTVQ0Zzg9kqxrZ0xFQkNNVDRnOD2sa2dQRUJDTVQ0Zzg9kqxrZ1BFQkNNVDRnOD3A'

const beforeObj = decode(Buffer.from(before, 'base64'))
const diffObj = decode(Buffer.from(diff, 'base64'))
const afterObj = decode(Buffer.from(after, 'base64'))
// console.log(beforeObj)
// console.log(diffObj)
console.log(afterObj)

r01umQ.apply(beforeObj)
console.log('Before Value:', r01umQ.value().join(''))
r01umQ.apply(diffObj)
console.log('After Value:', r01umQ.value().join(''))
console.log('After State:\n', r01umQ.state())
