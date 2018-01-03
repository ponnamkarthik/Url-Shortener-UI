<template>
    <div id="emailforgot">
        <div class="section"></div>
  <main>
    <center>
      <div class="section"></div>
      <h5 class="deep-purple-text">Forgot Password</h5>
      <div class="section"></div>

      <div class="container">
        <div class="z-depth-1 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE; width: 100%;">

          <form class="col s12" @submit.prevent="resetPassword">
           
            <div class='row'>
              <div class='input-field col s12'>
                <input class='validate' type='email' name='email' id='email' v-model="email" required/>
                <label for='email'>Email</label>
              </div>
            </div>

            <br />
            <center>
              <div class='row'>
                <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect deep-purple'>Reset Password</button>
                <img v-bind:style="[ isLoading ? {'display': ''} : {'display': 'none' } ]" style="margin: 10px" src="../../static/loader.gif" />
              </div>
            </center>
          </form>
        </div>
      </div>
      <router-link to="/email">&lt; Back</router-link>
    </center>
    <div class="section"></div>
    <div class="section"></div>
  </main>
    </div>	
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: 'emailforgot',
        data() {
            return {
                email: null,
                isLoading: false
            }
        },
        beforeRouteEnter: (to, from, next) => {
            firebase.auth().onAuthStateChanged((user) =>{
                if (user) {
                    next('/dashboard')
                } else {
                    next()
                }
            })
        },
        methods: {
            goNext() {
                this.$router.push('/')
            },
            resetPassword() {
                this.isLoading = true
                firebase.auth().sendPasswordResetEmail(this.email)
                .then((data) => {
                    this.isLoading = false
                    Materialize.toast('Reset email sent.', 2000, 'rounded')
                    this.goNext()
                })
                .catch((err) => {
                    this.isLoading = false
                    Materialize.toast('Unknown Error', 2000, 'rounded')
                })
            }
        }
    }
</script>

<style scoped>
body {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
    }

    main {
      flex: 1 0 auto;
    }

    body {
      background: #fff;
    }

    .input-field input[type=date]:focus + label,
    .input-field input[type=text]:focus + label,
    .input-field input[type=email]:focus + label,
    .input-field input[type=password]:focus + label {
      color: #e91e63;
    }

    .input-field input[type=date]:focus,
    .input-field input[type=text]:focus,
    .input-field input[type=email]:focus,
    .input-field input[type=password]:focus {
      border-bottom: 2px solid #e91e63;
      box-shadow: none;
    }
</style>