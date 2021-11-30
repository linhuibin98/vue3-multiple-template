const worker = new Worker('./worker.js');

worker.postMessage({a: 6, b: 6});

worker.addEventListener('message', ev => {
    app.innerHTML = ev.data;
});

