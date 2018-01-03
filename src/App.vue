<template>
  <div id="app">
    <link rel="stylesheet" href="../static/dashboard_styles.css">
    <div class="link-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      <header class="link-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600" v-bind:style="[isLoggedin ? '' : {'display': 'none'}]">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title">Home</span>
          <div class="mdl-layout-spacer"></div>
          <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
            <i class="material-icons">more_vert</i>
          </button>
          <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
            <li  @click="logout" class="mdl-menu__item">Logout</li>
          </ul>
        </div>
      </header>
      <div class="link-drawer mdl-layout__drawer mdl-color--indigo-700 mdl-color-text--grey-50" v-bind:style="[isLoggedin ? '' : {'display': 'none'}]">
        <header class="link-drawer-header">
          <img class="link-avatar" v-bind:src="[image ? image : '../static/user.jpg']">
          <span>{{name}}</span>
          <span>{{email}}</span>
        </header>
        <nav class="link-navigation mdl-navigation mdl-color--indigo-500">
          <router-link to="/" class="mdl-navigation__link mdl-navigation-home mdl-color-text--grey-50">
            <i class="mdl-color-text--grey-50 material-icons mdl-navigation-home-icon" role="presentation">home</i>Home
          </router-link>
          <router-link to="/add" class="mdl-navigation__link mdl-navigation-add mdl-color-text--grey-50">
            <i class="mdl-color-text--grey-50 material-icons mdl-navigation-add-icon" role="presentation">add</i>Add
          </router-link>
          <a @click="logout" class="mdl-navigation__link mdl-navigation-add mdl-color-text--grey-50" style="cursor: pointer">
            <i class="mdl-color-text--grey-50 material-icons mdl-navigation-add-icon" role="presentation">close</i>Logout
          </a>
          <div class="mdl-layout-spacer"></div>
        </nav>
      </div>
      <main v-bind:style="[isLoggedin ? '' : {'margin-left': '0px'}]" class="mdl-layout__content mdl-color--grey-100">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'app',
  data() {
    return {
      isLoggedin: false,
      name: "",
      image: null,
      email: ""
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        this.name = user.displayName
        this.email = user.email
        this.image = user.photoURL
        console.log(this.email)
        console.log(this.image)
        this.isLoggedin = true
      } else {
        this.isLoggedin = false
      }
    })
  },
  methods: {
    goNext () {
      this.$router.push('/')
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.goNext()
      })
    }
  }
}
</script>

