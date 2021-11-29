
self.addEventListener('message', ev => {
    const { a, b } = ev.data;
    self.postMessage(add(a, b));
});

function add(a, b) {
    return a + b;
}
