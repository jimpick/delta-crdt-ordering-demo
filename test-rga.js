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

const before = 'k8dEQJWSwMCSrGtnSEVCRWZ5SjZFPaFrkqxrZ0xFQkNNVDRnOD2hY5Ksa2dQRUJDTVQ0Zzg9oWSSrGtnTEVCUEhZYTJ3PaFt1EGQx3BAlZLArGtnSEVCRWZ5SjZFPZKsa2dIRUJFZnlKNkU9rGtnTEVCUEhZYTJ3PZKsa2dMRUJDTVQ0Zzg9rGtnUEVCQ01UNGc4PZKsa2dQRUJDTVQ0Zzg9wJKsa2dMRUJQSFlhMnc9rGtnTEVCQ01UNGc4PQ=='
const diff = 'k8dEQJWSwMCSrGtnSEVCRWZ5SjZFPaFrkqxrZ0xFQlBIWWEydz2hbZKsa2dMRUJDTVQ0Zzg9oWOSrGtnVEVCUEhZYTJ3PaFu1EGQx3BAlZLArGtnSEVCRWZ5SjZFPZKsa2dIRUJFZnlKNkU9rGtnTEVCUEhZYTJ3PZKsa2dMRUJQSFlhMnc9rGtnTEVCQ01UNGc4PZKsa2dMRUJDTVQ0Zzg9rGtnVEVCUEhZYTJ3PZKsa2dURUJQSFlhMnc9wA=='
const after = 'k8dUQJaSwMCSrGtnSEVCRWZ5SjZFPaFrkqxrZ0xFQkNNVDRnOD2hY5Ksa2dQRUJDTVQ0Zzg9oWSSrGtnTEVCUEhZYTJ3PaFtkqxrZ1RFQlBIWWEydz2hbtRBkMeLQJaSwKxrZ0hFQkVmeUo2RT2SrGtnSEVCRWZ5SjZFPaxrZ0xFQlBIWWEydz2SrGtnTEVCQ01UNGc4PaxrZ1RFQlBIWWEydz2SrGtnUEVCQ01UNGc4PcCSrGtnTEVCUEhZYTJ3PaxrZ0xFQkNNVDRnOD2SrGtnVEVCUEhZYTJ3PaxrZ1BFQkNNVDRnOD0='

const beforeObj = decode(Buffer.from(before, 'base64'))
const diffObj = decode(Buffer.from(diff, 'base64'))
const afterObj = decode(Buffer.from(after, 'base64'))
// console.log(beforeObj)
// console.log(diffObj)
console.log(afterObj)

const target = r04VdK
target.apply(beforeObj)
console.log('Before Value:', target.value().join(''))
target.apply(diffObj)
console.log('After Value:', target.value().join(''))
console.log('After State:\n', target.state())
