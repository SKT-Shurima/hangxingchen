module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['prettier', 'unused-imports'],
  rules: {
    'prettier/prettier': 'error',
    'unused-imports/no-unused-imports': 'error',
    '@next/next/no-img-element': 'error',
    '@next/next/no-duplicate-head': 'off',
    '@next/next/no-page-custom-font': 'off',
  },
}
