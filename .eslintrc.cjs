/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        // 单引号
        singleQuote: true,
        // 不使用分号
        semi: false,
        // 宽度80字符
        printWidth: 80,
        // 不加对象 | 数组最后的逗号
        trailingComma: 'none',
        // 换行符号不限制 win | mac 不一致
        endOfLine: 'auto'
      }
    ],
    // vue组件名称多单词组成 忽略 index.vue
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index']
      }
    ],
    // props 解构关闭 如果解构会丢失响应式 使用这个可以解决
    'vue/no-setup-props-destructure': ['off'],
    // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
    'no-undef': 'error'
  }
}
