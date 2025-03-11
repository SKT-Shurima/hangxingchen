export default {
  arrowParens: 'always',
  endOfLine: 'lf',
  jsxSingleQuote: true,
  printWidth: 120,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  plugins: ['prettier-plugin-tailwindcss', '@prettier/plugin-xml'],
  overrides: [
    {
      files: '*.mdx',
      options: {
        parser: 'markdown',
      },
    },
  ],
}
