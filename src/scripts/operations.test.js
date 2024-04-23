import Operations from "./operations";

const operations = new Operations();

test("Adding two numbers", () => {
  const result = operations.sum(1, 1);

  expect(result).toBe(2);
});

test("Subtracting two numbers", () => {
  const result = operations.subtraction(1, 1);

  expect(result).toBe(0);
});

test("Multiplying two numbers", () => {
  const result = operations.multiplication(1, 1);

  expect(result).toBe(1);
});

test("Dividing two numbers", () => {
  const result = operations.division(1, 1);

  expect(result).toBe(1);
});

test("Dividing by zero", () => {
  const result = operations.division(1, 0);

  expect(result).toBe("Can't divide by zero");
});
