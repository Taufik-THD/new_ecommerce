<template>
  <div class="">
    <Header/>
    <br>
    <Detail/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Detail from '@/components/Detail.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    Header,
    Detail,
    Footer
  }
}
</script>
