<template>
  <div class="container">
    <div class="preloader-wrapper big active" v-if='form == true' style="margin-top:25%;">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
    <h6 v-if='form == true'>Save new item . . .</h6>
    <div class="row"  style="margin: 10% 1% 1% 5%;" v-if='form == false'>
      <form class="col s12">
        <div class="row">
          <br>
          <div class="input-field col s12">
            <input id="item_name" type="text" class="validate" v-model='name' v-on:change='nameHandler()'>
            <label for="item_name">Item Name</label>
          </div>
          <div class="row">
            <div class="col s6 m12">
              <div class="input-field col s6">
                <input id="price" type="text" class="validate" v-model='price' v-on:change='nameHandler()'>
                <label for="price">Price</label>
              </div>
              <div class="input-field col s6">
                <input id="stock" type="text" class="validate" v-model='stock' v-on:change='nameHandler()'>
                <label for="stock">Stock</label>
              </div>
            </div>
          </div>
          <div class="input-field col s12">
            <textarea id="detail" class="materialize-textarea" v-model='detail' v-on:change='nameHandler()'></textarea>
            <label for="detail">Detail Item</label>
          </div>
          <div class="file-field input-field col s12">
            <div class="btn">
              <span>Open</span>
              <input type="file" @change="filename">
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" placeholder="click for upload image" v-model='file.name'>
            </div>
          </div>
          <center class="col s12">
            <a class="btn" style="width:48%; margin: 1% 1% 1% 1%" @click='back'>Done</a>
            <a class="btn" style="width:48%; margin: 1% 1% 1% 1%" @click='addNewItem' :disabled="button == false">Post</a>
          </center>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      name: '',
      price: '',
      detail: '',
      stock: '',
      file: '',
      form : false,
      button: false
    }
  },
  methods: {
    nameHandler () {
      if (this.name == '') {
        this.button = false
      } else if (this.price == '') {
        this.button = false
      } else if (this.detail == '') {
        this.button = false
      } else if (this.stock == '') {
        this.button = false
      } else {
        this.button = true
      }
    },
    back () {
      this.$router.push('/admin')
    },
    post () {
      itemData = {
        name: this.name,
        price: this.price
      }
      axios({
        method: 'post',
        url: 'http://35.240.155.158/upload',
        data: itemData
      })
    },
    addNewItem () {
      this.form = true
      let formData = new FormData()
      formData.append('image', this.file)
      formData.append('name', this.name)
      formData.append('price', this.price)
      formData.append('detail', this.detail)
      formData.append('stock', this.stock)
      axios({
        method: 'post',
        url: 'http://35.240.155.158/items',
        data: formData
      }).then(response => {
        this.form = false
        window.location.reload()
        swal({
          title: "Yosh!",
          text: "Successfully add new item",
          icon: "success",
        });
      }).catch(err => {
        console.log(err);
      })
    },
    filename (event) {
      console.log('asdasd');
      this.file = event.target.files[0]
    }
  }
}
</script>

<style scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  position: fixed;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
