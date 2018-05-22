# vortex-calendar

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![npm license][license-image]][license-url]

[npm-image]: https://img.shields.io/npm/v/vortex-calendar.svg?style=flat-square
[npm-url]: https://npmjs.org/package/vortex-calendar
[travis-image]: https://img.shields.io/travis/YutHelloWorld/calendar.svg?style=flat-square
[travis-url]: https://travis-ci.org/YutHelloWorld/calendar
[node-image]: https://img.shields.io/badge/node.js-%3E=_6.11-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/vortex-calendar.svg?style=flat-square
[download-url]: https://npmjs.org/package/vortex-calendar
[license-image]: https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square
[license-url]: https://github.com/YutHelloWorld/calendar/blob/master/LICENSE
A light calendar 📅 . (gzipped: 2.45K)

![](./.Github/calendar.gif)

👉 [Online](https://yuthelloworld.github.io/calendar/)

## Installation


```bash
# npm install vortex-calendar
yarn add vortex-calendar
```

## Usage

```JS
import Calendar from 'vortex-calendar'
import React from 'react'
import {render} from 'react-dom'

const MOUNT_NODE = document.getElementById('root')
render(<Calendar
  minDate="2017-06-01"
  locale="zh"
  onSelect={(v) => console.log(v)}
/>, MOUNT_NODE)
```

## Prop Types

|Property|Type|Default|Description|
|:---:|:---:|:---:|:---:|
|minDate|String ('YYYY-MM-DD')| | The minimum date that is selectable|
|maxDate|String ('YYYY-MM-DD')| | The maximum date that is selectable|
|onSelect|Function| | Callback invoked after date select|
|locale|String| 'en'| By default, calendar comes with the English locale.<br>You can set 'zh' for Chinese.|

## Contributing

- Clone this repository.

  ```bash
  git clone https://github.com/YutHelloWorld/calendar.git <your project name>
  cd <your project name>
  ```

- Install all dependencies by `yarn` or `npm i`.Then code in `./src`.

- Run `yarn build` && `yarn start` to see changes with demo.

- Pull your request.

## License

The MIT License.

-------------------------
🌟🌟🌟这里首先要感谢
```
https://github.com/YutHelloWorld/calendar.git
```
如果有需要和原作者一样的需求可以去上面这个地址参考项目代码。


以下是我在原作者开发的基础上做的一些组件的更改和调整，希望有需要的朋友可以进行参考使用：
![](./.Github/calendar_vonmo.gif)


 为了方便React开发者识别项目代码，我把需要的地方都更改成.jsx的文件格式了。
 如果不想在本地添加`yarn` 插件。也可以无需安装`yarn add vortex-calendar`进行本地的开发。

 - 项目中四个地方：
 1. example/src/index.jsx // 页面去调用`Calendar`这个插件的地方
 2. src/assets   // 日历切换日期的image和`Calendar`样式表
 3. src/utils    // 页面日期格式转化
 4. src/Calendar.jsx // 课程日期主界面

 把这四个文件抽离出来放到自己的项目文件中，然后运行你自己的本地服务应该就没问题了。
