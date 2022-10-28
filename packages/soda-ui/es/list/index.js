import List from './src/list';
import ListItem from './src/list-item';
import { installComponent } from '../../install';
// 具名导出
export { List, ListItem };

// 导出插件
export default {
  install: function install(app, options) {
    installComponent(app, List, options);
    installComponent(app, ListItem, options);
  }
};