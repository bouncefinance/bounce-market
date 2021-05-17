export function count(s: string, c: string) {
  var n = 0;
  for (let x of s) {
    if (x === c) n++;
  }
  return n;
}
