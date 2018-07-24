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
            <input id="item_name" type="text" class="validate" v-model='name'>
          </div>
          <div class="row">
            <div class="col s6 m12">
              <div class="input-field col s6">
                <input id="price" type="text" class="validate" v-model='price'>
              </div>
              <div class="input-field col s6">
                <input id="stock" type="text" class="validate" v-model='stock'>
              </div>
            </div>
          </div>
          <div class="input-field col s12">
            <textarea id="detail" class="materialize-textarea" v-model='detail'></textarea>
          </div>
          <center class="col s12">
            <a class="btn" style="width:48%; margin: 1% 1% 1% 1%" @click='back'>Done</a>
            <a class="btn" style="width:48%; margin: 1% 1% 1% 1%" @click='UpdateItem'>Update</a>
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
      form : false
    }
  },
  created () {
    this.name = this.$store.state.editItemData.name
    this.price = this.$store.state.editItemData.price
    this.detail = this.$store.state.editItemData.detail
    this.stock = this.$store.state.editItemData.stock
  },
  methods: {
    back () {
      this.$router.push('/admin')
    },
    UpdateItem () {
      let item = this.$store.state.editItemData
      item.name = this.name
      item.price = this.price
      item.detail = this.detail
      item.stock = this.stock
      axios({
        method: 'post',
        url: 'http://35.240.155.158/items/edit',
        data: item
      }).then(response => {
        this.$router.push('admin')
        swal({
          title: "Yosh!",
          text: "Successfully Update item",
          icon: "success",
        });
      }).catch(err => {
        console.log(err);
      })
    },
    addNewItem () {

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
