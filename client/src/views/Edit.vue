<template>
  <div class="">
    <Sidenav/>
    <Edit/>
  </div>
</template>

<script>
import Sidenav from '@/components/Sidenav.vue'
import Edit from '@/components/Edit.vue'

export default {
  name: 'add',
  components: {
    Sidenav,
    Edit
  }
}
</script>

<style lang="css">
</style>
