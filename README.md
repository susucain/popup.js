# popup.js

propup.js为一个弹出层模拟插件，内置两套皮肤，可模拟浏览器内置的弹出层方法，`alert()`，`confirm()`和`prompt()`。

## Demo

[demo](https://susucain.github.io/popup.js/)

## 依赖

[jquery](https://github.com/jquery/jquery) [jquery-ui](https://github.com/jquery/jquery-ui) [popup.css](https://raw.githubusercontent.com/susucain/popup.js/master/dist/popup.min.css)

## 基础使用

使用require.js：

```javascript
require(['popup'], function (popup)) {
    // code        
}
```

使用script标签：

```javascript
<script type="text/javascript" src="../dist/popup.min.js"></script>
<script type="text/javascript">

// code

</script>
```

## API

### popup.alert()

```javascript
// 模拟alert弹出层
popup.alert({
    // 弹出层标题，默认为“系统消息”
    title: '系统消息',
  
    // 弹出层文本内容
    content: 'welcome',
  
    // 弹出层宽度，默认自适应
    width: 300,
  
    // 弹出层高度，默认自适应
    height: 200,
  
    // 是否有close按钮，默认为true
    hasCloseBtn: true,
  
    // alert按钮文本内容，默认为“确定”
    alertBtnText: 'OK',
  
    // 是否可拖动，默认为true
    isDraggable: true,
  
    // 拖动手柄，默认为.window-header
    dragHandler: '.window-header',
  
    // 设置皮肤，默认为.window-default
    skin: 'window-default'
})

// 挂载在close按钮上的事件
.on('close', function () {
    alert('close');
})

// 挂载在alert按钮上的事件
.on('alert', function () {
    alert('alert');
});
```

### popup.confirm()

```javascript
// 模拟confirm弹出层
popup.confirm({
    content: 'Are you sure?', 
  
    // confirm按钮文本内容，默认为“确定”
    confirmBtnText: '确定',
  
    // cancle按钮文本内容，默认为“取消”
    cancleBtnText: '取消',
})

//挂载在cancle按钮上的事件
.on('cancle', function () {
    alert('Are you sure want to canle?');
})

// 挂载在confirm按钮上的事件
.on('confirm', function () {
    alert('You can do some things')
})

```

### popup.prompt()

```javascript
// 模拟prompt弹出层
popup.prompt({
    width: 350,
    height: 200,
    content: 'please input some strings',
    title: '输入',
    hasCloseBtn: true,
    dragHandler: '.window-header',
  
    // prompt按钮的文本内容
    promptBtnText: 'OK',
    skin: 'window-moon'
})

// 挂载在prompt按钮上的事件，data为文本框中输入的内容
.on('prompt', function (data) {
    alert(data);
});
```

## 预览

### popup.alert() 默认皮肤

![popup.alert 默认皮肤](https://github.com/susucain/popup.js/blob/master/test/img/preview-alert.JPG)

### popup.confirm() 默认皮肤

![popup.confirm 默认皮肤](https://github.com/susucain/popup.js/blob/master/test/img/preview-confirm.JPG)

### popup.prompt() moon皮肤

![popup.prompt moon皮肤](https://github.com/susucain/popup.js/blob/master/test/img/preview-prompt.JPG)