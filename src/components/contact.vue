<template>
  <div id="contact">
    <div class="bgBanner">
      <p class="bannerTitle">{{bannerTitle}}</p>
      <p class="bannerDesc">{{bannerDesc}}</p>
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
      <footer-link></footer-link>
    </div>
  </div>
</template>

<script>
import noteAbstract from 'base/abstract'
import footerLink from 'base/footer'

export default {
  name: 'contact',
  data () {
    return {
      bannerTitle: 'Leo Chen',
      bannerDesc: 'Not Perfect, So Need To Learn',
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
        let formData = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          wechat: this.wechat,
          message: this.message,
        }
        this.$post('/api/email',formData).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      }
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
      background-image: url(../common/image/post-sample-image.jpg);
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
  }

  .send-wrap span {
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
</style>
