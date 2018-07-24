<template>
  <div class="">
    <Sidenav/>
    <Admin/>
  </div>
</template>

<script>
import Sidenav from '@/components/Sidenav.vue'
import Admin from '@/components/Admin.vue'

export default {
  name: 'admin',
  components: {
    Sidenav,
    Admin
  }
}
</script>

<style lang="css">
</style>
