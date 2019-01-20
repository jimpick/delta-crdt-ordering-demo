const CRDTs = require('delta-crdts')
const RGA = CRDTs('rga')
const b58Decode = require('bs58').decode

const crdtId = id => b58Decode(id).slice(-4)

// >> push 5 PGt f

const r05PGt = RGA(crdtId('QmVPQLtqBwFga3HPRCVZT6ygk9qtXi8aRqTp72i6UTXPGt'))
const r05PGt_delta1 = r05PGt.push('f')
console.log('05 PGt', r05PGt.value().join(''))

// >> push 14 rjU o

const r14rjU = RGA(crdtId('QmSewTcDD4hgGM1Xp6hCzGZtRuxhS3M6zEBmTPkMtnkrjU'))
const r14rjU_delta1 = r14rjU.push('o')
console.log('14 rjU', r14rjU.value().join(''))

// >> push 7 MBt h

const r07MBt = RGA(crdtId('QmV8Cu1WNqBw6jHkBun8SHyuv8gHhpiHvtHww6EBkBWMBt'))
const r07MBt_delta1 = r07MBt.push('h')
console.log('07 MBt', r07MBt.value().join(''))

// >> push 7 MBt i

const r07MBt_delta2 = r07MBt.push('i')
console.log('07 MBt', r07MBt.value().join(''))
const r07MBt_hi = r07MBt.state()

r07MBt.apply(r14rjU.state()) // o
console.log('07 MBt', r07MBt.value().join(''))
const r07MBt_hio = r07MBt.state()

// >> push 13 Uik n

const r13Uik = RGA(crdtId('QmSfrysaxzMQ6dzRFqtRB1Ao5Kp7Hher9zpRav4tEhsUik'))
const r13Uik_delta1 = r13Uik.push('n')
console.log('13 Uik', r13Uik.value().join(''))

// >> push 9 bJa j

const r09bJa = RGA(crdtId('QmaLb1HuEbkW9hv1F2ZCnLwS7exk1rPK5KFKpT5WYfzbJa'))
const r09bJa_delta1 = r09bJa.push('j')
console.log('09 bJa', r09bJa.value().join(''))

const r00S8c = RGA(crdtId('QmcnJwXLUE27YpyPR7GwRF8h6o1ouR6iBkcTUk9sShXS8c'))
r00S8c.apply(r14rjU.state()) // o
console.log('00 S8c', r00S8c.value().join(''))

const r06TK1 = RGA(crdtId('QmZrpe3pyKyNmjucMGgEsBAjRcGkcdgb3avsqYHTFndTK1'))
r06TK1.apply(r14rjU.state()) // o
console.log('06 TK1', r06TK1.value().join(''))

const r04VdK = RGA(crdtId('Qme7CEg2BoAXsbWgzEDefH3MFmPfqTAASuwE1ETz59sVdK'))
r04VdK.apply(r14rjU.state()) // o
console.log('04 VdK', r04VdK.value().join(''))

// >> push 0 S8c a

const r00S8c_delta1 = r00S8c.push('a')
console.log('00 S8c', r00S8c.value().join(''))

r05PGt.apply(r14rjU.state()) // o
console.log('05 PGt', r05PGt.value().join(''))

const r01umQ = RGA(crdtId('QmYhezh22kguEdAHB6uqQKLFmT13K46oonvn3jFwCiyumQ'))
r01umQ.apply(r14rjU.state()) // o
console.log('01 umQ', r01umQ.value().join(''))

// >> push 7 MBt j

const r07MBt_delta3 = r07MBt.push('j')
console.log('07 MBt', r07MBt.value().join(''))

// >> push 8 92B i

const r0892B = RGA(crdtId('QmWxQttBj8b2S2vwDyxwxh3uWcbzs5Gxc1digTNx8BE92B'))
const r0892B_delta1 = r0892B.push('i')
console.log('08 92B', r0892B.value().join(''))

// >> push 12 aKg m

const r12aKg = RGA(crdtId('QmYsYqqh2N2p7janRewDbu6S7eSekjTXEZymyvRUHpuaKg'))
const r12aKg_delta1 = r12aKg.push('m')
console.log('12 aKg', r12aKg.value().join(''))

// >> push 5 PGt g

const r05PGt_delta2 = r05PGt.push('g')
console.log('05 PGt', r05PGt.value().join(''))

// >> push 11 CNo l

const r11CNo = RGA(crdtId('QmNdsLQKHfvnvC8hwky8jtaFr5ZZ9dvCjJPcQ1BY4fcCNo'))
const r11CNo_delta1 = r11CNo.push('l')
console.log('11 CNo', r11CNo.value().join(''))

// >> push 14 rjU p

