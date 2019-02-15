<template>
  <div id="banner">
    <div class="bgBanner" :style="{backgroundImage: 'url('+bannerImgUrl+')'}">
      <p class="bannerTitle">{{bannerTitle}}</p>
      <p class="bannerDesc">{{bannerDesc}}</p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'banner',
  data () {
    return {
    }
  },
  props: {
    bannerImgUrl: {
      type: String,
      defualt: ''
    },
    bannerTitle: {
      type: String,
      defualt: ''
    },
    bannerDesc: {
      type: String,
      defualt: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">

  .bgBanner {
      width: 100%;
      height: 0;
      padding-top: 45%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
  }
  .bannerTitle {
    color: #fff;
    font-size: 2.5rem;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -80px;
    margin-top: -30px;
  }
  .bannerDesc {
    color: #7e7e7e;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -110px;
    margin-top: 20px;
    font-size: 1.2rem;
  }
</style>
