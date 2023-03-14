module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
    // 'prettier/vue'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  plugins: ['@typescript-eslint'],
  env: {
    es6: true,
    node: true,
    browser: true
  },
  // "off" 或 0：关闭规则
  // "warn" 或 1：开启规则，warn 级别的错误 (不会导致程序退出)
  // "error" 或 2：开启规则，error级别的错误(当被触发的时候，程序会退出)
  rules: {
    'max-classes-per-file': 'off', // 强制每个文件的最大类数.包含多个类的文件通常会导致不易导航和结构不良的代码库。最佳做法是将每个文件限制在一个职责范围内。
    'no-new': 'off', // new 构造函数相关
    'no-shadow': 'off', // 是否避免局部作用域中声明和外部作用域一样的变量
    'no-bitwise': 'off', // 在JavaScript中使用按位运算符是非常罕见的，通常&或|只是键入错误的&&或||，这将导致意外的行为。
    'func-names': 'off', // 命令函数表达式
    'no-console': 'off',
    'no-plusplus': 'off', // 是否允许 ++ -- 操作符号的使用
    'default-case': 'off', // Require default cases in switch statements
    'prefer-template': 'off', // 模版字符串的使用
    'consistent-return': 'off', // 要求return语句始终或从不指定值
    'no-param-reassign': 'off', // 不允许重新分配（赋值）函数参数
    'no-nested-ternary': 'off', // 嵌套三元表达式
    'no-underscore-dangle': 'off', // 标识符中不允许下划线
    'no-unused-expressions': 'off', // 不允许未使用的表达式
    'no-restricted-globals': 'off', // 不允许指定的全局变量 如早期的event是全局的
    'no-use-before-define': 'off', // Disallow the use of variables before they are defined
    'no-await-in-loop': 'off', // 不允许在循环内部等待
    'class-methods-use-this': 'off', // 强制类方法使用this
    'global-require': 'off', // Require require() calls to be placed at top-level module scope
    'prefer-destructuring': ['error', { object: true, array: false }], // 对象/数组解构
    'import/order': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-dynamic-require': 'off',
    'vue/comment-directive': 'off',
    'vue/no-v-html': 'off',
    'vue/attributes-order': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off', // 明确/显示的emits
    '@typescript-eslint/camelcase': 'off', // 驼峰
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off'
  }
}
