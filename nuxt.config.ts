import fs from 'fs'

export default defineNuxtConfig({
    modules: [
        '@nuxt/content'
    ],
    content: {
        highlight: {
            theme: {
                default: 'github-light',
                dark: 'github-dark'
            },
            preload: [
                JSON.parse(fs.readFileSync('./shiki/languages/yabal.tmLanguage.json', 'utf-8')),
                JSON.parse(fs.readFileSync('./shiki/languages/a8.tmLanguage.json', 'utf-8'))
            ]
        }
    },
    app: {
        baseURL: '/'
    },
    components: {
        global: true,
        dirs: ['~/components']
    },
})