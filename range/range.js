const start =1; //100
const end = 10; //35

const count= Math.abs(end-start);
const sign = Math.sign(end-start);
const range= Array(count).fill(0).map((x,i)=> start+i*sign);

