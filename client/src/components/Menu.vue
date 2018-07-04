<template lang="html">
  <div class="container" style="background-color:#ecf0f1; width:95%;">
    <div class="row">
      <div class="col s3 m3" v-for='item in getAllitems'>
        <div class="card">
          <div class="card-image">
            <img :src="item.picture" style="width:100%; height:250px;">
          </div>
          <div class="card-content" style="height:50px; padding-bottom:20%;">
            <a><span class="card-title" style="font-size:16px;"> <b  style="cursor:pointer;" @click='getDetailItem(item)'>{{ item.name }}</b> </span></a>
          </div>
          <div class="card-action">
            <h6 style="color:red;"> <b> Rp. {{ item.price.toLocaleString() }}</b></h6>
          </div>
          <div class="card-action" style="padding-left:8%;">
            <a class="btn red" style="width:100%;" v-if='isLogins == true && item.stock != 0' @click='addToCart(item)'>add to cart</a>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEdt34Dwuhb4i0TpxYd21MHzTtqtQ24pOki1-sgoPHf-_M8fhpDg" alt="" style="width:49%;" v-if='isLogins == true && item.stock == 0'>
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
    this.checkLogin()
    this.getItem()
  },
  data () {
    return {
      items: null,
      isLogin: true,
      notification: true
    }
  },
  computed : {
    isLogins () {
      return this.$store.state.isLogin
    },
    getAllitems () {
      return this.$store.state.allItem
    }
  },
  methods: {
    checkLogin () {
      if (!localStorage.hasOwnProperty('authorization')) {
        this.$store.state.isLogin = false
      } else {
        this.$store.state.isLogin = true
      }
    },
    getItem () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/items'
      }).then(data => {
        const items = data.data.data
        this.$store.dispatch('getItems', items)
      }).catch(err => {
        console.log(err);
      })
    },
    addToCart (item) {
      const token = localStorage.getItem('authorization')

      if (!localStorage.hasOwnProperty('authorization')) {
        return false
      } else {
        this.$store.dispatch('addCart', item)
      }
    },
    getDetailItem (item){
      this.$store.dispatch('getDetail', item)
      this.$router.push(`/detail/${item._id}`)
    }
  }
}
</script>

<style lang="css">
</style>
