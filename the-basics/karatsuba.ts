// Input: two n-digit positive integers
// Output: product of x * y
// Assumption: n is a power of 2

function karatsuba(x: number, y: number): number {
  var n = x.toString().length; // Get length of the number
  if (n == 1) {
    // Base case: return primitive operation when 1-digit number
    return x * y;
  } else {
    // Expand x and y as: (Math.pow(10, n / 2) * firstHalf + secondHalf)
    var a = splitString(x, true);
    var b = splitString(x);
    var c = splitString(y, true);
    var d = splitString(y);
    var p = a + b;
    var q = c + d;
    var ac = karatsuba(a, c);
    var bd = karatsuba(b, d);

    // Instead of recursively computing a*d and b*c
    // (a+b) * (c+d) - a*c - b*d = a*d + b*c
    // |||||||||||||
    // (a*c+a*d+b*c+b*d)
    var pq = karatsuba(p, q);
    var adbc = pq - ac - bd;
    return Math.pow(10, n) * ac + Math.pow(10, n / 2) * adbc + bd;
  }
}

function splitString(a: number, first = false) {
  var word = a.toString();
  var half = Math.round(word.length / 2);
  var b = first ? word.slice(0, half) : word.slice(half, word.length);
  return Number(b);
}

var sum = karatsuba(1234, 5678);
