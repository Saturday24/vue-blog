<template>
  <div id="home">
    <div class="bgBanner">
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .bgBanner {
      width: 100%;
      height: 0;
      padding-top: 31.25%;
      background-image: url(../common/image/home-bg.jpg);
      background-repeat: no-repeat;
      background-size: 100% 100%;
  }
</style>
