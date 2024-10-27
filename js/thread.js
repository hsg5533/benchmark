for (;;) fibonacci(32), postMessage("u");
function fibonacci(c) {
  return c <= 1 ? 1 : fibonacci(c - 1) + fibonacci(c - 2);
}
