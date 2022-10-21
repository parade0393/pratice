const digitalReg =  /^([1-9][\d]*|0)(\.[\d]+)?$/;//小数正则
console.log(digitalReg.test('01'))//false
console.log(digitalReg.test('1'))//true
console.log(digitalReg.test('1.1'))//true
console.log(digitalReg.test('1.1.1'))//false
console.log(digitalReg.test('0.1'))//true
console.log(digitalReg.test('1.0'))//true
