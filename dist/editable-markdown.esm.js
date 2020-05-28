import marked from 'marked';
import 'highlight.js/styles/tomorrow-night.css';
import 'github-markdown-css';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/core';

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : 'javascript';

    const hljslanguage = commonjsRequire();

    hljs.registerLanguage(validLanguage, hljslanguage);
    return hljs.highlight(validLanguage, code).value;
  },
  gfm: true,
  breaks: true
});
var script = {
  name: 'EditableMarkdown',
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
        el.select();
      }
    }
  },
  props: {
    mode: {
      type: String,
      default: 'light',
      validator: mode => {
        return ['dark', 'light'].includes(mode);
      }
    },
    source: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      editableState: false,
      markdownText: this.source
    };
  },

  computed: {
    markedText() {
      return DOMPurify.sanitize(marked(this.markdownText));
    }

  },
  methods: {
    hideTextarea() {
      this.editableState = false;
      this.$emit('blur'); // you can add @blur event in the parent
    },

    showTextarea() {
      this.editableState = true;
    },

    returnMD() {
      this.$emit('input', this.markdownText);
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "md-text-container",
    class: [_vm.mode === 'dark' ? 'dark' : 'light']
  }, [_vm.editableState ? _c('textarea-autosize', {
    directives: [{
      name: "focus",
      rawName: "v-focus"
    }],
    staticClass: "md-textarea",
    on: {
      "input": _vm.returnMD
    },
    nativeOn: {
      "blur": function ($event) {
        return _vm.hideTextarea($event);
      }
    },
    model: {
      value: _vm.markdownText,
      callback: function ($$v) {
        _vm.markdownText = $$v;
      },
      expression: "markdownText"
    }
  }) : _vm._e(), _vm._v(" "), !_vm.editableState ? _c('div', {
    staticClass: "markdown-body",
    domProps: {
      "innerHTML": _vm._s(_vm.markedText)
    },
    on: {
      "click": _vm.showTextarea
    }
  }) : _vm._e()], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-2c017a49_0", {
    source: ":root{--md-dark-bg:#30393e;--md-dark-text:#afafaf;--md-dark-tbl:#15191f}.markdown-body{box-sizing:border-box;padding:45px;cursor:pointer}.dark .markdown-body{color:var(--md-dark-text)}.dark .markdown-body blockquote,.dark .markdown-body h1,.dark .markdown-body h2,.dark .markdown-body table td,.dark .markdown-body table th{border-color:var(--md-dark-bg)}.dark .markdown-body code,.dark .markdown-body hr,.dark .markdown-body pre{background-color:var(--md-dark-bg)}.dark .markdown-body table tr:nth-child(2n){background-color:var(--md-dark-tbl)}.dark .markdown-body table tr{background-color:transparent}.md-text-container{border-radius:12px;font-family:Cambria}.dark.md-text-container{background-color:#222831}.light.md-text-container{background-color:#efefef}.md-textarea{background-color:transparent;border:none;outline:0;width:-webkit-fill-available;width:-moz-available;padding:15px 45px}.dark .md-textarea{color:#c4c4c4}.light .md-textarea{color:#000!important}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installEditableMarkdown(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('EditableMarkdown', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