const r14rjU_delta2 = r14rjU.push('p')
console.log('14 rjU', r14rjU.value().join(''))
r14rjU_op = r14rjU.state()

// >> push 9 bJa k

const r09bJa_delta2 = r09bJa.push('k')
console.log('09 bJa', r09bJa.value().join(''))

r07MBt.apply(r12aKg.state()) // m
console.log('07 MBt', r07MBt.value().join(''))

r07MBt.apply(r11CNo.state()) // l
console.log('07 MBt', r07MBt.value().join(''))

r04VdK.apply(r11CNo.state()) // l
console.log('04 VdK', r04VdK.value().join(''))

// >> push 10 UED k

const r10UED = RGA(crdtId('QmdxxnZWVqh7MdpTM1EYTpbLjoT1zshDKFz8JjvnBcmUED'))
const r10UED_delta1 = r10UED.push('k')
console.log('10 UED', r10UED.value().join(''))

r04VdK.apply(r12aKg.state()) // m
console.log('04 VdK', r04VdK.value().join(''))

r14rjU.apply(r12aKg.state()) // m
console.log('14 rjU', r14rjU.value().join(''))

r14rjU.apply(r11CNo.state()) // l
console.log('14 rjU', r14rjU.value().join(''))

r00S8c.apply(r12aKg.state()) // m
console.log('00 S8c', r00S8c.value().join(''))

r06TK1.apply(r11CNo.state()) // l
console.log('06 TK1', r06TK1.value().join(''))

r06TK1.apply(r12aKg.state()) // m
console.log('06 TK1', r06TK1.value().join(''))

// >> push 2 ums c

const r02ums = RGA(crdtId('QmdXPocZdyJyzXTCc5Z8Mfw35KV1ezC1St8es8UDYKMums'))
const r02ums_delta1 = r02ums.push('c')
console.log('02 ums', r02ums.value().join(''))

r05PGt.apply(r12aKg.state()) // m
console.log('05 PGt', r05PGt.value().join(''))

// >> push 0 S8c b

const r00S8c_delta2 = r00S8c.push('b')
console.log('00 S8c', r00S8c.value().join(''))

r01umQ.apply(r11CNo.state()) // l
console.log('01 umQ', r01umQ.value().join(''))

r05PGt.apply(r11CNo.state()) // l
console.log('05 PGt', r05PGt.value().join(''))

r07MBt.apply(r14rjU_op) // op
console.log('07 MBt', r07MBt.value().join(''))

r00S8c.apply(r14rjU_op) // op
console.log('00 S8c', r00S8c.value().join(''))

r06TK1.apply(r14rjU_op) // op
console.log('06 TK1', r06TK1.value().join(''))

r01umQ.apply(r14rjU_op) // op
console.log('01 umQ', r01umQ.value().join(''))

r04VdK.apply(r14rjU_op) // op
console.log('04 VdK', r04VdK.value().join(''))

r05PGt.apply(r14rjU_op) // op
console.log('05 PGt', r05PGt.value().join(''))

// >> push 6 TK1 g

const r06TK1_delta1 = r06TK1.push('g')
console.log('06 TK1', r06TK1.value().join(''))

// >> push 1 umQ b

const r01umQ_delta1 = r01umQ.push('b')
console.log('01 umQ', r01umQ.value().join(''))
const r01umQ_lopb = r01umQ.state()

// >> push 4 VdK e

const r04VdK_delta1 = r04VdK.push('e')
console.log('04 VdK', r04VdK.value().join(''))

r09bJa.apply(r12aKg.state()) // m
console.log('09 bJa', r09bJa.value().join(''))

r01umQ.apply(r12aKg.state()) // m
console.log('01 umQ', r01umQ.value().join(''))

// >> push 3 Fo9 d

const r03Fo9 = RGA(crdtId('Qmc5WHmQzyBn9pi6qrMg9XHcU7m51Myo5CchEjMb3qmFo9'))
const r03Fo9_delta1 = r03Fo9.push('d')
console.log('03 Fo9', r03Fo9.value().join(''))

r00S8c.apply(r11CNo.state()) // l
console.log('00 S8c', r00S8c.value().join(''))

r03Fo9.apply(r01umQ.state()) // lopbm
console.log('03 Fo9', r03Fo9.value().join(''))

r03Fo9.apply(r09bJa.state()) // jkm
console.log('03 Fo9', r03Fo9.value().join(''))
const r03Fo9_lopbdjkm = r03Fo9.state()

r04VdK.apply(r09bJa.state()) // jkm
console.log('04 VdK', r04VdK.value().join(''))

r09bJa.apply(r05PGt.state()) // lopfgm
console.log('09 bJa', r09bJa.value().join(''))
const r09bJa_lopjkfgm = r09bJa.state()

