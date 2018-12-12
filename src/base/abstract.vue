<template>
  <div id="abstract">
    <div class="abstract-items" v-for='(abstractItem, abstractIdx) in abstractItems'>
      <p class="abstract-title">{{abstractItem.title}}</p>
      <p class="abstract-desc">{{abstractItem.desc}}</p>
      <p class="abstract-post">
        <span>Posted by</span>
        {{abstractItem.who}}
        <span>on</span>
        {{abstractItem.time}}
      </p>
      <p class="abstract-line"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'abstract',
  data () {
    return {
    }
  },
  props: {
    abstractItems: {
      type: Array,
      default: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.abstract-items {
  margin-top: 20px;
}

.abstract-items:hover {
  color: rgb(55, 114, 143);
  cursor: pointer;
}

.abstract-title {
  font-size: 30px;
  font-weight: bold;
}

.abstract-desc {
  font-size: 24px;
}

.abstract-post {
  font-size: 18px;
  font-style: italic;
}

.abstract-line {
  width: 50%;
  height: 1px;
  background: #999;
  margin-top: 30px;
  display: inline-flex;
  justify-content: center;
}

</style>
