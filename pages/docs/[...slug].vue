<template>
    <div class="mw-100">
        <div :class="[!editor.visible ? 'container' : 'mw-100']">            
            <div class="row g-0">
                <div class="col-3" v-show="!editor.visible">
                    <div class="pe-4">
                        <div class="d-flex gap-2 align-items-center justify-content-between mt-2 mb-3">
                            <div class="fw-bold fs-4">
                                Yabal
                            </div>

                            <div class="btn-group" role="group" aria-label="Actions">
                                <button type="button" class="btn btn-outline-secondary" @click="isDark = !isDark">
                                    {{ isDark ? '🌙' : '☀️' }}
                                </button>
                                <button type="button" class="btn btn-outline-secondary" @click="editor.visible = true">
                                    ⌨️
                                </button>
                            </div>
                        </div>
                        <nav>
                            <ContentNavigation v-slot="slot">
                                <div class="list-group">
                                    <template v-for="link of slot?.navigation?.filter(i => i.root)" :key="link._path">
                                        <template v-for="child of link.children" :key="child._path">
                                            <NuxtLink class="list-group-item list-group-item-action fw-bold" activeClass="active" :to="child._path">{{ child.title }}</NuxtLink>

                                            <template v-for="subchild of child.children?.filter(i => i.sidebar !== false)" :key="subchild._path">
                                                <NuxtLink class="list-group-item list-group-item-action small ps-5 py-1" activeClass="active" :to="subchild._path">{{ subchild.title }}</NuxtLink>
                                            </template>
                                        </template>
                                    </template>
                                </div>
                            </ContentNavigation>
                        </nav>
                    </div>
                </div>
                <div :class="editor.visible ? 'col-5' : 'col-9'">
                    <main :class="editor.visible ? 'p-4' : ''">
                        <ContentDoc v-slot="slot">
                            <article>
                                <ContentRenderer :value="slot?.doc" />
                            </article>
                        </ContentDoc>
                    </main>
                </div>
                <div v-if="editor.visible" class="col-7">
                    <div class="sticky-top vh-100 d-flex">
                        <LazyEditor />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const isDark = useDarkTheme();
const editor = useEditor();

useHead({
  bodyAttrs: {
    class: computed(() => [isDark.value ? 'dark' : 'light']),
    ["data-bs-theme"] : computed(() => isDark.value ? 'dark' : 'light'),
  },
});
</script>