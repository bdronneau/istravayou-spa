<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Strava</div>
        <v-list-item-title class="headline mb-1">{{ athlete.firstname }} {{ athlete.lastname }}</v-list-item-title>
        <v-list-item-subtitle>{{ athlete.sexString }} from {{ athlete.city }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      >
        <v-img :src="athlete.profile"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn v-bind:href="athlete.profileUrl" target="_blank" to:true text>Show on Strava</v-btn>
      <v-btn @click="checkApiKnowMe()" text>Check</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import { retrieveAthlete, checkAthlete, authMeAPI } from "../helpers/api"

export default {
    name: 'aboutme',
    data () {
      return {
        athlete: {},
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        retrieveAthlete().then(data => {
          this.$log.debug(data)

          this.athlete = data

          // Format data
          if (data.sex === "M") {
            this.athlete.sexString = "Male"
          } else {
            this.athlete.sexString = "Female"
          }

          this.athlete.profileUrl = `https://www.strava.com/athletes/${data.id}`
        })
      })
    },
    methods: {
      checkApiKnowMe: function () {
        checkAthlete().then(data => {
          this.$log.debug(data)
        }).catch(error => {
            this.$log.error("ErrorCheck", error)
            return authMeAPI()
        })
    }
    }
}
</script>