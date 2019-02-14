<template>
  <div id="home">
    <banner :bannerImgUrl="bannerImgUrl"
            :bannerTitle="bannerTitle"
            :bannerDesc="bannerDesc">
    </banner>
    <note-abstract class='abstractItems' ref='abstract' :abstractItems='abstractItems' @gotoDetail='gotoDetail' @forward='forward' @backward='backward'></note-abstract>
    <footer-link></footer-link>
  </div>
</template>

<script>
import banner from 'base/banner'
import noteAbstract from 'base/abstract'
import footerLink from 'base/footer'
const bannerUrl = require('common/image/home-bg.jpg')

export default {
  name: 'home',
  data () {
    return {
      bannerTitle: 'Leo Chen',
      bannerDesc: 'Not Perfect, So Need To Learn',
      abstractItems: [],
      bannerImgUrl: bannerUrl
    }
  },
  created() {
    this._getMd()
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
    banner,
    noteAbstract,
    footerLink
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import '~common/style/variable';

</style>
