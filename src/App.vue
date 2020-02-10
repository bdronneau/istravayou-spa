<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-on:click="disconnect()"
          link
        >
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>I Strava You</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row
          v-if="isLoading"
          align="center"
          justify="center"
        >
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            We have lift off
        </v-row>

        <router-view v-if="!isLoading" />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { getStorageValue, cleanStorageValue } from './helpers/localstorage';
  export default {
    props: {
      source: String,
    },
    data: () => ({
      isLoading: true,
      drawer: false,
      code: null,
      lsFields: ['code']
    }),
    mounted () {
      this.lsFields.forEach(field => {
        this[field] = this.getStorageValue(field)
      })

      if (this.code != null) {
        this.$log.debug('Set code with', this.code)
        this.$store.commit('setCode', this.code)
      }

      setTimeout(() => {
        this.isLoading = false
      }, 2000);
    },
    created () {
      this.$vuetify.theme.dark = true
    },
    methods: {
      getStorageValue,
      cleanStorageValue,
      disconnect: function () {
        this.$log.debug("diconnect stuff")
        this.cleanStorageValue()
        this.$store.resetState
        this.$router.push(({ name: 'home' }))
      }
    }
  }
</script>
