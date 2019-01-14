<template>
  <div id="abstract">
    <div class="abstract-items" v-for='(abstractItem, abstractIdx) in abstractItems' @click='gotoDetail(abstractItem, abstractIdx)'>
      <p class="abstract-title">{{abstractItem.title}}</p>
      <p class="abstract-desc">{{abstractItem.desc}}</p>
      <p class="abstract-post">
        Posted by
        <span class="abstract-post-who">{{abstractItem.who}}</span>
        on
        <span>{{abstractItem.time}}</span>
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
  },
  methods: {
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
<style scoped>

.abstract-items {
  margin-top: 20px;
}

.abstract-items:hover {
  color: #37728F;
  cursor: pointer;
}

.abstract-title {
  font-size: 36px;
  font-weight: bold;
}

.abstract-desc {
  font-size: 24px;
}

.abstract-post {
  font-size: 22px;
  font-style: italic;
  font-family: Lora,'Times New Roman',serif;
}

.abstract-post-who {
  font-size: 22px;
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

</style>
