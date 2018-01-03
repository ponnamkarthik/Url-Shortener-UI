<template>
  <nav>
    <div class="nav-wrapper nav-bg">
      <div class="navbar-header pull-left">     
          <router-link to="/" class="brand-logo">Link Holder</router-link>
        </div>
      <ul class="nav navbar-nav pull-right">
	      <li>
	       <button @click="logout" class="right btn blue logout-btn">Logout</button>
	      </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
    }
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

<style>
.nav-bg {
  background: #f32d27;
}
.logout-btn {
  margin: 8px !important;
}
</style>
