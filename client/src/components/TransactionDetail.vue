<template lang="html">
  <div class="">
    <div class="row" style="background-color:#111; position:fixed; width:100%;">
      <div class="col m4" style="text-align:right;">
        <h6 style="margin:5% 0 0 10%; color:white; padding-right:15%;"> <b>User ID:</b> {{ detailTransaction.userDetail[0].id }}</h6>
        <br>
      </div>
      <div class="col m4">
        <h6 style="margin:5% 0 0 10%; color:white;"> <b>User Email:</b> {{ detailTransaction.userDetail[0].email }}</h6>
        <br>
      </div>
      <div class="col m4" style="text-align:right;">
        <h6 style="margin:5% 0 0 0; color:white; padding-right:10%;" v-if='detailTransaction.status == true'> <b>Status:</b> Completed</h6>
        <h6 style="margin:5% 0 0 0; color:white; padding-right:10%;" v-if='detailTransaction.status == false'> <b>Status:</b> Uncompleted</h6>
        <br>
      </div>
    </div>
    <div class="row" style="margin-top:0%;">
      <div class="col s6" style="background-color:#181818; position: fixed; margin: 4.7% 0 0 0; padding-bottom: 50%;">
        <h4 style="margin-left:-35%; color:white;"> <b>Receiver Info:</b> </h4>
        <hr>
        <div class="" style="text-align:left; margin: 7% 0 0 15%; color:white;">
          <h6 style=""><b>Name: </b></h6>
          <h6>{{ detailTransaction.receiver.receiver }}</h6>
          <h6 style=""><b>Email: </b></h6>
          <h6>{{ detailTransaction.receiver.email }}</h6>
          <h6 style=""><b>Phone: </b></h6>
          <h6>{{ detailTransaction.receiver.phone }}</h6>
          <h6 style=""><b>Total: </b></h6>
          <h6>Rp. {{ detailTransaction.totalPayment.toLocaleString() }},-</h6>
          <h6 style=""><b>Address: </b></h6>
          <h6>{{ detailTransaction.receiver.address }}</h6>
        </div>
      </div>
      <div class="col s6" style="background-color:white;">
      </div>
      <div class="col s6" style="background-color:white; margin: 4.7% 0 0 0;">
        <h4 style="margin-left:-75%;"> <b>Items:</b> </h4>
        <hr>
        <div class="container" style="width: 90%">
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='item in detailTransaction.items'>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.qty }}</td>
              </tr>
            </tbody>
            <ul>
              <li></li>
            </ul>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    if (!localStorage.getItem('authorization')) {
      this.$router.push('/')
      window.location.reload()
    }
  },
  computed: {
    detailTransaction () {
      return this.$store.state.detailTransaction
    }
  }
}
</script>

<style scoped>
</style>
