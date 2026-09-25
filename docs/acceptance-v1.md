# 独立验收基线 v1

本文件在两个实现任务开工前固定。实现 Agent 不得修改本文件或组合测试。

## provider 自测

- `getUser("u-1")` 同步返回对象 `{ id: "u-1", name: "Ada" }`。
- `id`、`name` 均为非空字符串；输出不使用 `userId` 替代 `id`。
- provider 任务只修改 `src/provider/**` 和 `tests/provider/**`。

## display 自测

- `renderUser({ id: "u-1", name: "Ada" })` 同步返回 `Ada (u-1)`。
- 展示代码读取 `profile.id`，不读取不存在的 `profile.userId`。
- display 任务只修改 `src/display/**` 和 `tests/display/**`。

## 组合验收

- 在固定顺序整合两个真实提交后，调用
  `renderUser(getUser("u-1"))`，结果必须是 `Ada (u-1)`。
- 组合测试在独立验收分支运行，记录输入提交 SHA、组合提交 SHA、树哈希、
  测试退出码和 CI run ID。任何一项缺失均不算通过。
- P5 故障演练在受控分支把 display 对 `id` 的读取改成 `userId`：必须看到
  组合测试失败、主分支未接收错误提交、系统创建返修任务，再由新尝试提交修复。
  不在真实主分支注入故障。

## 当前状态

本文件是验收标准；provider/display 任务、组合测试、故障演练和真实双机调用
尚未执行，不能写成通过。
