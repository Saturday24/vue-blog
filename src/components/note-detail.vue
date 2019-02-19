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
  },
  methods: {
    _getMd() {
      let title = this.$route.query.title
      this.$post('/api/mdDetail',{title: title}).then((res) => {
        this.mdCtx = res.data
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

  pre {
      width: 100%; /* 必须定义宽度 */
  }

</style>
