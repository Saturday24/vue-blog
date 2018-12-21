<template>
  <div id="about">
    <div class="bgBanner">
      <p class="bannerTitle">{{bannerTitle}}</p>
      <p class="bannerDesc">{{bannerDesc}}</p>
    </div>
    <!-- about me info wrap -->
    <div :class="meWrap">
      <div class="me-desc"><note-abstract :abstractItems='abstractItems' class='abstractItems'></note-abstract></div>
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
import noteAbstract from 'base/abstract'
import footerLink from 'base/footer'

export default {
  name: 'about',
  data () {
    return {
      bannerTitle: 'About',
      bannerDesc: 'Not Perfect, So Need To Learn',
      avatarUrl: require('../common/image/avatar.jpg'),// 头像地址
      stickyNotesEn: 'Not Perfect, So Need To Learn.',
      stickyNotesCh: '不完善，所以需要学习。',
      isShowMe: true,
      meWrap: 'me-wrap',
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
          }
      ]
    }
  },
  created() {
    const clientWidth = document.body.clientWidth
    if (clientWidth < 768) {
      this.isShowMe = false
      this.meWrap = 'me-wrap-center'
    } else {
      this.isShowMe = true
      this.meWrap = 'me-wrap'
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
      background-image: url(../common/image/about-bg.jpg);
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

  /* me info wrap */
  .me-wrap {
    width: 100%;
    display: flex;
    padding: 50px 10%;
  }

  .me-wrap-center {
    width: 100%;
    padding: 50px 0;
    display: flex;
    justify-content: center;
  }

  .me-desc {
    width: 50%;
  }

  /* clientWidth * (100 - 10*2 - 50) > 200px */
  .me-info {
    width: 200px;
    height: 260px;
    padding: 20px 0;
    border-top: 1px solid #EEEEEE;
    border-bottom: 1px solid #EEEEEE;
    margin-left: 10%;
  }

  .me-info .about-me {
    color: #ccc;
    font-weight: bold;
    margin-top: 0px;
  }

  .me-info .about-me:hover {
    color: #38849E;
    cursor: pointer;
  }

  .me-info .me-avatar img {
    width: 170px;
    height: 170px;
    margin-top: 10px;
    border-radius: 170px;
  }

  .sticky-notes {
    margin-top: 10px;
  }

  .sticky-notes span {
    font-size: 14px;
    color: #ccc;
  }
  .sticky-notes span:nth-child(1) {
    font-family: Lora,'Times New Roman',serif;
  }
  .sticky-notes span:nth-child(2) {
    font-family: '微软雅黑';
  }

</style>
