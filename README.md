> # 移动端开发说明

## Build Setup

``` bash
# 安装依赖
npm install

# 运行项目
npm run dev

# 打包文件
npm run build

```

### UI规范

``` bash
1、rem布局，整屏宽等于12rem。
2、大小为1px的元素不要使用rem，直接用px。
3、字体大小不要使用rem,直接用px,最小字体为12px;
4、多栏多列布局优先使用百分比%或是display:flex
5、使用渐变、纯色等设计页面，避免大量使用图片。
6、能用CSS3体现的图片，尽量使用CSS3，如圆角按钮，渐变背景等。
7、商品列表中的图片要采用懒加载。
8、除公共组件外，每个vue文件里的样式表都要用scope来私有化
9、UI框架采用饿了么出品 element-ui 和 mint-ui
10、公共样式：见App.vue

注：规范只列举了适配方式，无论用何种方式，需要保证在不同比例、不同尺寸的手机上，测试微信、手Q、safari、UC等主流浏览器。无明显错位、变形。

```

### 数据管理
``` bash
使用vuex管理数据
# 引入vuex
import store from '../store'

# 公用数据存储位置
统一放在 src/store 目录下的 state.js 文件中

# 调接口
统一放在 src/store 目录下的 actions.js 文件中

# 获取数据
统一放在 src/store 目录下的 mutations.js 文件中


详细使用教程请见API文档 ：https://vuex.vuejs.org/zh/api/
```

### 相关文件目录
``` bash
# axios配置文件以及拦截器
src 目录下的 axiosPath.js 文件

# 图片
src/assets/images 目录下

# 图标
src/assets/icons 目录下

# 公共 CSS 样式表
src/assets/css 目录下

# 页面文件
src/page 目录下

# 公共组件
src/components 目录下

# 路由配置文件
src/router 目录下的 index.js文件

# 语言数据文件
src/assets/language 目录下

# 国家区号数据文件
src/assets/country_code 目录下

# 工具类
src/utils文件夹下（如：cookie、toast...）

# cookie 的引用 
再需要使用cookie操作的文件下 import { setCookie, getCookie, removeCookie } from './utils/cookies';

# 关于 toast
为全局使用方便， toast放在vue原型中。
使用示例：this.toast.success("success");
这里以成功状态为例，更多方法见 src/utils/toast 文件夹下的 toast.vue 文件。

# 关于 MD5
为全局使用方便， MD5放在vue原型中。
使用示例：this.$md5('hello');

# 图片懒加载
使用示例：<img v-lazy="item.sellerLogoPath">

# 微信标题
路由文件中设置
使用示例：
    meta: {
        title: current_title.all  //对应的标题数据在语言数据文件中
    }

注：如需引入本地库文件，请存放在 static 目录下；
    安全起见，所有js语句要以分号结尾（避免自动整理代码格式出现代码错乱）

```

### 上传前准备
``` bash
1、所有图片均要压缩（图片压缩参考地址：https://tinypng.com/）。

```
