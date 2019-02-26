<template>
  <div id="abstract">
    <div class="abstract-items" v-for='(abstractItem, abstractIdx) in abstractItems' @click='gotoDetail(abstractItem, abstractIdx)'>
      <p class="abstract-title">{{abstractItem.title}}</p>
<!--       <p class="abstract-desc">{{abstractItem.desc}}</p>
 -->      <p class="abstract-post">
        Posted <!-- by -->
        <!-- <span class="abstract-post-who">{{abstractItem.who}}</span> -->
        on
        <span>{{abstractItem.time}}</span>
      </p>
      <p class="abstract-line"></p>
    </div>
    <div class="posts-btn-wrap" v-show="showBtns">
      <div class="forward posts-btn" @click='forward' v-show="showForwardBtn"></div>
      <div class="backward posts-btn" @click='backward' v-show="showBackwardBtn"></div>
      <!-- <p>{{currentIdx}}<<{{pageNum}}>></p> -->
      <!-- <p>{{pageNum}}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'abstract',
  data () {
    return {
      currentIdx: 1,
      pageNum: 0,
      showBtns: false,
      showForwardBtn: false,
      showBackwardBtn: true,
    }
  },
  props: {
    abstractItems: {
      type: Array,
      default: []
    }
  },
  methods: {
    show(len) {
      this.showBtns = true
      // get pages' number
      this.pageNum = Math.ceil(len / 5)
      // the first page
      // this.showForwardBtn = false
    },
    hide() {
      this.showBtns = false
    },
    forward() {
      // let item = JSON.parse(sessionStorage.getItem('resCtxItems') == '' ?sessionStorage.getItem('postItems') : sessionStorage.getItem('resCtxItems'))
      let item = JSON.parse(sessionStorage.getItem('postItems'))
      // let item = postItems
      this.currentIdx -= 1
      let start = (this.currentIdx - 1) * 5
      // this.abstractItems = item.slice(start, start + 6)
      this.showBackwardBtn = true
      if (this.currentIdx === 1) {
        this.showForwardBtn = false
        this.showBackwardBtn = true
      } else if (this.currentIdx > 1 && this.currentIdx <= this.pageNum) {
        this.showForwardBtn = true
      }
      this.$emit('forward', {
        item: item,
        start: start
      })
    },
    backward() {
      // let item = JSON.parse(sessionStorage.getItem('resCtxItems') == '' ?sessionStorage.getItem('postItems') : sessionStorage.getItem('resCtxItems'))
      let item = JSON.parse(sessionStorage.getItem('postItems'))
      // let item = postItems
      this.currentIdx += 1
      let start = (this.currentIdx - 1) * 5
      // this.abstractItems = item.slice(start, start + 6)
      this.showForwardBtn = true
      if (this.currentIdx === this.pageNum) {
        this.showBackwardBtn = false
        this.showForwardBtn = true
      } else if (this.currentIdx >= 1 && this.currentIdx < this.pageNum) {
        this.showBackwardBtn = true
      }
      this.$emit('backward', {
        item: item,
        start: start
      })
    },
    gotoDetail(item, idx) {
      this.$emit('gotoDetail', {
        item: item,
        idx: idx
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import '~common/style/variable';
@import '~common/style/index';

#abstract {
  padding: {
    left: 1.5rem;
    right: 1.5rem;
  }
}

.abstract-items {
  margin-top: 20px;
}

.abstract-items:hover {
  color: #37728F;
  cursor: pointer;
}

.abstract-title {
  font-size: 1.4rem;
  font-weight: bold;
}

.abstract-desc {
  font-size: 1rem;
}

.abstract-post {
  font-size: 1.1rem;
  font-style: italic;
  font-family: Lora,'Times New Roman',serif;
  position: relative;
  top: 10px;
}

.abstract-post-who {
  font-size: 1.1rem;
  font-style: normal;
  color: #222;
  font-family: Lora,'Times New Roman',serif;
}

.abstract-line {
  width: 50%;
  height: 1px;
  background: #E5E5E5;
  margin-top: 30px;
  display: inline-flex;
  justify-content: center;
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
    top: 20px;
    right: 20px;
    background-image: url(../common/image/Back.png);
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);   /* IE 9 */
    -moz-transform:rotate(180deg);  /* Firefox */
    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    -o-transform:rotate(180deg);
  }
  .forward {
    top: 20px;
    left: 20px;
    background-image: url(../common/image/Back.png);
  }

</style>
