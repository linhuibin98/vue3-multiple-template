(() => {
  // source-code.js
  var add = (a, b) => {
    return a + b;
  };

  // index.js
  console.log(add(1, 2));
  function inc(a, b) {
    return a - b;
  }
  console.log(inc(10, 5));
})();
