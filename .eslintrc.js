// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // "eslint:recommended",
    // "plugin:vue/vue3-essential",
    // "plugin:@typescript-eslint/recommended"
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: ['examples/docs/components/**/demo.vue', 'examples/layout/**.vue'], // 匹配views和二级目录中的index.vue
      rules: {
        'vue/multi-word-component-names': 'off'
      } //给上面匹配的文件指定规则
    }
  ],
  // parser: "@typescript-eslint/parser",
  parser: 'vue-eslint-parser',
  // parserOptions: {
  //   ecmaVersion: "latest",
  //   sourceType: "module",
  // },
  parserOptions: { parser: '@typescript-eslint/parser' },
  plugins: ['vue', '@typescript-eslint'],
  rules: {}
}
