const fs = require('fs');
const iconv = require('iconv-lite');

const buffer = fs.readFileSync('data/기획재정부_온라인복권 판매점 주소_20250607.csv');
const encodings = ['euc-kr', 'cp949', 'utf-8'];

encodings.forEach(enc => {
    console.log(`--- Encoding: ${enc} ---`);
    const decoded = iconv.decode(buffer, enc);
    console.log(decoded.slice(0, 200));
});
