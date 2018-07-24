<template>
  <div class="">
    <Sidenav/>
    <TransactionDetail/>
  </div>
</template>

<script>
import Sidenav from '@/components/Sidenav.vue'
import TransactionDetail from '@/components/TransactionDetail.vue'

export default {
  name: 'admin',
  components: {
    Sidenav,
    TransactionDetail
  }
}
</script>

<style scoped>
</style>
