<template>
  <div class="item">
    <div class="">
      <div class="preloader-wrapper big active" v-if='form == false' style="margin:20% 0 0 -3%; position:fixed;">
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
      <h5 v-if='form == false' style="margin:28% 0 0 41%; position:fixed;"> Loading data</h5>
      <br>
      <button type="button" class="btn grey darken-4 blocked" style="width:100%;" name="button" @click='add'>Add Item</button>
      <br>
      <br>
    </div>
    <table style="margin-bottom:2%;">
      <thead class="container grey">
        <tr>
          <th class="center" style="width:50%;">Name</th>
          <th class="center">Price</th>
          <th class="center">Stock</th>
          <th class="center">Action</th>
        </tr>
      </thead>
      <tbody class="striped grey lighten-2" v-for='item in items'>
        <tr>
          <td style="padding-left:2%"> <b>{{ item.name }}</b> </td>
          <td class="center">Rp. {{ item.price.toLocaleString() }},-</td>
          <td class="center">{{ item.stock }}</td>
          <td class="center"><button class="btn" title="Edit" @click='editItem(item)'><i class="material-icons">edit</i></button> -|||- <button class="btn red centered" title="Delete" @click='deleteItem(item._id)'><i class="material-icons">delete</i></button></td>
        </tr>
      </tbody>
    </table>
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
    this.getItem()
  },
  data () {
    return {
      items: null,
      form: false
    }
  },
  methods: {
    add () {
      this.$router.push('add')
    },
    getItem () {
      axios({
        method: 'get',
        url: 'http://35.240.155.158/items'
      }).then(data => {
        this.items = data.data.data
        this.form = true
      }).catch(err => {
        console.log(err);
      })
    },
    deleteItem (id) {
      swal("Are you sure want delete this item?", {
        dangerMode: true,
        buttons: true,
      })
      .then((accept) => {
        if (accept) {
          axios({
            method: 'delete',
            url: `http://35.240.155.158/items/${id}`
          }).then(response => {
            this.getItem()
          }).catch(err => {
            console.log(err);
          })
        }
      })
    },
    editItem (item) {
      this.$store.dispatch('editItem', item)
      this.$router.push('edit')
    }
  }
}
</script>

<style scoped>
.item {
  padding: 0 1% 0 5%;
}
</style>
