import List from './list';
List.install = function (app) {
  app.component(List.name, List);
};
export var _ListComponent = List;
export default List;