r09bJa.apply(r06TK1.state()) // lopmg
console.log('09 bJa', r09bJa.value().join(''))

r01umQ.apply(r05PGt.state()) // lopfgm
console.log('01 umQ', r01umQ.value().join(''))

r05PGt.apply(r04VdK.state()) // lopjkme
console.log('05 PGt', r05PGt.value().join(''))
const r05PGt_lopjkfgme = r05PGt.state()

r03Fo9.apply(r06TK1.state()) // lopmg
console.log('03 Fo9', r03Fo9.value().join(''))

r06TK1.apply(r01umQ_lopb) // lopb
console.log('06 TK1', r06TK1.value().join(''))

r06TK1.apply(r01umQ.state()) // lopbfgm
console.log('06 TK1', r06TK1.value().join(''))

// >> push 2 ums d

const r02ums_delta2 = r02ums.push('d')
console.log('02 ums', r02ums.value().join(''))
const r02ums_cd = r02ums.state()

r04VdK.apply(r09bJa_lopjkfgm) // lopjkfgm
console.log('04 VdK', r04VdK.value().join(''))

r04VdK.apply(r01umQ.state()) // lopbfgm
console.log('04 VdK', r04VdK.value().join(''))

r04VdK.apply(r03Fo9_lopbdjkm) // lopbdjkm
console.log('04 VdK', r04VdK.value().join(''))

r04VdK.apply(r06TK1.state()) // lopbfgmg
console.log('04 VdK', r04VdK.value().join(''))

r05PGt.apply(r10UED.state()) // k
console.log('05 PGt', r05PGt.value().join(''))

r04VdK.apply(r10UED.state()) // k
console.log('04 VdK', r04VdK.value().join(''))

r09bJa.apply(r05PGt.state()) // lopjkkfgme
console.log('09 bJa', r09bJa.value().join(''))

r01umQ.apply(r05PGt.state()) // lopjkkfgme
console.log('01 umQ', r01umQ.value().join(''))

r03Fo9.apply(r06TK1.state()) // lopbfgmg
console.log('03 Fo9', r03Fo9.value().join(''))

r06TK1.apply(r05PGt_lopjkfgme) // lopjkfgme
console.log('06 TK1', r06TK1.value().join(''))

r06TK1.apply(r01umQ.state()) // lopbjkkfgme
console.log('06 TK1', r06TK1.value().join(''))

r04VdK.apply(r02ums.state()) // cd
console.log('04 VdK', r04VdK.value().join(''))
const r04VdK_lopbdjkkfgcdmge = r04VdK.state()

r05PGt.apply(r03Fo9.state()) // lopbdjkfgmg
console.log('05 PGt', r05PGt.value().join(''))

r03Fo9.apply(r06TK1.state()) // lopbjkkfgmge
console.log('03 Fo9', r03Fo9.value().join(''))

r02ums.apply(r09bJa.state()) // lopjkkfgmge
console.log('02 ums', r02ums.value().join(''))

r02ums.apply(r05PGt.state()) // lopbdjkkfgmge
console.log('02 ums', r02ums.value().join(''))

r05PGt.apply(r02ums.state()) // lopbdjkkfgcdmge
console.log('05 PGt', r05PGt.value().join(''))

r10UED.apply(r02ums_cd) // cd
console.log('10 UED', r10UED.value().join(''))

r10UED.apply(r02ums.state()) // lopbdjkkfgcdmge
console.log('10 UED', r10UED.value().join(''))

// >> push 2 ums e

const r02ums_delta3 = r02ums.push('e')
console.log('02 ums', r02ums.value().join(''))

r09bJa.apply(r07MBt_hio) // hio
console.log('09 bJa', r09bJa.value().join(''))
const r09bJa_hilopjkkfgmge = r09bJa.state()

r09bJa.apply(r07MBt.state()) // hilojpm
console.log('09 bJa', r09bJa.value().join(''))

r05PGt.apply(r07MBt_hio) // hio
console.log('05 PGt', r05PGt.value().join(''))
const r05PGt_hilopbdjkkfgcdmge = r05PGt.state()

r05PGt.apply(r09bJa.state()) // hilojpjkkfgmge
console.log('05 PGt', r05PGt.value().join(''))
const r05PGt_hilojpbdjkkfgcdmge = r05PGt.state()

// >> push 1 umQ c

const r01umQ_delta2 = r01umQ.push('c')
console.log('01 umQ', r01umQ.value().join(''))
const r01umQ_lopbjkkfgmec = r01umQ.state()

// >> push 10 UED l

