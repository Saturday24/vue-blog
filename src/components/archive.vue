<template>
  <div id="archive">
    <div class="bgBanner">
      <p class="bannerTitle">{{bannerTitle}}</p>
      <p class="bannerDesc">{{bannerDesc}}</p>
      <!-- The tag title wrap  -->
      <ul class="tag-title-wrap">
        <li v-for="(item, idx) in mdItems" :key="item.id" @click="showThisTag(item, idx)">
          <span :class="idx == currentIdx && currentIdx !== '' ? ' md-tag-Item-class-selected' : 'md-tag-Item-class' ">{{item.classification}}
          <span :class="idx == currentIdx && currentIdx !== '' ? 'md-tag-Item-num-selected' : 'md-tag-Item-num' ">{{item.num}}</span></span>
        </li>
      </ul>
      <footer-link></footer-link>
    </div>
  </div>
</template>

<script>
import noteAbstract from 'base/abstract'
import footerLink from 'base/footer'

export default {
  name: 'archive',
  data () {
    return {
      bannerTitle: 'Leo Chen',
      bannerDesc: 'Not Perfect, So Need To Learn',
      mdItems: [],
      currentIdx: ''
    }
  },
  created() {
    this._getTagTitle()
  },
  methods: {
    // get markdown classify
    _getTagTitle() {
       this.$get('categoryList', {
       }).then((res) => {
          let categoryList = res
          categoryList.forEach((item, index) => {
            this.mdItems.push({
              classification: item.category,
              num: item.data.length
            })
          })
          console.log(categoryList)
       }).catch((err) => {
          console.log(err)
       })
    },
    showThisTag(item, index) {
      // let i = JSON.parse(item)
      console.log(item.classification+index)
      this.currentIdx = index
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
      background-image: url(../common/image/post-bg.jpg);
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

  /* markdown tag wrap style */

  .tag-title-wrap {
    margin: 10px auto;
    width: 80%;
  }

  .tag-title-wrap li {
    padding: 5px 10px;
    cursor: pointer;
    display: inline-flex;
    justify-content: flex-start;
  }
  /* class => category */
  .tag-title-wrap li .md-tag-Item-class {
    font-size: 16px;
    color: #fff;
    font-family: '微软雅黑';
    padding: 5px 20px 5px 10px;
    border-radius: 5px;
    background-color: rgba(76, 146, 176, 1.0);
    position: relative;
  }

  .tag-title-wrap li .md-tag-Item-num {
    position: absolute;
    top: 0px;
    right: 5px;
    font-weight: bold;
    font-size: 8px;
  }

  .tag-title-wrap li .md-tag-Item-class-selected {
    font-size: 16px;
    color: rgba(76, 146, 176, 1.0);
    font-family: '微软雅黑';
    padding: 5px 20px 5px 10px;
    border-radius: 5px;
    background-color: red;
    position: relative;
  }

  .tag-title-wrap li .md-tag-Item-num-selected {
    position: absolute;
    color: rgba(76, 146, 176, 1.0);
    top: 0px;
    right: 5px;
    font-weight: bold;
    font-size: 8px;
  }

</style>

