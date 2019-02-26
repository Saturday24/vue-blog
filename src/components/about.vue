<template>
  <div id="about">
    <banner :bannerImgUrl="bannerImgUrl"
            :bannerTitle="bannerTitle"
            :bannerDesc="bannerDesc">
    </banner>
    <!-- about me info wrap -->
    <div :class="meWrap">
      <!-- left -->
      <div :class="meDesc">
        <!-- feihua -->
        <div class="me-feihua">
         <span v-for = "(feihuaItem, feihuaIdx) in feihuaItems">{{feihuaItem}}</span>
       </div>
        <!-- 简介 -->
        <div class="me-intro">
          {{meIntro}}
        </div>
        <!-- 技术Technology and 履历 -->
        <div class="me-tec">
          {{meTec}}
        </div>
      </div>
      <!-- right -->
      <div class="me-info" v-show='isShowMe'>
        <p class="about-me">ABOUT ME</p>
        <p class="me-avatar">
          <img :src='avatarUrl' alt="">
        </p>
        <p class="sticky-notes">
          <span>{{stickyNotesEn}}</span>
          <br>
          <span>{{stickyNotesCh}}</span>
        </p>
      </div>
    </div>
    <footer-link></footer-link>
  </div>
</template>

<script>
import banner from 'base/banner'
import noteAbstract from 'base/abstract'
import footerLink from 'base/footer'
import store from '@/store'
const bannerUrl = require('common/image/about-bg.jpg')

export default {
  name: 'about',
  store,
  data () {
    return {
      bannerTitle: 'About Me',
      bannerDesc: 'Not Perfect, So Need To Learn',
      bannerImgUrl: bannerUrl,
      avatarUrl: require('../common/image/avatar.jpg'),// 头像地址
      stickyNotesEn: 'Not Perfect, So Need To Learn.',
      stickyNotesCh: '不完善，所以需要学习。',
      isShowMe: true,
      meWrap: 'me-wrap',
      meDesc: 'me-desc',
      feihuaItems: [
        '我是谁，我在哪里，我该干什么？',
        '有很多事情你当时想不通，别着急，过一段时间你再想，就想不起来了。'
      ],
      meIntro: 'Hola, 我是shui, 职业是FE Developer.',
      meTec: `每天仍有无数底层的人，在为生活艰难地奔波。`
    }
  },
  created() {
    const clientWidth = document.body.clientWidth
    console.log(this.wid);
    if (clientWidth < 768) {
      this.isShowMe = false
      this.meWrap = 'me-wrap-center'
      this.meDesc = 'me-desc-center'
    } else {
      this.isShowMe = true
      this.meWrap = 'me-wrap'
      this.meDesc = 'me-desc'
    }
    this._getInfo()
  },
  methods: {
    _getInfo() {
      this.$get('/usrInfo',{
      }).then((res) => {
        console.log(res);
        this.feihuaItems.push(res.feihuaItems1)
        this.feihuaItems.push(res.feihuaItems2)
        this.meIntro = res.meIntro
        this.meTec = res.meTec
      }).catch((err) => {
        console.log(err);
      })
    }
  },
  computed: {
    changeCate() {
      return store.state.clientCategory
    }
  },
  watch: {
    changeCate(newVal,oldVal) {
      console.log(newVal);
      if (newVal === 'pc') {
        this.isShowMe = true
        this.meWrap = 'me-wrap'
        this.meDesc = 'me-desc'
      } else if (newVal === 'mobile') {
        this.isShowMe = false
        this.meWrap = 'me-wrap-center'
        this.meDesc = 'me-desc-center'
      }
    }
  },
  components: {
    banner,
    noteAbstract,
    footerLink
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import '~common/style/index';

  /* me info wrap */
  .me-wrap {
    width: 100%;
    display: flex;
    padding: 50px 0;
  }

  .me-wrap-center {
    width: 100%;
    padding: 50px 0;
    display: flex;
    justify-content: center;
  }

  /* about me left */
  .me-desc {
    width: 50%;
    margin-left: 20%;
  }

  .me-desc-center {
    width: 80%;
    text-align: center;
    margin: 0 auto;
  }

  .me-feihua {
    border-left: 5px solid #eee;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .me-feihua span,
  .me-intro,
  .me-tec {
    display: flex;
    padding-left: 14px;
    line-height: 1.6rem;
    margin: 10px;
    font-size: .95rem;
    font-style: italic;
    text-align: left;
  }

  .me-intro,
  .me-tec {
    font-style: normal;
    position: relative;
    left: 0;
    top: 36px;
  }

  /* clientWidth * (100 - 10*2 - 50) > 200px */
  .me-info {
    width: 200px;
    height: 260px;
    padding: 20px 0;
    border-top: 1px solid #EEEEEE;
    border-bottom: 1px solid #EEEEEE;
    margin-right: 14%;
    .about-me {
      color: #ccc;
      font-weight: bold;
      margin-top: 0px;
      &:hover {
        color: #38849E;
        cursor: pointer;
      }
    }
    .me-avatar img {
      width: 170px;
      height: 170px;
      margin-top: 10px;
      border-radius: 170px;
    }
  }

  .sticky-notes {
    margin-top: 10px;
    span {
      font-size: 14px;
      color: #ccc;
      &:nth-child(1) {
        font-family: Lora,'Times New Roman',serif;
      }
      &:nth-child(2) {
        font-family: '微软雅黑';
      }
    }
  }

</style>
