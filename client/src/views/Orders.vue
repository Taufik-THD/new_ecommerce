<template>
  <div class="">
    <Sidenav/>
    <Orders/>
  </div>
</template>

<script>
import Sidenav from '@/components/Sidenav.vue'
import Orders from '@/components/Orders.vue'

export default {
  name: 'admin',
  components: {
    Sidenav,
    Orders
  }
}
</script>

<style lang="css">
</style>
