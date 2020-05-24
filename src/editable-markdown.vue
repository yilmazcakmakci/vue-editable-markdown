<template>
  <div 
    class="md-text-container" 
    :class="[mode === 'dark' ? 'dark': 'light']"
  >
    <textarea-autosize
      v-if="editableState"
      v-model="markdownText"
      v-focus
      class="md-textarea"
      @input="returnMD"
      @blur.native="hideTextarea"
    />
    <div 
      v-if="!editableState" 
      class="markdown-body" 
      @click="showTextarea" 
      v-html="markedText" 
    />
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/tomorrow-night.css';
import 'github-markdown-css'

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, language) {
    const hljs = require('highlight.js')
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
    return hljs.highlight(validLanguage, code).value
  },
  gfm:true,
  breaks: true,
})
export default {
  name: 'EditableMarkdown',
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
        el.select()
      }
    } 
  },
  props: {
    mode: {
      type: String,
      default: 'light',
      validator: mode => {
        return ['dark','light'].includes(mode)
      }
    },
    source: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editableState: false,
      markdownText: this.source
    }
  },
  computed: {
    markedText () {
      return marked(this.markdownText)
    },
  },
  methods: {
    hideTextarea () {
      this.editableState = false
      this.$emit('blur') // you can add @blur event in the parent
    },
    showTextarea () {
      this.editableState = true
    },
    returnMD () {
      this.$emit('input', this.markdownText)
    },
  }
}
</script>

<style>
:root {
    --md-dark-bg: #30393e;
    --md-dark-text: #afafaf;
    --md-dark-tbl: #15191f;
  }

  .markdown-body {
    box-sizing: border-box;
    padding: 45px;
    cursor: pointer;
  }
  
  .dark .markdown-body {
    color: var(--md-dark-text);
  }

  .dark .markdown-body h1, .dark .markdown-body h2, .dark .markdown-body table th, .dark .markdown-body table td, .dark .markdown-body blockquote {
    border-color: var(--md-dark-bg);
  }

  .dark .markdown-body pre, .dark .markdown-body code, .dark .markdown-body hr {
    background-color: var(--md-dark-bg);
  }

  .dark .markdown-body table tr:nth-child(2n) {
    background-color: var(--md-dark-tbl);
  }

  .dark .markdown-body table tr {
    background-color: transparent;
  }

  .md-text-container {
    border-radius: 12px;
    font-family: Cambria;
  }

  .dark.md-text-container {
    background-color: #222831;
  }

  .light.md-text-container {
    background-color: #efefef;
  }

  .md-textarea {
    background-color: transparent;
    border: none;
    outline: none;
    width: -webkit-fill-available;
    padding: 15px 45px;
  }

  .dark .md-textarea {
    color: #C4C4C4;
  }
</style>