<template>
  <div class="slider">
    <ul class="slides">
      <li>
        <img src="@/assets/CoffeecreditShutterstockcom.jpg"> <!-- random image -->
        <div class="caption center-align">
          <br>
          <h3> <br> <br>Coffee with a friends</h3>
          <h5 class="light grey-text text-lighten-3">is like capturing happiness in a cup.</h5>
        </div>
      </li>
      <li>
        <img src="@/assets/coffee-beans-mug.jpg"> <!-- random image -->
        <div class="caption left-align">

          <h3> <br> <br>Black</h3>
          <h5 class="light grey-text text-lighten-3">as the devil, hot as hell, pure as an angel, sweet as love.</h5>
        </div>
      </li>
      <li>
        <img src="@/assets/1329732-coffee-wallpaper.jpg"> <!-- random image -->
        <div class="caption right-align">
          <br>
          <h3> <br> <br>WHEN LIFE GIVES YOU LEMONS</h3>
          <h5 class="light grey-text text-lighten-3">Trade them for coffee.</h5>
        </div>
      </li>
      <li>
        <img src="@/assets/Coffeehouse+background.jpg"> <!-- random image -->
        <div class="caption center-align">
          <br>
          <h3> <br> <br>Drink coffee !</h3>
          <h5 class="light grey-text text-lighten-3">And do good.</h5>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'Slider',
  props: {
    msg: String
  },
  mounted() {
    $(document).ready(function(){
      $('.slider').slider({full_width: true});
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
