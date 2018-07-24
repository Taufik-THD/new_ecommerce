<template>
  <div class="nav-wrapper">
    <nav  style="position:fixed">
      <a href="#" class="brand-logo" style="padding-left:2%;" @click='home'><i class="fas fa-coffee" style="padding-top:7%;"></i><b>Coffee Break .</b></a>
        <div class="" >
          <div class="col s6" style="padding-right:2%;; margin: 0 0 0 0;">
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li @click='resetFrom' v-if='isLogin == false'><a @click='loginActive()'>Sign In</a></li>
              <li @click='resetFrom' v-if='isLogin == false'><a @click='goToRegister()'>Sign Up</a></li>
              <li style="padding-right:10px;" v-if='isLogin == true'>
                <label for="" v-model='totalCart'>{{ totalItem }}</label>
                <a class="waves-effect waves" title="Keranjang" @click='goToCart'><i class="material-icons">shopping_cart</i></a>
              </li>
              <li @click='resetFrom' v-if='isLogin == true'><a title="Logout" @click='logout'>Logout</a></li>
            </ul>
          </div>
        </div>
        <div class="" style="padding:0 0 0 0; margin:4.5% 0 0 69.5%; width:30%;" v-if='loginForm == true'>
          <div class="col s12 m6">
            <div class="card white">
              <div class="card-content white-text">
                <div class="">
                  <h4 style="color:black; text-align:center;"> <b>Sign In</b> </h4>
                  <hr>
                  <div class="input-field col s12" style="padding-right:15px;">
                    <input id="email" type="email" name="email" v-model='userData.email'>
                    <label for="email">Email</label>
                    <span class="helper-text"></span>
                  </div>
                  <div class="input-field col s12">
                    <input id="password" type="password" name="password" v-model='userData.password'>
                    <label for="password">Password</label>
                    <span class="helper-text"></span>
                  </div>
                  <div class="input-field col s12">
                    <a class="btn btn-block" style="width:100%; color:white" @click='login'>Sign In</a>
                    <p style="color:black; text-align:center;">or Sign In with :</p>
                    <a class="btn btn-block" style="background-color:#3867d6; font-size:15px;" @click="loginfb">Sign In with facebook</a>
                    <p style="color:black; text-align:center;">New User ?<a href="#" class="socmed" style="color:blue" @click='goToRegister'> <b> Start here.</b> </a> </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    if (localStorage.hasOwnProperty('authorization')) {
      // this.isLogin = false
    } else {
      // this.isLogin = true
    }
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '223165648453545',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      })
    }
  },
  data () {
    return {
      loginForm: false,
      registerForm: false,
      userData : {
        email: '',
        password: ''
      },
      totalCart : 0
    }
  },
  computed : {
    totalItem () {
      return this.$store.state.cart.length
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    loginActive () {
      if (this.loginForm == true) {
        this.loginForm = false
      } else {
        this.loginForm = true
      }
    },
    nonActiveLogin () {
      this.loginForm = false
    },
    registerActive () {
      this.loginForm = false
      this.registerForm = true
    },
    checkLogin () {
      if (!localStorage.hasOwnProperty('authorization')) {
        // this.isLogin = false
      } else {
        // this.isLogin = true
      }
    },
    register () {
      this.$router.push('/register')
    },
    login () {
      const self = this
      const userData = {
        email: this.userData.email,
        password: this.userData.password
      }
      axios({
        method: 'post',
        url: 'http://localhost:3000/signIn',
        data: userData
      }).then(response => {
        if (response.data.admin) {
          self.$router.push('admin')
          localStorage.setItem('authorization', response.data.jwtToken)
        } else {
          this.loginForm = false
          localStorage.setItem('authorization', response.data.jwtToken)
          this.$router.push('/')
          this.$store.dispatch('loginChange')
        }
        // this.isLogin = false
      }).catch(err => {
        console.log(err);
      })
    },
    resetFrom () {
      this.userData.email = ''
      this.userData.password = ''
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    loginfb () {
      let self = this
      self.loginForm = false
      window.FB.login((response) => {
        if (response.status === 'connected') {
          FB.api(`/me`, {
              fields: ['email', 'picture', 'name']
          }, function (profile) {
            axios({
              method: 'post',
              url: 'http://localhost:3000/signIn',
              headers: profile
            }).then((response) => {
              if (response.data.admin) {
                self.$router.push('admin')
                localStorage.setItem('authorization', response.data.jwtToken)
              } else {
                localStorage.setItem('authorization', response.data.jwtToken)
                self.$router.push('/')
              }
            }).catch((err) => {
              console.log(err)
            })
          })
        }
      })
    },
    statusChangeCallback(response) {
      let self = this
      FB.api(`/me`, {
          fields: ['email', 'picture', 'name']
      }, function (profile) {
        console.log(profile);
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:3000/signIn',
        //   headers: profile
        // }).then((response) => {
        //   console.log('Welcome!  Fetching your information.... ')
        //   return response
        // }).catch((err) => {
        //   console.log(err)
        // })
      })
    },
    goToRegister () {
      this.$router.push('register')
    },
    logout () {
      swal("Are you sure want to logout?", {
        dangerMode: true,
        buttons: true,
      })
      .then((accept) => {
        if (accept) {
          this.$store.dispatch('loginChange')
          localStorage.clear()
        }
      })
    },
    goToCart () {
      this.$router.push('/cart')
    },
    home () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
nav {
  color: #fff;
  background-color: black;
  width: 100%;
  position: inherit;
  text-align: left;
  position: absolute;
  z-index: 999;
  width: 100%;
}

.container {
  margin: 0 0 0 0;
  width: 100%;
  height: 100%;
}

.tabs .indicator {
  background-color: #1e2121;
}

.confirmation-tabs-btn {
  position: absolute;
}
</style>
