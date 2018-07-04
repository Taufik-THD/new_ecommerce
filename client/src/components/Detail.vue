<template lang="html">
  <div class="">
    <div class="" style="background-color:white; width:100%; padding-top:5%;">
      <div class="">
        <div class="row" style="padding-left:0%;" >
          <div class="col m3">
            <img :src="item.picture" alt="" style="width:400px; padding: 20px 0 0 40%;">
          </div>
          <div class="col m9">
            <div class="container">
              <br>
              <h3 style="text-align:left;"> <b>{{ item.name }}</b> </h3>
              <hr>
              <h4 style=" width:100%; text-align:justify; color:#d84315;"> Rp. {{ item.price.toLocaleString() }},-</h4>
              <br><br>
              <button type="button" class="btn blocked large" name="button" style="width:100%;">Add to cart</button>
            </div>
          </div>
          <br>
          <br>
          <br>
          <div class="container" style="width:80%;">
            <div class="col m12 grey lighten-2" style=" margin:5% 0 5% 0;">
              <h5 style="text-align:left"><u> <b>Detail Barang</b> </u></h5>
              <br>
              <div class="" v-for='detail in detailItem' style="text-align:left; margin:0 0 0 2%;">
                {{ detail }}
              </div>
              <br>
            </div>
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
    this.getDetail()
  },
  data () {
    return {
      detailItem: [],
      item: null
    }
  },
  methods : {
    getDetail () {
      axios({
        method: 'get',
        url: `http://35.240.238.226/items/detail/${this.$route.params.id}`
      }).then(response => {
        this.item = response.data[0]
        this.detailItem = response.data[0].detail.split('\r\n')
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>
