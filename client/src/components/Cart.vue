<template lang="html">
  <div class="white">
    <div class="container" style="margin:2.5% 0 0 2%; width:96%; position:fixed;">
      <div class="col s12 m12">
        <div class="card white">
          <div class="card-content white-text" v-if='transactionModal == true'>
            <form class="col s12">
              <div class="row">
                <h4 style="color:black;">User detail</h4>
                <div class="input-field col s12">
                  <input id="username" type="text" class="validate" v-model='transactionData.receiver'>
                  <label for="username">Receiver</label>
                </div>
                <div class="row">
                  <div class="col s6 m12">
                    <div class="input-field col s6">
                      <input id="email" type="text" class="validate" v-model='transactionData.email'>
                      <label for="email">Email</label>
                    </div>
                    <div class="input-field col s6">
                      <input id="phone" type="text" class="validate" v-model='transactionData.phone'>
                      <label for="phone">Phone Number</label>
                    </div>
                  </div>
                </div>
                <div class="input-field col s12">
                  <textarea id="address" class="materialize-textarea" v-model='transactionData.address'></textarea>
                  <label for="address">Address</label>
                </div>
                <h1 style="color:black; text-align:right;"></h1>
                <center class="col s12">
                  <a class="btn" style="width:48%; margin: 1% 1% 1% 1%" @click='back'>Cancel</a>
                  <a class="btn" style="width:48%; margin: 1% 1% 1% 1%" @click='dealTransaction'>Process Transaction</a>
                </center>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if='allCart.length == 0'>
      <img src="https://cdn.dribbble.com/users/844846/screenshots/2981974/empty_cart_800x600_dribbble.png" style="padding-top:4.1%; width:48.9%;">
    </div>
    <div class="container white">
    <div class="cart white" style="background-color:#ecf0f1; width:100%; padding:10% 0 10% 0;" v-if='transactionModal == false && allCart.length != 0'>
      <div class="row">
        <h4 style="color:black; padding-left:2%; text-align:center;"><b>Your Shopping Cart</b></h4>
        <br>
        <hr>
        <br>
          <div class="row" style="padding-left:3%;" v-for='item in allCart' >
            <div class="col m3">
              <img :src="item.picture" alt="" style="width:100%; height:40%">
            </div>
            <br>
            <div class="col m5">
              <h5>{{ item.name }}</h5>
              <h5 style="color:red;">Rp. {{ item.price.toLocaleString() }},-</h5>
              <br>
              <br>
              <br>
            </div>
            <div class="col m3">
              <h5 style="margin-left:21%;" name="button">Rp. {{ (item.qty * item.price).toLocaleString() }},-</h5>
              <br>
              <div class="col m12" style="margin-left:10%;">
                <button type="button" class="waves-effect btn red" name="button" @click='minQty(item)' style="margin-right:0px; width:30%;"><b> - </b></button>
                <button type="button" class="btn white" name="button" disabled style="width:30%;">{{ item.qty }}</button>
                <!-- <input type="text" name="" value=""> -->
                <button type="button" class="waves-effect btn red" name="button" @click='addQty(item)' style="margin-left:0px; width:30%;"> + </button>
              </div>
              <div class="col" style="margin:0 0 15% 10%;">
              </div>
              <a class="btn blocked red" style="margin-left:7%; width:100%;" @click='removeItem(item)'>Remove Item</a>
            </div>
          </div>
        </div>
        <hr>
        <div class="" style="text-align:left;">
          <p> Total Price :</p>
          <h5 style="text-align:right; padding-right:5%;">  Rp. {{ totalPrice.toLocaleString() }},-</h5>
          <br>
        </div>
        <hr>
        <br>
        <div class="container">
          <button type="button" class="btn blocked large" name="button" style="width:100%;" @click='transactionForm'>Checkout</button>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    if (!localStorage.hasOwnProperty('authorization')) {
      this.$store.state.isLogin = false
    } else {
      this.$store.state.isLogin = true
    }
    this.getCart()
  },
  data () {
    return {
      cart: [],
      transactionModal: false,
      transactionData: {
        receiver: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  },
  computed : {
    totalPrice () {
      let total = 0
      this.$store.state.cart.forEach(value => {
        total += value.qty * value.price
      })
      return total
    },
    allCart () {
      this.cart = this.$store.state.cart
      return this.$store.state.cart
    }
  },
  methods: {
    getCart () {
      return this.$store.state.cart
    },
    getTotal () {
      this.totalPrice = totalAll
    },
    cleanCart () {
      return this.$store.dispatch('removeCart')
    },
    removeQty (id) {
      axios({
        method: 'post',
        url: `http://35.240.238.226/items/removeQty/${id}`
      })
      .then(()=>{
        this.getCart()
      })
    },
    addQty (item) {
      this.$store.dispatch('addQty', item)
    },
    minQty (item) {
      this.$store.dispatch('minQty', item)
    },
    removeItem (item) {
      this.$store.dispatch('removeAllCart', item)
    },
    transactionForm () {
      this.transactionModal = true
    },
    back () {
      this.transactionData.receiver = ''
      this.transactionData.email = ''
      this.transactionData.phone = ''
      this.transactionData.address = ''
      this.transactionModal = false
    },
    dealTransaction () {
      const token = localStorage.getItem('authorization')
      const dataTransaction = this.transactionData
      axios({
        method: 'post',
        url: 'http://35.240.238.226/transaction',
        data: {
          cart: this.$store.state.cart,
          dataTransaction,
          token,
          totalPayment: this.totalPrice
        }
      }).then(response => {
        this.transactionData.receiver = ''
        this.transactionData.email = ''
        this.transactionData.phone = ''
        this.transactionData.address = ''
        this.transactionModal = false
        this.cleanCart()
        swal({
          title: "Thanks!",
          text: `Transaction success !`,
          icon: "success",
        });
        this.$router.push('/')
      }).catch(err => {
        console.log(err);
      })
    }
  },
  mounted () {
    // this.total()
  }
}
</script>

<style scoped>
  .cart {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
  }
</style>
