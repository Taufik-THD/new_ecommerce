<template>
  <div class="">
    <Header/>
    <br>
    <Cart/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Cart from '@/components/Cart.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    Header,
    Cart,
    Footer
  }
}
</script>
