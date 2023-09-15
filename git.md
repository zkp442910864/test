
# 自用

- 长列表的时候，需要按`q`进行退出

- 提交
	- 强制提交 `git add -A && git commit --no-verify -m "暂存"`
- 合并指定提交id
    - `git cherry-pick <id>` 提交id
- 列出分支
    - 本地分支 `git branch`
    - 所有分支 `git branch -r`
    - 删除本地分支 `git branch -d <branch_name>`
- 日志查看
    - 当前分支 `git log`
    - 指定条数 `git log -n <number>`
    - 查看其它分支
        - `git log <branch_name>`
        - `git log <remote_name>/<branch_name>`
    - 简化查看 `git log --graph --oneline`
- 合并指定文件夹
    - `git checkout <branch_name> -- <folder_path>`
        - 如果是定位到分支的子级目录，执行命令，<folder_path> 这个路径不用进行指定，使用 `./` 代替
