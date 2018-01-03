<template>
  <div id="add-new-link">
    <div class="mdl-layout__content" style="padding: 0px 15px;">
      <h4>Short Link</h4>
    </div>
    <div class="row">
      <form @submit.prevent="shortLink" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="code" >
            <label>Short Name (Optional)</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="url" required>
            <label>Pasre Long Url</label>
          </div>
        </div>
        <button type="submit" class="btn pink">Submit</button>
        <router-link to="/dashboard" class="btn blue-grey">Cancel</router-link>
        <img v-bind:style="[ isLoading ? {'display': ''} : {'display': 'none' } ]" style="margin-left: 10px" src="../../static/loader.gif" />
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'
import cheerio from 'cheerio'


export default {
  name: 'add-new-link',
  data() {
    return {
      id: null,
      code: null,
      url: null,
      isLoading: false
    }
  },
  methods: {
    shortLink () {
      var base_url = "https://urlst.ga/add"
      this.isLoading = true
      let user = firebase.auth().currentUser
      this.$http.get(base_url + '?uid=' + user.uid + '&url=' + this.url + '&code=' + this.code)
      .then(response => {
        this.isLoading = false
        if(!response.data.error) {
          console.log(response.data)
          this.$router.push('/dashboard')
          Materialize.toast('Link Created Successfully', 2000, 'rounded')
        } else {
          Materialize.toast(response.data.msg, 2000, 'rounded')
        }
      },
      e => {
        this.isLoading = false
        console.log(e)
        Materialize.toast('Error Creating link', 2000, 'rounded')
      })
    }
  }
}
</script>

<style>
#add-new-link {
  padding: 15px 10px;
}
</style>
