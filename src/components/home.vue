<template>
  <div id="home">
    <!-- <h1>{{msg}}</h1> -->
    <!-- <button @click='nn'>nnn</button> -->
    <div class="bgBanner">
      <p class="bannerTitle">{{bannerTitle}}</p>
      <p class="bannerDesc">{{bannerDesc}}</p>
      <note-abstract :abstractItems='abstractItems' class='abstractItems' @gotoDetail='gotoDetail'></note-abstract>
      <div class="posts-btn-wrap" v-show="showBtns">
        <div class="forward posts-btn" @click='forward' v-show="showForwardBtn"></div>
        <div class="backward posts-btn" @click='backward' v-show="showBackwardBtn"></div>
        <!-- <p>{{currentIdx}}<<{{pageNum}}>></p> -->
        <!-- <p>{{pageNum}}</p> -->
      </div>
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
      abstractItems: [],
      currentIdx: 1,
      pageNum: 0,
      showBtns: false,
      showForwardBtn: false,
      showBackwardBtn: true,
      // msg: 'test msg'
    }
  },
  created() {
    this._getMd();
  },
  // computed: {
  //   msg() {
  //     return this.bannerDesc !== '' ? 'is not null' : 'null'
  //   }
  // },
  // watch: {
  //   msg(newval, oldval) {
  //     console.log('new is: '+newval+';'+'old is:'+oldval)
  //   }
  // },
  methods: {
    // nn() {
    //   this.msg='sdfadaw'
    // },
    // getFileName(){},
    _getMd() {
      let that = this
      let mdList = []
      this.$get('mdlist', {
      }).then((res) => {
        this.abstractItems = res.md_ctx
        // show or hide btn
        res.md_ctx.length > 6 ? this.show(res.md_ctx.length) : this.hide()
        window.sessionStorage.setItem('postItems', JSON.stringify(res.md_ctx))
        // one page 5 items
        if (this.abstractItems.length > 6) {
          this.abstractItems = this.abstractItems.splice(0, 6)
        }
      }).catch((err) => {
        console.log("出现错误")
        console.log(err)
      })
    },
    show(len) {
      this.showBtns = true
      // get pages' number
      this.pageNum = Math.ceil(len / 6)
      // the first page
      // this.showForwardBtn = false
    },
    hide() {
      this.showBtns = false
    },
    forward() {
      let item = JSON.parse(sessionStorage.getItem('postItems'))
      this.currentIdx -= 1
      let start = (this.currentIdx - 1) * 6
      this.abstractItems = item.slice(start, start + 6)
      this.showBackwardBtn = true
      if (this.currentIdx === 1) {
        this.showForwardBtn = false
        this.showBackwardBtn = true
      } else if (this.currentIdx > 1 && this.currentIdx <= this.pageNum) {
        this.showForwardBtn = true
      }
    },
    backward() {
      let item = JSON.parse(sessionStorage.getItem('postItems'))
      this.currentIdx += 1
      let start = (this.currentIdx - 1) * 6
      this.abstractItems = item.slice(start, start + 6)
      this.showForwardBtn = true
      if (this.currentIdx === this.pageNum) {
        this.showBackwardBtn = false
        this.showForwardBtn = true
      } else if (this.currentIdx >= 1 && this.currentIdx < this.pageNum) {
        this.showBackwardBtn = true
      }
    },
    gotoDetail(obj) {
      let title = obj.item.title
      let time = obj.item.time
      let who = obj.item.who
      this.$router.push({
        path: '/noteDetail',
        query: {
          title: title,
          time: time,
          by: who
        }
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

  .posts-btn-wrap {
    width: 60%;
    height: 40px;
    position: relative;
    margin: 0 auto;
  }

  .posts-btn {
    width: 40px;
    height: 40px;
    display: flex;
    line-height: 40px;
    justify-content: center;
    position: absolute;
  }

  .posts-btn:hover {
    cursor: pointer;
  }

  .backward {
    right: 20px;
    background-image: url(../common/image/Back.png);
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);   /* IE 9 */
    -moz-transform:rotate(180deg);  /* Firefox */
    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    -o-transform:rotate(180deg);
  }
  .forward {
    left: 20px;
    background-image: url(../common/image/Back.png);
  }
</style>
