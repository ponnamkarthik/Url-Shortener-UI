<template>
  <div id="edit-link">
    <div class="mdl-layout__content" style="padding: 0px 15px;">
      <h4>Edit Link</h4>
    </div>
    <div class="row">
      <form @submit.prevent="updateLink" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="title" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="url" required>
          </div>
        </div>
        <button type="submit" class="btn pink">Update</button>
        <router-link to="/dashboard" class="btn blue-grey">Cancel</router-link>
        <img v-bind:style="[ isLoading ? {'display': ''} : {'display': 'none' } ]" style="margin-left: 10px" src="../../static/loader.gif" />
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'
export default {
  name: 'edit-link',
  data() {
    return {
      id: null,
      title: null,
      url: null,
      isLoading: false
    }
  },
  beforeRouteEnter (to, from, next) {
    db.collection('links').doc(to.params.id).get()
    .then(querySnapshot => {
      var doc = querySnapshot
      next(vm => {
        vm.id = doc.id,
        vm.title = doc.data().title,
        vm.url = doc.data().url
      })
    })
    .catch(err => console.log(err))
  },
  methods: {
    fetchData () {
      this.isLoading = true
      db.collection('links').doc(this.$route.params.id)
      .get()
      .then((querySnapshot) => {
        this.isLoading = false
        var doc = querySnapshot
        this.id = doc.id,
        this.title = doc.data().title,
        this.url = doc.data().url
      })
      .catch((err) => {
        this.isLoading = false
      })
    },
    updateLink () {
      this.isLoading = true
      db.collection('links').doc(this.id)
      .get()
      .then(doc => {
        doc.ref.update({
          title: this.title,
          url: this.url
        })
        .then((docRef) => {
          this.isLoading = false
          this.$router.push('/dashboard')
        })
        .catch ((err) => {
          this.isLoading = false
        })
      })
      .catch((err) => {
        this.isLoading = false
        console.error(err)
      })
    }
  }
}
</script>

<style>
#edit-link {
  padding: 15px 10px;
}

</style>
