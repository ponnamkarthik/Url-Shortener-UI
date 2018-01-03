<template>
  <div id="dashboard" style="height: 100%;">
    <div v-if="links.length == 0" style="background-image: url('../../static/no_data.png'); width: 100% !important; height: 100% !important; background-repeat: no-repeat; background-size: contain;">
      <router-link to="/add" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect mdl-color--pink-500" style="float: right; margin: 15px">
        <i class="material-icons">add</i>
      </router-link>
    </div>
    <div v-if="links.length > 0">
      <div  class="mdl-layout__content" style="padding: 0px 15px;">
      <h4>Saved Links</h4>
    </div>
    <!-- Colored FAB button -->
    <router-link to="/add" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect mdl-color--pink-500" style="float: right; margin: 15px">
      <i class="material-icons">add</i>
    </router-link>
    <div class="mdl-grid link-content">
      <div v-for="link in links" v-bind:key="link.id" class="mdl-cell mdl-cell--6-col">
        <div class="link-card-wide mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title">
            <h2 style="width:60%" class="mdl-card__title-text">{{link.title}}</h2>
          </div>
          <div class="mdl-card__supporting-text" style="cursor: copy;" @click="handleCopyStatus()" v-clipboard:copy="link.short_url">
            <strong>{{link.short_url}}  </strong><i class="fa fa-copy"></i>
          </div>
          <div class="mdl-card__supporting-text">
            {{link.url}}
          </div>
          <div class="mdl-card__menu">
            <router-link v-bind:to="{name: 'edit-link', params: {id: link.id}}" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="material-icons">mode_edit</i>
            </router-link>
            <button @click="openInNewTab(link.short_url)" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="fa fa-eye"></i>
            </button>
            <!--todo add share functinoality -->
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i class="fa fa-share-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'
import axios from 'axios'
 
export default {
  name: 'dashboard',
  data() {
    return {
      links: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    handleCopyStatus() {
      Materialize.toast('Copied Successfully!', 2000, 'rounded')
    },
    fetchData() {
      var base_url = "https://urlst.ga/data"


      this.links = [];
      let user = firebase.auth().currentUser
      axios.get(base_url + '?uid=' + user.uid)
      .then(response => {
        this.isLoading = false
        if(!response.data.error) {
          this.links = response.data
        } else {
          Materialize.toast(response.data.msg, 2000, 'rounded')
        }
      })
      .catch(e => {
        this.isLoading = false
        console.log(err)
        Materialize.toast('Error Creating link', 2000, 'rounded')
      })
    },
    openInNewTab(url) {
      var win = window.open(url, '_blank');
      win.focus();
    }
  }
}
</script>