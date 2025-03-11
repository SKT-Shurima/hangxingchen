import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

// 使用更简单的配置方式，减少潜在的模块解析问题
const base = antfu({
  react: true,
  // 暂时禁用 perfectionist，因为它可能是问题的来源
  perfectionist: false,
})

base.append([eslintPluginPrettierRecommended, eslintConfigPrettier])

base.append([
  {
    name: 'next',
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-array-index-key': 'warn',
      'react-dom/no-missing-button-type': 'warn',
    },
  },
])

base.overrideRules({
  'antfu/if-newline': 'off',
  // 移除 perfectionist 规则
  // 'perfectionist/sort-imports': 'warn',
})

export default base
