
# Windows PowerShell

### 允许运行脚本

- 注意 PowerShell 脚本执行策略禁止运行脚本

##### 步骤

1. 以管理员身份打开 PowerShell。
2. 设置执行策略为 RemoteSigned 或 Bypass，允许运行本地脚本: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
    或者使用更开放的选项: `Set-ExecutionPolicy Bypass -Scope CurrentUser`
3. 运行命令后，PowerShell 会提示确认更改，输入 `Y` 确认。
4. 关闭 PowerShell，然后重新打开即可。

##### 注意

- `RemoteSigned` 允许本地脚本运行，但从网上下载的脚本需要签名。这是推荐的安全设置。
- 如果您不想修改执行策略，也可以在单次会话中绕过执行策略运行配置文件： `powershell -ExecutionPolicy Bypass -File $PROFILE`
- 设置完成后，重新加载 PowerShell 应用即可正常加载 PSReadLine 和其他配置。

### Windows PowerShell 实现clink记录功能

- 在 Windows PowerShell 中，可以使用 PSReadLine 模块来获得类似 clink 的功能。PSReadLine 提供了许多实用的命令行增强功能，包括：
    1. 自动完成和建议：自动补全文件路径、命令和参数。
    2. 命令历史记录：通过上下箭头查看和重新运行历史命令。
    3. 语法高亮：彩色显示命令行的不同部分。
    4. 快捷键：支持与 Bash 类似的快捷键，例如 Ctrl + R 进行历史搜索。

1. 检查 PSReadLine 版本
    ```bash
        Install-Module PSReadLine -Force -SkipPublisherCheck
    ```

2. 启用 PSReadLine 并自定义快捷键
    ```bash
        # 打开 PowerShell 配置文件
        notepad $PROFILE

        # 在配置文件中添加以下内容：

        # 导入 PSReadLine 模块
        Import-Module PSReadLine

        # 设置命令历史搜索快捷键
        Set-PSReadLineKeyHandler -Key Ctrl+r -Function HistorySearchBackward
        Set-PSReadLineKeyHandler -Key Ctrl+s -Function HistorySearchForward

        # 启用语法高亮
        Set-PSReadLineOption -Colors @{
            Command            = 'Yellow'
            Parameter          = 'Green'
            Operator           = 'Cyan'
            Variable           = 'Magenta'
            String             = 'White'
            Comment            = 'DarkGray'
            Keyword            = 'Blue'
        }
    ```

3. 启用命令预测功能（PowerShell 7.1+）
    - 在 PowerShell 7.1 及更高版本中，可以启用命令预测功能，以获得更智能的命令建议：
    ```bash
        Set-PSReadLineOption -PredictionSource HistoryAndPlugin
        Set-PSReadLineOption -PredictionViewStyle ListView
    ```
