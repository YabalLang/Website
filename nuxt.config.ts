import fs from 'fs'

export default defineNuxtConfig({
    modules: [
        '@nuxt/content'
    ],
    content: {
        highlight: {
            theme: 'github-light',
            preload: [
                JSON.parse(fs.readFileSync('./shiki/languages/yabal.tmLanguage.json', 'utf-8'))
            ]
        }
    },
    app: {
        baseURL: '/'
    }
})