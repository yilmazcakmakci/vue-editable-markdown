'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var marked=_interopDefault(require('marked'));require('highlight.js/styles/tomorrow-night.css'),require('github-markdown-css');var DOMPurify=_interopDefault(require('dompurify')),hljs=_interopDefault(require('highlight.js/lib/core'));function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function highlight(code, language) {
    var validLanguage = hljs.getLanguage(language) ? language : 'javascript';

    var hljslanguage = commonjsRequire();

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
      inserted: function inserted(el) {
        el.focus();
        el.select();
      }
    }
  },
  props: {
    mode: {
      type: String,
      default: 'light',
      validator: function validator(mode) {
        return ['dark', 'light'].includes(mode);
      }
    },
    source: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      editableState: false,
      markdownText: this.source
    };
  },
  computed: {
    markedText: function markedText() {
      return DOMPurify.sanitize(marked(this.markdownText));
    }
  },
  methods: {
    hideTextarea: function hideTextarea() {
      this.editableState = false;
      this.$emit('blur'); // you can add @blur event in the parent
    },
    showTextarea: function showTextarea() {
      this.editableState = true;
    },
    returnMD: function returnMD() {
      this.$emit('input', this.markdownText);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
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
      "blur": function blur($event) {
        return _vm.hideTextarea($event);
      }
    },
    model: {
      value: _vm.markdownText,
      callback: function callback($$v) {
        _vm.markdownText = $$v;
      },
      expression: "markdownText"
    }
  }) : _vm._e(), _vm._ssrNode(" " + (!_vm.editableState ? "<div class=\"markdown-body\">" + _vm._s(_vm.markedText) + "</div>" : "<!---->"))], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-2c017a49_0", {
    source: ":root{--md-dark-bg:#30393e;--md-dark-text:#afafaf;--md-dark-tbl:#15191f}.markdown-body{box-sizing:border-box;padding:45px;cursor:pointer}.dark .markdown-body{color:var(--md-dark-text)}.dark .markdown-body blockquote,.dark .markdown-body h1,.dark .markdown-body h2,.dark .markdown-body table td,.dark .markdown-body table th{border-color:var(--md-dark-bg)}.dark .markdown-body code,.dark .markdown-body hr,.dark .markdown-body pre{background-color:var(--md-dark-bg)}.dark .markdown-body table tr:nth-child(2n){background-color:var(--md-dark-tbl)}.dark .markdown-body table tr{background-color:transparent}.md-text-container{border-radius:12px;font-family:Cambria}.dark.md-text-container{background-color:#222831}.light.md-text-container{background-color:#efefef}.md-textarea{background-color:transparent;border:none;outline:0;width:-webkit-fill-available;width:-moz-available;padding:15px 45px}.dark .md-textarea{color:#c4c4c4}.light .md-textarea{color:#000!important}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-2c017a49";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installEditableMarkdown(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('EditableMarkdown', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;