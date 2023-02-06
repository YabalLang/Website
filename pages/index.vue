<template>
    <h1>Yabal Libraries</h1>
    <div v-for="file in files" :key="file">
        <code><pre>import "{{ file }}"</pre></code>
    </div>
</template>

<style lang="scss">
    @import "./scss/reset.scss";

    h1 {
        font-family: 'Roboto', sans-serif;
        font-size: 1.5em;
        margin: 0;
        padding: 0;
        text-align: center;
        margin-top: 1.5em;
    }

    body {
        background-color: #0e0f15;
        color: #d7d7d7;
        font-family: 'Roboto', sans-serif;
    }

    code {
        display: block;
        padding: 1em;
        margin: 1.5em;
        font-family: 'Roboto Mono', monospace;
        color: #d7d7d7;
        background-color: #14161e;
    }
</style>

<script lang="ts" setup>
const { data, refresh, pending } = useLazyFetch('https://api.github.com/repos/YabalLang/yabal.dev/contents/public/x')
const files = computed(() => 
    (data.value as any[] ?? [])
        .map(file => file.name as string)
        .filter(name => name.endsWith(".yabal"))
        .map(name => name.slice(0, -6)))
</script>