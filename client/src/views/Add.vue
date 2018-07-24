<template>
  <div class="">
    <Sidenav/>
    <Addform/>
  </div>
</template>

<script>
import Sidenav from '@/components/Sidenav.vue'
import Addform from '@/components/Addform.vue'

export default {
  name: 'add',
  components: {
    Sidenav,
    Addform
  }
}
</script>

<style lang="css">
</style>
