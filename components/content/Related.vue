<template>
    <ContentNavigation v-slot="slot" :query="{ where: [ { tags: props.tags.split(',') } ] }">
        <template v-for="header of slot?.navigation[0]?.children ?? []" :key="header._path">
            <template v-for="child of header.children" :key="child._path">
                <div class="mb-4">
                    <NuxtLink class="list-group-item list-group-item-action" activeClass="active" :to="child._path">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{ child.title }}</h5>
                                <p class="card-text">
                                    <ContentDoc :path="child._path" v-slot="{ doc: child }" :head="false">
                                        {{ child.description }}
                                    </ContentDoc>
                                </p>
                            </div>
                        </div>    
                    </NuxtLink>
                </div>
            </template>
        </template>
    </ContentNavigation>
</template>

<script lang="ts" setup>
const props = defineProps<{
    tags: string
}>()
</script>