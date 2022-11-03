import Tag from './tag';
Tag.install = function (app) {
  app.component(Tag.name, Tag);
};
export var _TagComponent = Tag;
export default Tag;