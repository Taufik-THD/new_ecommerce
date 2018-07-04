<template>
  <div class="home">
    <div class="container">
      <Register/>
    </div>
  </div>
</template>

<script>
import Register from '@/components/Register.vue'

export default {
  name: 'register',
  components: {
    Register
  }
}
</script>

<style scoped>
.home{
  background-image: url("http://stonepointcap.com/wp-content/uploads/2015/05/newspaper-and-coffee.jpg");
  background-size: cover;
}
</style>
