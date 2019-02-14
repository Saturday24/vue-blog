<template>
  <div id="noteDetail">
    <div class="note-wrapper">
      <div class="note-wrap">
        <mark-down :mdCtx='mdCtx'></mark-down>
        <div class="goto-top" @click='gotoTop'>
          <img src="../common/image/top.png" alt="TOP">
        </div>
      </div>
      <footer-link></footer-link>
    </div>
  </div>
</template>

<script>
import noteAbstract from 'base/abstract'
import footerLink from 'base/footer'
import markDown from 'base/markdown'

export default {
  name: 'notedetail',
  data () {
    return {
      bannerTitle: 'Leo Chen',
      bannerDesc: 'Not Perfect, So Need To Learn',
      noteDetail: '',
      mdCtx: ''
    }
  },
  created() {
    this._getMd();
    this._getQuery();
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
    },
    _getQuery() {
      let fileName = this.$route.query.time
      let that = this
      this.$get(`md/${fileName}`, {
      }).then((res) => {
        that.mdCtx = res
      }).catch((err) => {
        console.log(err)
      })
    },
    // goto top
    gotoTop() {
      var timer = setInterval(function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        var ispeed = Math.floor(-scrollTop/6)
        console.log(ispeed)
        if(scrollTop == 0){
          clearInterval(timer)
        }
        document.documentElement.scrollTop = document.body.scrollTop = scrollTop + ispeed
      },30)
    }
  },
  components: {
    noteAbstract,
    footerLink,
    markDown
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">

  .note-wrapper {
      width: 100%;
      height: 0;
      padding-top: 45%;
      background-image: url(../common/image/post-sample-image.jpg);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
  }

  .note-wrap {
    margin: 10px 10%;
    padding: {
      bottom: 20px;
      top: 20px;
    }
  }

  .goto-top {
    position: absolute;
    right: 5%;
    &:hover {
      cursor: pointer;
    }
  }

</style>
