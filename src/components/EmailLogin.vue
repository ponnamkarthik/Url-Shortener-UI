<template>
    <div id="emaillogin">
        <div class="section"></div>
  <main>
    <center>
      <div class="section"></div>
      <div class="row">
        <!-- Colored FAB button -->
        <span>

        <h2 class="deep-purple-text">
            <router-link to="/">
                <a class="btn-floating btn-large waves-effect waves-light deep-purple" style="right: 5%">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </a>
            </router-link>Login
        </h2>
        </span>
        
      </div>
      <div class="section"></div>

      <div class="container">
        <div class="z-depth-1 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE; width: 100%;">

          <form class="col s12" @submit.prevent="loginUser">
           
            <div class='row'>
              <div class='input-field col s12'>
                <input class='validate' type='email' name='email' id='email' v-model="email" required/>
                <label for='email'>Email</label>
              </div>
            </div>

            <div class='row'>
              <div class='input-field col s12'>
                <input class='validate' type='password' name='password' id='password' v-model="password" required/>
                <label for='password'>Password</label>
              </div>
              <label style='float: right;'>
                    <router-link class='pink-text' to="/reset">Forgot Password?</router-link>
				</label>
            </div>

            <br />
            <center>
              <div class='row'>
                <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect deep-purple'>Login</button>
                <img v-bind:style="[ isLoading ? {'display': ''} : {'display': 'none' } ]" style="margin: 10px" src="../../static/loader.gif" />
              </div>
            </center>
          </form>
        </div>
      </div>
      <router-link class='pink-text' to="/create">Create account</router-link>
    </center>
    <div class="section"></div>
    <div class="section"></div>
  </main>
    </div>	
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: 'emaillogin',
        data() {
            return {
                email: null,
                password: null,
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
                this.$router.push('/dashboard')
            },
            loginUser() {
                this.isLoading = true
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then((result) => {
                    isLoading = false
                })
                .catch((error) => {
                    this.isLoading = false
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        Materialize.toast('Wrong password.', 2000, 'rounded')
                    } else {
                        Materialize.toast('Unknown Error', 2000, 'rounded')
                    }
                });
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
      color: #E91E63;
    }

    .input-field input[type=date]:focus,
    .input-field input[type=text]:focus,
    .input-field input[type=email]:focus,
    .input-field input[type=password]:focus {
      border-bottom: 2px solid #E91E63;
      box-shadow: none;
    }
</style>