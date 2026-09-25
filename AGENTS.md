# AGENTS.md — P3/P5 双机验收目标示例仓库

本仓库只承载受控验收的小型业务功能。协调器、协议、执行器和它们的验收规则属于
独立的协调系统仓库，不能由本仓库里的业务 agent 修改。

## 目录与归属

| 路径 | 用途 | 可修改者 |
| --- | --- | --- |
| `contracts/` | 冻结的 `user-profile` v1 数据契约 | A 在单独的契约变更流程中维护 |
| `src/provider/`、`tests/provider/` | 数据提供模块及其自身测试 | 分配到 provider 任务的 agent |
| `src/display/`、`tests/display/` | 展示模块及其自身测试 | 分配到 display 任务的 agent |
| `tests/integration/` | 组合验收，不属于任何实现任务的写入范围 | A 独立验收 |
| `acceptance/` | 开工前冻结、只在整合阶段运行的独立验收程序 | A 独立验收 |
| `docs/` | 需求与验收基线 | A；改动必须记录原因 |
| `.local/` | 本机非敏感测试产物 | 本机；Git 忽略、默认保留 |

新增文件按上表放置；模块代码使用英文小写文件名，测试文件以 `.test.js` 结尾。
合同字段和任务 ID 使用既有拼写，不在实现中悄悄改名。

## 任务执行边界

- 每个尝试使用独立 `task/<TASK_ID>/<ATTEMPT_ID>` 分支和独立 worktree。
- 开工前绑定真实的 `base_sha`、`rules_sha`、`contract_sha`、`acceptance_sha`；缺项就停止。
- `write_scope.deny` 优先于 `allow`。提交前用实际 Git diff 核对文件范围。
- provider 任务只能修改 `src/provider/**`、`tests/provider/**`；display 任务只能修改
  `src/display/**`、`tests/display/**`。实现任务不得修改 `AGENTS.md`、`contracts/**`、
  `docs/**`、`tests/integration/**`、`acceptance/**`、`package.json` 或 CI 配置。
- 不通过删除或跳过失败测试来换取通过。结果是否通过由独立组合验收决定。
- 不在本仓库写入密码、Token、登录文件、私钥、`.env` 或原始 Agent 会话。
- 不自动删除 worktree、日志或 `.local/` 历史。确需清理时明确对象后另行批准。

## 验证

使用 Node.js `>=22 <23`。在本仓库根目录运行：

```powershell
npm test
git diff --check
```

本仓库是**本地测试夹具**；首次真实双机联调前还需要独立的远端目标仓库 URL，
并核对远端基线 SHA 与本地一致。不能把本地测试写成真实双机成功。
