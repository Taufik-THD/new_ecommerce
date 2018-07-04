<template lang="html">
  <div class="" style="margin-left:4.5%; text-align:left;">
    <img src="https://cdn1.vectorstock.com/i/thumb-large/99/15/sad-face-dollar-character-cartoon-style-vector-15809915.jpg" alt="" style="position:fixed; margin: 9% 0 0 40%">
    <h3 style="margin: 28% 0 0 25%; position:fixed; color:#bdbdbd;"> <b>You haven't any transaction :(</b> </h3>
    <div class="row" v-for='data in getTransaction'>
      <div class="col s12 m12">
        <div class="card  grey darken-4">
          <div class="card-content white-text">
            <a class="btn" style="margin-left:90%;" v-if='data.status == true' disabled >Completed</a>
            <h6 style="color:#b2ebf2;"> <b>Receiver name:</b> </h6>
            <span class="card-title">{{ data.receiver.receiver }}</span>
            <hr>
            <h6 style="color:#b2ebf2;"> <b>Send to:</b> </h6>
            <span class="card-title">{{ data.receiver.address }}</span>
          </div>
          <div class="card-action" style="text-align:right;">
            <a class="btn" style="margin-right:2%;" @click='getDetail(data)'>open detail</a>
            <a class="btn waves-effect red" @click='doneTransaction(data._id)'>done!</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    if (!localStorage.getItem('authorization')) {
      this.$router.push('/')
      window.location.reload()
    }
    this.$store.dispatch('getTransaction')
  },
  computed : {
    getTransaction () {
      return this.$store.state.transaction
    }
  },
  mounted () {

  },
  methods : {
    openModal () {
      $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
      });
    },
    getDetail (data) {
      this.$router.push('transaction')
      this.$store.dispatch('getDetailTransaction', data)
    },
    doneTransaction (id) {
      axios({
        method: 'post',
        url: 'http://35.240.238.226/done',
        data: {
          id: id
        }
      }).then(response => {
        this.$store.dispatch('getTransaction')
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>
