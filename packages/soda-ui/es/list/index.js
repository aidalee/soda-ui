import List from './list';

// List.install = function (app: App) {
//   app.component(List.name, List)
// }

// export const _ListComponent = List

export { List };
// 导出插件
export default {
  install: function install(app) {
    app.component(List.name, List);
  }
};