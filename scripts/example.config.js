import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import hljs from 'highlight.js'
import vueJsx from '@vitejs/plugin-vue-jsx'

function getSource(source, type) {
  const regex = new RegExp(`<${type}[^>]*>`)
  let openingTag = source.match(regex)

  if (!openingTag) return ''
  else openingTag = openingTag[0]

  return source.slice(
    source.indexOf(openingTag) + openingTag.length,
    source.lastIndexOf(`</${type}>`)
  )
}

function splitCode(code) {
  const script = getSource(code, 'script').replace(/export default/, 'return ')
  // const template = getSource(code, 'template');
  const mdContent = getSource(code, 'div')

  return { script, mdContent }
}

function markdownCardWrapper(htmlCode) {
  let { script, mdContent } = splitCode(htmlCode)

  const group = mdContent
    .replace(/<h3/g, ':::<h3')
    .replace(/<h2/g, ':::<h2')
    .replace(/<h1/g, ':::<h1')
    .replace(/<table/g, ':::<table')
    .split(':::')

  let inds = []
  let copy = group.map((item, index) => {
    if (group[index + 1] && group[index + 1].indexOf('<table') !== -1) {
      inds.push(index)
      return item + group[index + 1]
    }
    return item
  })

  inds.map((item, index) => {
    copy.splice(item + 1 - index, 1)
  })

  let result = copy
    .map(fragment => {
      if (fragment.indexOf('<h3') !== -1) {
        return `<div class="so-doc-card">${fragment}</div>`
      }
      return fragment
    })
    .join('')
  result = `<script setup lang="ts">${script}</script>
              <template><div class="so-doc-markdown-body">${result}</div></template>`
  return result
}

function markdownHighlight(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    // https://github.com/highlightjs/highlight.js/issues/2277
    return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
  }
  return ''
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    Markdown({
      wrapperClasses: 'so-doc-markdown-body',
      transforms: {
        after: markdownCardWrapper
      },
      markdownItOptions: {
        typographer: false, // https://markdown-it.github.io/markdown-it/#MarkdownIt
        highlight: markdownHighlight
      }
      // markdownItSetup(md) {
      //   const require = createRequire(import.meta.url);
      //   const { slugify } = require('transliteration');
      //   const markdownItAnchor = require('markdown-it-anchor');
      //   markdownLinkOpen(md)
      //   md.use(markdownItAnchor, {
      //     level: 2,
      //     slugify
      //   })
      // }
    })
  ]
})
