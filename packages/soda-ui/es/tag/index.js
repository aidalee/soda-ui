import Tag from './tag';

// Tag.install = function (app: App) {
//   app.component(Tag.name, Tag)
// }

// export const _TagComponent = Tag
// export default Tag
export { Tag };
// 导出插件
export default {
  install: function install(app) {
    app.component(Tag.name, Tag);
  }
};