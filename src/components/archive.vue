<template>
  <div id="archive">
    <div class="bgBanner">
      <p class="bannerTitle">{{bannerTitle}}</p>
      <p class="bannerDesc">{{bannerDesc}}</p>
      <!-- The tag title wrap  -->
      <ul class="tag-title-wrap">
        <li @click="showAllTag()">
          <span class="md-tag-Item-class md-allTag-Item-class">Show All
          <span class="md-tag-Item-num md-allTag-Item-num">{{allTagNum}}</span></span>
        </li>
        <li v-for="(item, idx) in mdItems" :key="item.id" @click="showThisTag(item, idx)">
          <span :class="idx == currentIdx && currentIdx !== '' ? ' md-tag-Item-class-selected' : 'md-tag-Item-class' ">{{item.classification}}
          <span :class="idx == currentIdx && currentIdx !== '' ? 'md-tag-Item-num-selected' : 'md-tag-Item-num' ">{{item.num}}</span></span>
        </li>
      </ul>
      <note-abstract class='abstractItems' ref='abstract' :abstractItems='abstractItems' @gotoDetail='gotoDetail' @forward='forward' @backward='backward'></note-abstract>
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
      currentIdx: '',
      isSelected: false,
      abstractItems: [],
      allTagNum: 0
    }
  },
  created() {
    this._getTagTitle()
    this._getMd()
  },
  methods: {
    // get markdown classify
    _getTagTitle() {
       this.$get('categoryList', {
       }).then((res) => {
          let categoryList = res
          let allNum = 0
          categoryList.forEach((item, index) => {
            if (item.category !== '') {
              allNum += item.data.length
              this.mdItems.push({
                classification: item.category,
                num: item.data.length
              })
            }
          })
          // add sort func
          this.mdItems.sort((a, b) => {
            return b.num - a.num
          })
          this.allTagNum = allNum
       }).catch((err) => {
          console.log(err)
       })
    },
    showThisTag(currentItem, index) {
      this.currentIdx = index
      let currentCategory = currentItem.classification
      let postsItem = JSON.parse(sessionStorage.getItem('postItems'))
      // get currentItems arr func
      let currentItems = []
      for(let i = 0; i < postsItem.length; i++) {
        let e = postsItem[i]
        if (e.category === currentCategory) {
          currentItems.push(e)
        }
      }
      this.abstractItems = currentItems
      currentItems.length > 6 ? this.$refs.abstract.show(currentItems.length) : this.$refs.abstract.hide()
      if (this.abstractItems.length > 6) {
        this.abstractItems = this.abstractItems.splice(0, 6)
      }
    },
    // show all tags
    showAllTag() {
      this.currentIdx = ''
      this._getMd()
    },
    _getMd() {
      let that = this
      let mdList = []
      this.$get('mdlist', {
      }).then((res) => {
        this.abstractItems = res.md_ctx
        // show or hide btn
        res.md_ctx.length > 6 ? this.$refs.abstract.show(res.md_ctx.length) : this.$refs.abstract.hide()
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
    forward (obj) {
      this.abstractItems = obj.item.slice(obj.start, obj.start + 6)
    },
    backward (obj) {
      this.abstractItems = obj.item.slice(obj.start, obj.start + 6)
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
    background-color: #A6B4E0;
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
    color: #fff;
    font-family: '微软雅黑';
    padding: 5px 20px 5px 10px;
    border-radius: 5px;
    background-color: rgba(76, 146, 176, 1);
    position: relative;
  }

  .tag-title-wrap li .md-tag-Item-num-selected {
    position: absolute;
    color: #fff;
    top: 0px;
    right: 5px;
    font-weight: bold;
    background-color: rgba(76, 146, 176, 1);
    font-size: 8px;
  }

  .tag-title-wrap li span:hover {
    background-color: rgba(76, 146, 176, 1);
  }

  .md-allTag-Item-num,
  .md-allTag-Item-class {
    background-color: #e4e4e4!important;
    color: rgba(76, 146, 176, 1)!important;
    font-weight: bold;
  }

</style>

