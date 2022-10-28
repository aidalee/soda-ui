import Button from './src/button';
import { installComponent } from '../../install';
// 具名导出
export { Button };

// 导出插件
export default {
  install: function install(app, options) {
    installComponent(app, Button, options);
  }
};