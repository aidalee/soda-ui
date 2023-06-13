import Button from './button';

// Button.install = function (app: App) {
//   app.component(Button.name, Button)
// }

// export const _ButtonComponent = Button

// export default Button

// 具名导出
export { Button };

// 导出插件
export default {
  install: function install(app) {
    app.component(Button.name, Button);
  }
};