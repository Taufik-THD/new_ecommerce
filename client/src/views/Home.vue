<template>
  <div class="home">
    <Header/>
    <Slider/>
    <Menu/>
    <Footer/>
  </div>
</template>

<script>

// @ is an alias to /src
import Slider from '@/components/Slider.vue'
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    Slider,
    Header,
    Menu,
    Footer
  }

}
</script>
