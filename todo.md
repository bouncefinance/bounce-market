FAN-340

- 时间选择器大问题
  - 月份的枚举（需要考虑多语言） √
  - 如果选择的月没有选择的日，那么重置成 1 √
  - 手机端年月日间距和展示问题
  - time piker √
  - 时间错误提示
    - 好像不会出现错误 √
  - 选中后的样式 √
    - 数据传递 √
      - react-final-form https://codesandbox.io/s/z9525?file=/index.js √
  - 接口对接(API 接口) √
    - 不需要 √
  - 再次点击时间窗口，时间不应该重置 √
  - 合约对接 √
    - rinkeby √
    - bsc √
      - bsc 处理速度很慢，又贵
    - heco ×
    - 线上环境修改 ×
  - 检查是否除了 put on 需要改合约后，其他的要不要改
    - 看到很多地方用到了 getFixedSwapContract 函数
    - ark 说还有手续费配置合约 ×
- 时间选择器小问题 ×
  - 过去时间不可选择 ×
  - 点击阴影不可关闭 ×
- put on 会有一个 loading 出现。。很丑 √
- 后台管理系统对接 rinkeby ×
- 取消定时
- 倒计时
  - 链上时间和本地时间同步问题

Rinkeby 测试网:
BounceFixedEndEnglishAuctionNFTV2 0xFdd9f9e38ed530372175f6e02403e355A8Aa2881
BounceNFTV2 0xd58bdfd241f8F96425f94bF1F2F66FFfAf31ee4f

FAN-115

- web3 实例 √
- 和 setAccount 绑定 √
- 多调用优化 √
- 抽出公共的 token √
- 被公共影响的页面异常检查 √
  - profile items 异常 √
    - 之前是连接钱包后获取一些个人信息 然后存储起来 √
  - sage 全局 connect √
  - putResolve setAccount √
  - Header 报错 ×
- 退出登录 √
  - 清理数据 √
  - localStorage.clear() √
  - 再次登陆后是否状态正常问题检查 √

其他

- balance 定时获取