const r10UED_delta2 = r10UED.push('l')
console.log('10 UED', r10UED.value().join(''))
const r10UED_lopbdjkkfgcdmgel = r10UED.state()

r10UED.apply(r02ums.state()) // lopbdjkkfgcdmgee
console.log('10 UED', r10UED.value().join(''))

r04VdK.apply(r02ums.state()) // lopbdjkkfgcdmgee
console.log('04 VdK', r04VdK.value().join(''))

r09bJa.apply(r0892B.state()) // i
console.log('09 bJa', r09bJa.value().join(''))

r09bJa.apply(r04VdK_lopbdjkkfgcdmge) // lopbdjkkfgcdmge
console.log('09 bJa', r09bJa.value().join(''))

r01umQ.apply(r0892B.state()) // i
console.log('01 umQ', r01umQ.value().join(''))

r05PGt.apply(r10UED_lopbdjkkfgcdmgel) // lopbdjkkfgcdmgel
console.log('05 PGt', r05PGt.value().join(''))

r03Fo9.apply(r0892B.state()) // i 
console.log('03 Fo9', r03Fo9.value().join(''))

r03Fo9.apply(r09bJa_hilopjkkfgmge) // hilopjkkfgmge
console.log('03 Fo9', r03Fo9.value().join(''))

r03Fo9.apply(r07MBt.state()) // hilojpm
console.log('03 Fo9', r03Fo9.value().join(''))

r02ums.apply(r09bJa_hilopjkkfgmge) // hilopjkkfgmge
console.log('02 ums', r02ums.value().join(''))

r02ums.apply(r05PGt_hilojpbdjkkfgcdmge) // hilojpbdjkkfgcdmge
console.log('02 ums', r02ums.value().join(''))

// >> push 5 PGt h

const r05PGt_delta3 = r05PGt.push('h')
console.log('05 PGt', r05PGt.value().join(''))

r07MBt.apply(r05PGt_hilopbdjkkfgcdmge) // hilopbdjkkfgcdmge
console.log('07 MBt', r07MBt.value().join(''))

// VdK
// 01 umQ lopbjkkfgmec
r04VdK.apply(r01umQ_lopbjkkfgmec) // lopbjkkfgmec
// Weird, two character diff
// NO: r04VdK.apply(r0892B.state()) // i 
// const r07MBt_hi = r07MBt.state()
// NO: r04VdK.apply(r07MBt_hi) // hi 
// NO: r04VdK.apply(r07MBt_delta2)
// NO: r04VdK.apply(r0892B_delta1)
console.log('04 VdK', r04VdK.value().join(''))

// PGt
// r05PGt.apply(r.state()) // 
// console.log('05 PGt', r05PGt.value().join(''))

// VdK
// r04VdK.apply(r.state()) // 
// console.log('04 VdK', r04VdK.value().join(''))

// VdK
// r04VdK.apply(r.state()) // 
// console.log('04 VdK', r04VdK.value().join(''))

// umQ
// r01umQ.apply(r.state()) // 
// console.log('01 umQ', r01umQ.value().join(''))

// umQ
// r01umQ.apply(r.state()) // 
// console.log('01 umQ', r01umQ.value().join(''))

// Fo9
// r03Fo9.apply(r.state()) // 
// console.log('03 Fo9', r03Fo9.value().join(''))

// UED
// r10UED.apply(r.state()) // 
// console.log('10 UED', r10UED.value().join(''))

// UED
// r10UED.apply(r.state()) // 
// console.log('10 UED', r10UED.value().join(''))

// ums
// r02ums.apply(r) // 
// console.log('02 ums', r02ums.value().join(''))

// 92B
// r0892B.apply(r) // 
// console.log('08 92B', r0892B.value().join(''))

// 92B
// r0892B.apply(r) // 
// console.log('08 92B', r0892B.value().join(''))

// PGt
// r05PGt.apply(r.state()) // 
// console.log('05 PGt', r05PGt.value().join(''))


// >> push 9 bJa l
// >> push 4 VdK f
// >> push 13 Uik o
// >> push 6 TK1 h
// >> push 10 UED m

// const r10UED_delta3 = r10UED.push('m')
// console.log('10 UED', r10UED.value().join(''))

// >> push 8 92B j
// >> push 11 CNo m
// >> push 0 S8c c
// >> push 12 aKg n
// >> push 14 rjU q
// >> push 3 Fo9 e
// >> push 11 CNo n
// >> push 1 umQ d

// const r01umQ_delta2 = r01umQ.push('c')
// console.log('01 umQ', r01umQ.value().join(''))

// >> push 4 VdK g
// >> push 12 aKg o
// >> push 6 TK1 i
// >> push 8 92B k
// >> push 3 Fo9 f
// >> push 13 Uik p
