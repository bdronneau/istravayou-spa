<template>
  <div class="strava">
    <h1>Redirect to app</h1>
  </div>
</template>

<script>

import { persist } from '../helpers/localstorage';
import { authMeAPI } from "../helpers/api"

export default {
    data: () => ({
        data: null,
        fields: ["state", "code", "scope"]
    }),
    mounted () {
        // Check information retrieve by oauth
        this.getStravaInformations(this.$route.query)

        // Save in API
        // TODO: handle error
        authMeAPI().then(() => {
            this.$router.push(({ name: 'account' }))
        })
    },
    methods: {
        persist,
        getStravaInformations: function (query) {
            // TODO: but toaster or something to the end user
            if (query["error"]) {
                 this.$log.error(`User has declined oauth: ${query["error"]}`);
                 return
            }

            if (!query["code"]) {
                 this.$log.error("No code in response");
                 return
            } else {
                // TODO validate code format
                this.$store.commit('setCode', query["code"])
                this.persist('code', query["code"])
                this.$log.debug(query["code"])
            }

            if (query["scope"]) {
                if (query["scope"] === "read,activity:read") {
                    this.$log.debug("Scope is perfect");
                } else {
                    this.$log.warn("Missing scope");
                }
            }
        }
    }
}
</script>
