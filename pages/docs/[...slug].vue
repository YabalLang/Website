<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <div class="d-flex gap-2 align-items-center justify-content-between">
                    <div class="mt-2 mb-3 text-center fw-bold fs-4">
                        Yabal documentation
                    </div>

                    <button type="button" class="btn btn-outline-secondary" @click="isDark = !isDark">
                        {{ isDark ? '🌙' : '☀️' }}
                    </button>
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
            <div class="col-9">
                <main>
                    <ContentDoc v-slot="{ doc }">
                        <article>
                            <ContentRenderer :value="doc" />
                        </article>
                    </ContentDoc>
                </main>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const isDark = useState('theme', () => false)

useHead({
  bodyAttrs: {
    class: computed(() => [isDark.value ? 'dark' : 'light']),
    ["data-bs-theme"] : computed(() => isDark.value ? 'dark' : 'light'),
  },
});
</script>