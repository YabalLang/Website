var Module = {}

let compile, step, setExpansionPort;
const screenSize = 108 * 108 * 4;
let running = false;

Module.instantiateWasm = async (info, receiveInstance) => {
    info.env.UpdateScreen = (pointer) => {
        const screen = HEAPU8.slice(pointer, pointer + screenSize);

        self.postMessage(screen);
    };

    info.env.ShowVariable = (line, offset, pointerSize, pointer) => {
        const data = HEAP32.slice(pointer / 4, (pointer + (pointerSize * 4)) / 4);

        self.postMessage(["variable", line, offset, data]);
    };
    
    info.env.Halt = (offset) => {
        running = false;
    };

    console.time('Loading WASM file');
    const response = await fetch('./Yabal.Wasm.wasm', {
        credentials: 'same-origin'
    })
    var result = await WebAssembly.instantiateStreaming(response, info);
    console.timeEnd('Loading WASM file');

    receiveInstance(result.instance);
};

const setImmediate = (function() {
    const {port1, port2} = new MessageChannel();
    const queue = [];

    port1.onmessage = function() {
        const callback = queue.shift();
        callback();
    };

    return function(callback) {
        port2.postMessage(null);
        queue.push(callback);
    };
})();

function loop() {
    step(128);

    if (running) {
        setImmediate(loop);
    }
}

Module.onRuntimeInitialized = _ => {
    compile = Module.cwrap('Compile', null, ['array', 'number']);
    step = Module.cwrap('Step', null, ['number']);
    self.postMessage(["ready"]);
};

self.onmessage = function handleMessageFromMain(msg) {
    const [code, parameter] = msg.data;

    if (code === 'program') {
        console.time('Compiling program');
        try {
            const array = new Uint8Array(parameter);
            const runCode = Module.cwrap('Compile', null, ['array', 'number']);
            runCode(array, array.length);

            running = true;
            loop();
        } finally {
            console.timeEnd('Compiling program');
        }
    }
};

self.importScripts('./Yabal.Wasm.js');