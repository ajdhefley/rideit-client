import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.js')(on, config)
        },

        baseUrl: 'http://localhost:3000',
        videosFolder: 'cypress/bin/videos',
        screenshotsFolder: 'cypress/bin/screenshots'
    },
})
