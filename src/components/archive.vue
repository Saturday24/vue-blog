<template>
  <div id="archive">
    <div class="bgBanner">
      <p class="bannerTitle">{{bannerTitle}}</p>
      <p class="bannerDesc">{{bannerDesc}}</p>
      <!-- The tag title wrap  -->
      <div class="tag-title-wrap">
        <ul class="md-tag-Item">
          <li v-for="(item, idx) in mdItems">
            <span class="md-tag-Item-class" @click="showThisTag(item, idx)">{{item.classification}}
            <span class="md-tag-Item-num">{{item.num}}</span></span>
          </li>
        </ul>
      </div>
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
      mdItems: []
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
    width: 80%;
    margin: 0 auto;
    background-color: #ccc;
  }

  .tag-title-wrap ul {
    margin: 10px;
    padding: 10px;
  }

  .tag-title-wrap ul li {
    margin: 30px;
    /* background-color: red; */
    cursor: pointer;
    display: flex;
    flex-wrap: nowrap;
  }
  /* class => category */
  /* .md-tag-Item .md-tag-Item-class {
    margin: 10px;
    font-size: 16px;
    color: #fff;
    font-family: '微软雅黑';
    padding: 5px 20px 5px 10px;
    border-radius: 5px;
    background-color: rgba(76, 146, 176, 1.0);
    position: relative;
  }

  .md-tag-Item .md-tag-Item-num {
    position: absolute;
    top: 0px;
    right: 5px;
    font-weight: bold;
    font-size: 8px;
  } */

</style>

