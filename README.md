# P3/P5 双机验收目标示例仓库

这是一个与协调系统分开的**本地业务代码仓库夹具**。它用同一份冻结契约，
让 A/Codex 实现数据提供模块、B/OpenCode 实现展示模块，再由 A 独立组合验收。

当前仓库仅包含规则、契约和验收基线；provider/display 实现尚未创建。
它尚无远端 URL，不能当成真实双机联调完成证据。

## 固定契约

`contracts/user-profile.v1.json` 规定 `UserProfile` 必须含字符串 `id` 与 `name`。

- provider：`src/provider/user-profile.js` 导出同步函数 `getUser(id)`；对 `u-1`
  返回 `{ id: "u-1", name: "Ada" }`。
- display：`src/display/render-user.js` 导出同步函数 `renderUser(profile)`；对上述
  对象返回 `Ada (u-1)`。

两模块只依赖契约，不相互修改文件。独立组合验收要求真实调用 provider 的输出并
交给 display；`id` 与 `userId` 的不一致必须失败，不能由单方测试代替组合测试。

## 结构与验证

目录归属、命名和清理规则见 `AGENTS.md`；验收细则见 `docs/acceptance-v1.md`。

```powershell
npm test
git diff --check
```

本地基线测试只校验冻结契约。完成两个实现任务后，在独立验收阶段运行：

```powershell
node acceptance/run.mjs .
```

该命令必须真实调用两个模块，并记录输入 SHA、CI run、整合 SHA 和树哈希。
