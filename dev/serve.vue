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
  <div id="app" style="padding:5% 15%">
    <editable-markdown mode="dark" />
  </div>
</template>
