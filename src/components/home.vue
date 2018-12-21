<template>
  <div id="home">
    <div class="bgBanner">
      <p class="bannerTitle">{{bannerTitle}}</p>
      <p class="bannerDesc">{{bannerDesc}}</p>
      <note-abstract :abstractItems='abstractItems' class='abstractItems'></note-abstract>
      <footer-link></footer-link>
    </div>
  </div>
</template>

<script>
import noteAbstract from 'base/abstract'
import footerLink from 'base/footer'

export default {
  name: 'home',
  data () {
    return {
      bannerTitle: 'Leo Chen',
      bannerDesc: 'Not Perfect, So Need To Learn',
      abstractItems: [
          {
            title: 'isajdnaksndka',
            desc: 'isajdnaksndka',
            who: 'isajdnaksndka',
            time: 'isajdnaksndka'
          },
          {
            title: 'isajdnaksndka',
            desc: 'isajdnaksndka',
            who: 'isajdnaksndka',
            time: 'isajdnaksndka'
          },
          {
            title: 'isajdnaksndka',
            desc: 'isajdnaksndka',
            who: 'isajdnaksndka',
            time: 'isajdnaksndka'
          }
      ]
    }
  },
  created() {
    this._getMd();
  },
  methods: {
    _getMd() {
      let that = this
      let mdList = []
      this.$get('mdlist', {
      }).then((res) => {
        mdList = res;
        for (let i = 0; i < mdList.length; i++) {
          that.$get(`md/${mdList[i]}`, {
          }).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
            console.log('出现错误');
          })
          console.log(mdList[i]);
        }
      }).catch((err) => {
        console.log("出现错误")
        console.log(err)
      })
    }
  },
  components: {
    noteAbstract,
    footerLink
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .bgBanner {
      width: 100%;
      height: 0;
      padding-top: 45%;
      background-image: url(../common/image/home-bg.jpg);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
  }
  .bannerTitle {
    color: #fff;
    font-size: 40px;
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
    font-size: 18px;
  }

  /* abstractItems */
  .abstractItems {
    margin-bottom: 50px;
  }
</style>
