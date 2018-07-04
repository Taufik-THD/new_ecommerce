<template>
  <div class="nav">
    <div class="input-field">
      <nav>
        <div class="item" style="; margin: 65% 0 0 0;">
          <ul id="nav-mobile" class="hide-on-med-and-down">
            <li><button class="btn waves-effect waves-light" style="height:5%; background-color:#181818;" title="Items" @click='goToItems'><i class="material-icons">filter_list</i></button></li>
            <li><button class="btn waves-effect waves-light" style="height:5%; background-color:#181818;" title="Orders" @click='goToOrders'><i class="material-icons">mail</i>{{ getTransaction.length }}</button></li>
            <li style="padding-top:604%;" @click='logout'><button class="btn red" style="height:5%" title="Logout"><i class="material-icons">lock_outline</i></button></li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      totalTransaction: 0
    }
  },
  created () {
    this.$store.dispatch('getTransaction')
  },
  computed : {
    getTransaction () {
      return this.$store.state.transaction
    }
  },
  methods: {
    logout () {
      swal("Are you sure want to logout?", {
        dangerMode: true,
        buttons: true,
      })
      .then((accept) => {
        if (accept) {
          localStorage.clear()
          this.$router.push('/')
        }
      })
    },
    goToItems () {
      this.$router.push('admin')
    },
    goToOrders () {
      this.$router.push('orders')
    },
    getTotal () {
      this.totalTransaction = this.$store.state.transaction.length
    }
  }
}
</script>

<style lang="css">
.nav {
    height: 100%;
    width: 4.4%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 20px;
}

nav {
    color: #fff;
    background-color: #111;
    width: 100%;
    height: 56px;
}

.sidenav a {
    padding: 6px 6px 6px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
}

.sidenav a:hover {
    color: #f1f1f1;
}

.main {
    margin-left: 200px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
