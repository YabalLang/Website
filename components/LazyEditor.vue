<template>
    <div class="flex-fill d-flex flex-column editor-container">
        <div class="flex-fill overflow-hidden" ref="editorContainer">
            <div class="editor" ref="editorDiv"></div>
        </div>
        <div class="border-bottom">
            <div class="d-flex m-2">
                <button type="button" class="btn btn-sm btn-outline-danger" @click.prevent="editorState.visible = false">Close editor</button>
                <button type="button" class="btn btn-sm btn-primary ms-auto" @click.prevent="runCode()">Run code</button>
            </div>
        </div>
        <div class="screen-container m-2">
            <canvas ref="canvas" class="screen" width="64" height="64"></canvas>
        </div>
    </div>
</template>

<style lang="scss">

:root {
    --scale: 2;
}

.editor {
    position: absolute;
    right: 0;
    width: 100%;
}

.screen {
    width: calc(108px * var(--scale));
    height: calc(108px * var(--scale));
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    background-color: #000;
}

.editor-container {
    border-left: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
    margin-left: -1px;
}

.screen-container {
    display: flex;
    justify-content: center;
}

.variable-display-content {
    position: relative;
    display: inline-block;
    opacity: .5;
    transform: scale(0.9);

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        z-index: -1;
        background-color: rgba(0, 0, 0, .2);
        border-radius: 4px;
    }
}
</style>

<script lang="ts" setup>
import "./editor/github-light.js";
import "./editor/register-yabal.js";
import type { editor as Editor } from "monaco-editor";

const isDark = useDarkTheme();
const editorDiv = ref<HTMLDivElement>();
const canvas = ref<HTMLCanvasElement>();
const editorContainer = ref<HTMLDivElement>();
const editorState = useEditor();
const monaco = useMonaco()!
const ready = ref(false);

function bitRange(value: number, offset: number, n: number) {
    value >>= offset;
    var mask = (1 << n) - 1;
    return value & mask;
}

let runCode = () => { };
let editor: Editor.IStandaloneCodeEditor;

onMounted(() => {
    if (!canvas.value) {
        return;
    }

    editor = monaco.editor.create(editorDiv.value!, {
        language: 'yabal',
        theme: isDark.value ? 'vs-dark' : 'github-light',
    })

    const ctx = canvas.value.getContext('2d')!;
    const imageData = ctx.createImageData(108, 108);

    const worker = new Worker('/runtime/worker.js');
    let variableValues: {[key: string]: Editor.IModelDeltaDecoration} = {};
    let showVariables = false;

    function run(code: string) {
        const enc = new TextEncoder();
        const bytes = enc.encode(code);
        const buffer = bytes.buffer;

        showVariables = true;
        variableValues = {}

        worker.postMessage(['program', buffer], [buffer]);
    }

    editor.addAction({
        id: "run",

        // A label of the action that will be presented to the user.
        label: "Run program",

        // An optional array of keybindings for the action.
        keybindings: [
            monaco.KeyCode.F5,
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyR,
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        ],

        contextMenuGroupId: "navigation",

        contextMenuOrder: 1.5,

        // Method that will be executed when the action is triggered.
        // @param editor The editor instance is passed in as a convenience
        run: function (ed) {
            run(ed.getValue());
        },
    });

    runCode = () => {
        const code = editor.getValue();

        if (ready.value) {
            run(code);
        }
    }

    if (editorState.value.code) {
        editor.setValue(editorState.value.code);
        runCode();
    }

    const decorations = editor.createDecorationsCollection([]);

    editor.onDidChangeModelContent(() => {
        if (showVariables) {
            showVariables = false;
            decorations.set([]);
        }
    });

    worker.onmessage = (event) => {
        if (Array.isArray(event.data)) {
            const type = event.data[0];

            switch (type) {
                case "ready":
                {
                    ready.value = true;
                    
                    const code = editorState.value.code;

                    if (code) {
                        run(code);
                    }
                    break;
                }

                case "variable":
                {
                    const [, line, column, data] = event.data as [string, number, number, Int32Array];
                    const key = `${line}:${column}`;

                    variableValues[key] = {
                        range: new monaco.Range(line, column, line, column + 1),
                        options: {
                                after: {
                                content: data.length === 1 ? ` = ${data[0].toString()} ` : ` = [${Array.from(data).join(", ")}] `,
                                inlineClassName: "variable-display-content"
                            }
                        },
                    };

                    if (showVariables) {
                        decorations.set(Object.values(variableValues));
                    }

                    break;
                }
            }
        } else {
            imageData.data.set(event.data as Uint8Array);
            ctx.putImageData(imageData, 0, 0);
        }
    };
})

useWindowEvent('resize', () => {
    editor?.layout({
        width: editorContainer.value!.clientWidth,
        height: editorContainer.value!.clientHeight
    })
}, { onMount: true });

useWindowEvent('yabal:update_editor', () => {
    if (editorState.value.code) {
        editor.setValue(editorState.value.code);
        runCode();
    }
});
</script>