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
  <div id="app" style="">
    <editable-markdown mode='light' />
  </div>
</template>
