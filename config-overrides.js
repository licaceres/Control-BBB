// const { override, fixBabelImports, addLessLoader } = require('customize-cra');
 
// module.exports = override(
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: true,
//   }),
//   addLessLoader({
//     javascriptEnabled: true,
//     modifyVars: { 
//         '@primary-color': '#514563',
//         '@layout-header-background': '#A82582',
//         '@layout-trigger-background': '#7E1B61',
//         '@menu-dark-submenu-bg': '#3F0E30',
//     },
//   }),
// );
const darkTheme = require('@ant-design/dark-theme').default;
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      ...darkTheme,
      '@primary-color': '#514563' }
  }),
);