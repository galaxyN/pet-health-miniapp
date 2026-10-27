# 宠物健康小程序（pet-health-miniapp）

一款面向宠物主人的健康管理微信小程序，涵盖**宠物档案管理、宠物用品商城、宠物医院/美容机构预约、订单管理、用户中心**等核心功能。基于 [TDesign 微信小程序组件库](https://github.com/Tencent/tdesign-miniprogram) 与 TDesign 零售模板脚手架搭建，采用原生 JavaScript + WXSS 开发。

## :high_brightness: 功能概览

| 模块 | 说明 |
| --- | --- |
| 🏠 首页 | 轮播图、搜索、宠物信息卡片展示、商品推荐列表 |
| 🐾 宠物管理 | 宠物档案列表，支持添加、编辑、删除宠物（名称/品种/年龄/体重/头像等） |
| 🛍️ 宠物商城 | 商品分类、商品列表搜索、商品详情、规格选择、购物车、确认下单 |
| 🏥 机构服务 | 宠物医院、美容机构列表与详情，支持按类型筛选、日期时段预约 |
| 💬 评价系统 | 机构评价列表查看与发表评价 |
| 📦 订单中心 | 订单列表、订单详情、订单状态展示 |
| 👤 用户中心 | 微信头像昵称登录、注册、个人资料维护、收货地址管理 |

底部导航采用自定义 tabBar，包含：**首页 / 商城 / 宠物 / 订单 / 我的** 五个入口。

## :pushpin: 技术栈

- **框架**：微信小程序原生框架（JavaScript + WXML + WXSS）
- **UI 组件库**：[tdesign-miniprogram](https://www.npmjs.com/package/tdesign-miniprogram) `1.9.5`
- **工具库**：`dayjs`（时间格式化）、`tslib`
- **工程化**：ESLint + Prettier + Husky + lint-staged + Commitlint + Commitizen（Angular 规范提交）
- **后端对接**：`wx.request` 统一封装（`utils/request.js`），自动携带 Bearer Token，401 失效自动引导重新登录

## :open_file_folder: 项目结构

```
|-- pet-health-miniapp
    |-- app.js                  // 应用入口，初始化地址簿等全局数据
    |-- app.json                // 全局配置（页面路由、tabBar、分包）
    |-- common                  // 公共逻辑（小程序更新管理器）
    |-- components              // 公共组件（goods-list、goods-card、price、filter、swipeout、webp-image、load-more 等）
    |-- config                  // 全局配置（useMock 开关、CDN、地区数据）
    |-- custom-tab-bar          // 自定义底部导航栏
    |-- images                  // 本地静态图片资源
    |-- model                   // mock 数据源（useMock 时使用，可作为后续数据适配层）
    |-- pages
    |   |-- home                // 首页
    |   |-- pet                 // 宠物档案管理（列表、编辑）
    |   |-- store               // 宠物商城（列表、商品详情、购物车、确认订单）
    |   |-- order               // 订单列表与详情
    |   |-- login               // 登录、注册、引导页
    |   |-- user                // 个人中心、收货地址管理
    |   |-- comments            // 机构评价与发表评价
    |   |-- organization        // 分包：宠物医院/美容机构列表、详情、预约
    |   |-- coupon              // 分包：优惠券列表、详情、活动商品
    |   |-- promotion           // 分包：营销活动页
    |-- services                // 接口请求层（auth、pet、shopping、organization、comments、order、address 等）
    |-- style                   // 公共样式与 iconfont
    |-- utils                   // 工具库（request 封装、baseConfig、util、地址解析等）
```

## :electric_plug: 后端 API

后端服务地址配置在 `utils/baseConfig.js`：

```js
const baseUrl = 'http://117.72.219.186:7001';
```

主要接口模块（均以 `/api` 为前缀）：

| 模块 | 接口示例 |
| --- | --- |
| 认证 | `POST /api/auth/wxLogin`、`POST /api/auth/register`、`GET /api/account/profile` |
| 宠物档案 | `GET /api/pets/user/{id}`、`POST /api/pets/create`、`PUT/DELETE /api/pets/{id}` |
| 商城 | `GET /api/shopping/categories`、`GET /api/shopping/products`、`/api/shopping/cart`、`/api/shopping/orders` |
| 机构服务 | `GET /api/orgs`、`POST /api/appointments` |
| 评价 | `GET/POST /api/organization-reviews` |
| 地址 | 地址簿增删改查接口 |

请求封装说明（`utils/request.js`）：

- 自动从本地存储读取 token，除登录接口外统一附加 `Authorization: Bearer <token>` 请求头；
- HTTP 2xx 且业务码 `code === 200` 时视为成功；
- 业务码 `401` 时弹窗提示登录失效并跳转登录页。

## :hammer: 快速开始

1. 克隆本项目

   ```bash
   git clone <repo-url>
   cd pet-health-miniapp
   ```

2. 安装依赖

   ```bash
   npm install
   ```

3. 使用微信开发者工具导入项目根目录

4. 在开发者工具中执行 **构建 npm**（工具栏 → 构建 npm）

5. 在 `utils/baseConfig.js` 中配置后端服务地址，即可运行

### 常用脚本

```bash
npm run lint        # ESLint 检查并自动修复
npm run check       # 执行自定义 ESLint 校验脚本
npm run changelog   # 按 Angular 规范生成 CHANGELOG
npx cz              # Commitizen 交互式规范化提交
```

## :art: 代码风格

- `ESLint` + `Prettier` 统一代码风格，`husky` + `lint-staged` 在提交前自动格式化；
- 提交信息通过 `commitlint` 校验，需符合 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 规范（如 `feat:`、`fix:`）。

## :page_facing_up: 数据模拟说明

项目保留了模板的 mock 能力：`config/index.js` 中的 `useMock` 开关可控制 `services` 层返回 mock 数据（来自 `model/` 目录）或真实接口数据。接入真实 API 后，`model/` 可反转为数据适配层，将后端数据转换为既有数据结构，业务层无需改动。详见 [mock.md](./mock.md)。

> 当前大部分核心模块（认证、宠物、商城、机构、评价、预约）已接入真实后端接口。

## :page_with_curl: 开源协议

[MIT](./LICENSE)
