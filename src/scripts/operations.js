class Operations {
  sum(x, y) {
    return x + y;
  }

  subtraction(x, y) {
    return x - y;
  }

  multiplication(x, y) {
    return x * y;
  }

  division(x, y) {
    return x / y;
  }

  log(x) {
    return Math.log10(x);
  }

  power(x, y) {
    return Math.pow(x, y);
  }

  factorial(x) {
    if (x === 0 || x === 1) return 1;
    let power = 1;
    for (let i = 2; i <= x; i++) power *= i;
    return power;
  }

  sin(x) {
    return Math.sin(x);
  }

  cos(x) {
    return Math.cos(x);
  }

  tan(x) {
    return Math.tan(x);
  }

  asin(x) {
    return Math.asin(x);
  }

  acos(x) {
    return Math.acos(x);
  }

  atan(x) {
    return Math.atan(x);
  }
}

export default Operations;
