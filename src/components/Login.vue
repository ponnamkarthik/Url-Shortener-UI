<template>
    <div id="login">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <div class="container">
            <div class="row login_box">
                <div class="col-md-12 col-xs-12 image-padding" align="center">
                    <div class="outter"><img src="../assets/main.png" class="image-circle" /></div>
                </div>

                <div class="col-md-12 col-xs-12">
                    <div align="center">
                        <h5>Url Shortener</h5>
                    </div>
                </div>
                
                <div class="col-md-12 col-xs-12 login_control">
                    <div align="center">
                        <button @click="login" class="btn btn-orange"><i class="fa fa-google"></i> Sign In with Google</button>
                        <router-link to="/email" class="btn btn-orange"><i class="fa  fa-envelope"></i> Login with email</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: 'login',
        data() {
            return {}
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
            login() {
                let provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then((result) => {
                    Materialize.toast('Login Success', 2000, 'rounded')
                    this.goNext()
                }).catch((error) => {
                    Materialize.toast('Unable to Login', 2000, 'rounded')
                });
            }
        }
    }
</script>

<style scoped>
    body {
        background-color: #2B2B2B;
    }
    * {
        font-family: 'Raleway', sans-serif; 
        color: #FFF;
    }
    div h3 span {
        color: #FFF;
        font-size: 14px;
    }
    div span {
        font-weight: 200;
    }
    .login_box {
        background: #0288D1;
        background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMTAwJSIgeDI9IjEwMCUiIHkyPSIwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjUlIiBzdG9wLWNvbG9yPSIjZjMyZDI3IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iOTklIiBzdG9wLWNvbG9yPSIjZmY2YjQ1IiBzdG9wLW9wYWNpdHk9IjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==);
        background: -moz-linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
        background: -webkit-gradient(linear, left bottom, right top, color-stop(5%, #0288D1), color-stop(99%, #3949AB));
        background: -webkit-linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
        background: -o-linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
        background: -ms-linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
        background: linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0288D1', endColorstr='#3949AB', GradientType=1);
        width: 35%;
        position: absolute;
        top: 10%;
        left: 32.5%; 
        -webkit-box-shadow: 0px 0px 8px 0px rgba(50, 50, 50, 0.54);
        -moz-box-shadow: 0px 0px 8px 0px rgba(50, 50, 50, 0.54);
        box-shadow: 0px 0px 8px 0px rgba(50, 50, 50, 0.54);
    }
    @media (max-width: 767px) {
        .login_box {
            background: #0288D1;
            background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMTAwJSIgeDI9IjEwMCUiIHkyPSIwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjUlIiBzdG9wLWNvbG9yPSIjZjMyZDI3IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iOTklIiBzdG9wLWNvbG9yPSIjZmY2YjQ1IiBzdG9wLW9wYWNpdHk9IjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==);
            background: -moz-linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
            background: -webkit-gradient(linear, left bottom, right top, color-stop(5%, #0288D1), color-stop(99%, #3949AB));
            background: -webkit-linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
            background: -o-linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
            background: -ms-linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
            background: linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0288D1', endColorstr='#3949AB', GradientType=1);
            width: 96%;
            position: absolute;
            top: 10%;
            left: 5%;
            -webkit-box-shadow: 0px 0px 8px 0px rgba(50, 50, 50, 0.54);
            -moz-box-shadow: 0px 0px 8px 0px rgba(50, 50, 50, 0.54);
            box-shadow: 0px 0px 8px 0px rgba(50, 50, 50, 0.54);
        }
    }
    .image-circle {
        border-radius: 50%;
        width: 100px;
        height: 100px;
        border: 4px solid #FFF;
        margin: 10px;
    }
    .follow {
        background-color: #0288D1;
        height: 80px;
        cursor: pointer;
    }
    .follow:hover {
        background-color: rgb(111, 57, 204);
        height: 80px;
        cursor: pointer;
    }
    .login_control {
        background-color: #FFF;
        padding: 10px;
    }
    .control {
        color: #000;
        margin: 10px;
    }
    .label {
        color: #0288D1;
        font-size: 18px;
        font-weight: 500;
    }
    .form-control {
        color: #000000 !important;
        font-size: 25px;
        border: none;
        padding: 25px;
        padding-left: 10px;
        border-bottom: 1px solid #CCC;
        margin-bottom: 10px;
        outline: none;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        box-shadow: none !important;
    }
    .form-control:focus {
        border-radius: 0px;
        border-bottom: 1px solid #FC563B;
        margin-bottom: 10px;
        outline: none;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        box-shadow: none !important;
    }
    .btn-orange {
        height: auto;
        background: -moz-linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
        background: -webkit-gradient(linear, left bottom, right top, color-stop(5%, #0288D1), color-stop(99%, #3949AB));
        background: -webkit-linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
        background: -o-linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
        background: -ms-linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
        background: linear-gradient(45deg, #0288D1 5%, #3949AB 99%);
        border-radius: 0px;
        margin: 15px;
        padding: 15px;
        font-size: 20px;
        font-weight: inherit;
    }
    .line {
        border-bottom: 2px solid #0288D1;
    }
    .outter {
        padding: 0px;
        border: 1px solid rgba(255, 255, 255, 0.29);
        border-radius: 50%;
        width: 125px;
        height: 125px;
    }
    .image-padding {
        padding: 15px;
    }
</style>