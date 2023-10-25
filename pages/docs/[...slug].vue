<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <nav>
                    <ContentNavigation v-slot="{ navigation }">
                        <div class="list-group">
                            <template v-for="link of navigation.filter(i => i.root)" :key="link._path">
                                <template v-for="child of link.children" :key="child._path">
                                    <NuxtLink class="list-group-item list-group-item-action" activeClass="active" :to="child._path">{{ child.title }}</NuxtLink>
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

                            <template v-if="doc.show_children">
                                <h2>Related</h2>

                                <ContentNavigation v-slot="{ navigation }" :query="{ where: [ { tags: doc.show_children } ] }">
                                    <template v-for="header of navigation[0].children" :key="header._path">
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
                        </article>
                    </ContentDoc>
                </main>
            </div>
        </div>
    </div>
</template>