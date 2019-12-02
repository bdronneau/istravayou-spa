<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>
      This application crunch your stava data in order to generate graph, donuts and licorns
    </p>

    <div>
      <a :href="getOAuthUrl()">
      <v-img
        src="Logo_Strava.png"
        contain
        height="50"
      ></v-img>
      </a>
    </div>
  </div>
</template>

<script>

import { getOAuthUrl } from '../helpers/strava';

export default {
  name: 'Home',
  props: {
    msg: String
  },
  methods: {
    getOAuthUrl
  },
  mounted () {
    this.$log.debug(`Code from store ${this.$store.getters.code}`)
  }
}
</script>
