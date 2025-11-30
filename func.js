const arr = [178, 22, 313, 5, 6, 7];

const a = 10 - ((Math.max(...arr) * 1.15) % 10);
console.log(Math.max(...arr) * 1.15 + a);
