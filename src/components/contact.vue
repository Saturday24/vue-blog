<template>
  <div id="contact">
    <banner :bannerImgUrl="bannerImgUrl"
            :bannerTitle="bannerTitle"
            :bannerDesc="bannerDesc">
    </banner>
    <div class="send-wrap">
      <span>若您有任何疑问，</span><br>
      <span>请填写下面的信息给我留言，我会尽快回复您!</span>
      <div class="input-div">
        <input type="text" name="name" v-model.trim="name" placeholder="Name">
      </div>
      <div class="input-div">
        <input type="text" name="email" v-model.trim="email" placeholder="Email">
      </div>
      <div class="input-div">
        <input type="text" name="phone" v-model.trim="phone" placeholder="Phone">
      </div>
      <div class="input-div">
        <input type="text" name="wechat" v-model.trim="wechat" placeholder="微信">
      </div>
      <div class="input-div">
        <textarea name="message" rows="5" v-model="message" placeholder="Message"></textarea>
      </div>
      <button class="send-mail" @click="sendMail">发送</button>
    </div>
    <div class="my-wechat">
      <img src="../common/image/WeChat.jpeg" alt="csf151408">
      <!-- <span>扫一扫，加我微信</span> -->
    </div>
    <confirm ref="confirm" @confirm="sendMsg" text="请您确认信息，是否发送？" confirmBtnText="发送"></confirm>
    <footer-link></footer-link>
  </div>
</template>

<script>
import banner from 'base/banner'
import noteAbstract from 'base/abstract'
import footerLink from 'base/footer'
import confirm from 'base/confirm'
const bannerUrl = require('common/image/post-sample-image.jpg')

export default {
  name: 'contact',
  data () {
    return {
      bannerTitle: 'Contact Me',
      bannerDesc: 'Not Perfect, So Need To Learn',
      bannerImgUrl: bannerUrl,
      name: '',
      email: '',
      phone: '',
      wechat: '',
      message: ''
    }
  },
  methods: {
    sendMail() {
      // 验证表单信息以及验证逻辑待写
      if (!this.email && !this.phone && !this.wechat) {
        alert('请您填写联系方式～')
      } else if (!this.name) {
        alert('请您填写联系名字或昵称～')
      } else if (!this.message) {
          alert('请您输入详细信息～')
      } else {
        this.$refs.confirm.show()
      }
    },
    sendMsg() {
      let formData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        wechat: this.wechat,
        message: this.message,
      }
      this.$post('/api/email',formData).then((res) => {
        // console.log(res)
        alert('您的信息已发送成功!')
        location.reload()
      }).catch((err) => {
        alert('您的信息发送失败~')
        console.log(err)
      })
    }
  },
  components: {
    banner,
    noteAbstract,
    footerLink,
    confirm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">

  input,textarea {
    border: none;
    width: 80%;
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
    padding-left: 10px;
    font-size: 18px;
    font-family: Lora,'Times New Roman',serif;
  }

  input {
    height: 50px;
  }

  .send-wrap {
    margin-top: 10px;
    padding: 20px;
    span {
      font-size: 18px;
    }
    .send-mail {
      width: 100px;
      height: 40px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 18px;
      background: #0085a1;
      color: #fff;
      margin-top: 20px;
      outline: none;
      border: none;
      font-family: Lora,'Times New Roman',serif;
    }
  }

  .my-wechat img {
    margin-top: 20px;
    width: 240px;
    height: 240px;
  }
</style>
