<template>
    <NuxtLayout>
        <h1>Yabal Libraries</h1>
        <div v-for="file in files" :key="file">
            <code><pre>import "{{ file }}"</pre></code>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const { data, refresh, pending } = useLazyFetch('https://api.github.com/repos/YabalLang/yabal.dev/contents/public/x')
const files = computed(() => 
    (data.value as any[] ?? [])
        .map(file => file.name as string)
        .filter(name => name.endsWith(".yabal"))
        .map(name => name.slice(0, -6)))
</script>