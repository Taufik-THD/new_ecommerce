<template>
  <div class="register" style="background-color:transparent;">
    <div class="container" style="padding-left:5%;">
      <div class="row">
        <div class="col s10" style="margin:4.4%; background-color:rgba(0, 0, 0, 0.5);">
          <form class="col s12">
            <h4 style="text-align:center; color:white" ><b>Sign Up</b> </h4>
            <div class="row">
              <div class="input-field col s12" style="padding-right:15px;">
                <input id="fullname" type="text" class="validate" style="color:white;" v-model='userData.fullname'>
                <label for="fullname" style="color:white;">Full Name</label>
              </div>
              <div class="input-field col s12" style="padding-right:15px;">
                <input id="email" type="text" class="validate" style="color:white;" v-model='userData.email'>
                <label for="email" style="color:white;" >Email</label>
              </div>
              <div class="input-field col s12" style="padding-right:15px;">
                <input id="password" type="password" class="validate" style="color:white;" v-model='userData.password' v-on:keyup='checkLength'>
                <label for="password" style="color:white;" >Password</label>
              </div>
              <div class="col">
                <label v-if="validation == false" style="color:white;">Password minimum 6 character . . .</label>
              </div>
              <div class="input-field col s12" style="padding-right:15px;">
                <input id="confirmpassword" type="password" class="validate" style="color:white;" v-model='userData.confirmpassword' v-on:keyup='checkSame'>
                <label for="confirmpassword" style="color:white;" >Confirm Password</label>
              </div>
              <div class="col">
                <label v-if="check == false" style="color:white;">Password didn't match !</label>
              </div>
            </div>
            <a class="btn btn-block" @click='register'>Sign Up</a>
            <br>
            <p style="color:white">Already have an account? <a @click='backToHomepage' style="cursor: pointer;"> <b><u>Sign In here</u></b> </a> </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register',
  data () {
    return {
      userData : {
        fullname: '',
        email : '',
        password : '',
        confirmpassword: ''
      },
      check: true,
      validation: true
    }
  },
  created () {
    this.confirmCheck()

    if (localStorage.hasOwnProperty('authorization')) {
      this.$router.push('/')
    }
  },
  methods: {
    backToHomepage () {
      this.$router.push('/')
    },
    register () {
      if (this.validation == true && this.check == true && this.userData.password.length != 0) {

        const self = this
        axios({
          method: 'post',
          url: 'http://localhost:3000/signup',
          data: self.userData
        }).then(response => {
            this.userData.fullname = '',
            this.userData.email = '',
            this.userData.password = '',
            this.userData.confirmpassword = ''
            this.$router.push('/')
            swal({
              title: "Yosh!",
              text: "Successfully register your account",
              icon: "success",
            });
        }).catch(err => {
          console.log(err);
        })
      } else {
        swal({
          text: "Please input a valid data . . .",
          icon: "error"
        })
      }
    },
    checkSame () {
      if (this.userData.password == this.userData.confirmpassword || this.userData.confirmpassword.length == 0) {
        this.check = true
      } else {
        this.check = false
      }
    },
    checkLength () {
      if (this.userData.password.length >= 6 || this.userData.password.length == 0) {
        this.validation = true
      } else {
        this.validation = false
      }
    }
  }
}
</script>

<style scoped>
.register{
  background-color: #ecf0f1;
  background-size: cover;
  padding-top: 10px;
  height: 100%;
}
.navmedia{
  padding: 0 5 0 0;
  background-color: transparent;
  border: none;
  margin-bottom: 13%;
}
.socmed{
  height:50px;
  width: 94px;
  text-align: center;
  font-size: 50px;
  margin:9% 0 50% 20%;
}
li{
  margin-right:10px;
}
.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 12px;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}
</style>
