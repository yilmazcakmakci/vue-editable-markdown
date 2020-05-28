<script>
import Vue from 'vue';
import EditableMarkdown from '@/editable-markdown.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    EditableMarkdown
  },
  data () {
    return {
      source: 'Inline `code` has `back-ticks around` it.'
    }
  },
  methods: {
    log () {
      console.log(this.source)
    }
  }
});
</script>

<template>
  <div id="app" style="padding:50px 15%;background-color:black;height: calc(100vh - 100px)">
    <editable-markdown mode="dark" />
  </div>
</template>


<style>
body {
  margin: 0;
}
</style>