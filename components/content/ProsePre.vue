<template>
    <div class="d-flex flex-column">
        <button v-if="$props.language === 'yabal' && $props.filename === 'run'" type="button" class="btn btn-sm btn-outline-secondary small mb-2 align-self-end" @click.prevent="showCode">Run example</button>
        <pre :class="$props.class"><slot /></pre>
    </div>
</template>
  
<script setup lang="ts">
const setEditorCode = useSetEditorCode();

const props = defineProps({
    code: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default: null
    },
    filename: {
        type: String,
        default: null
    },
    highlights: {
        type: Array as () => number[],
        default: () => []
    },
    meta: {
        type: String,
        default: null
    },
    class: {
        type: String,
        default: null
    }
})

const showCode = () => {
    setEditorCode(props.code)
}
</script>
  
<style>
pre code .line {
    display: block;
}
</style>