commit message Angular 规范
---------------------------

Commit message 的格式

Commit message 都包括三个部分：Header，Body 和 Footer。

header是必须的，其他非必需

Header只有一行，包含type scope和subject
---------------------------------------

格式：

```js
 <type>(<scope>): <subject>
```

1.type

-	feat 新功能
-	fix 修补bug
-	docs 文档
-	style 格式
-	refacto 重构
-	test 增加测试
-	chore 构建过程或者辅助工具的变动 >feat和fix 肯定会出现在change log中 其他不建议放

2.scope

说明提交影响的范围,比如数据层，控制层，视图层等，视项目而定,

3.subject

简短描述 原则： - 不超过50字符 - 动词开通以第一人称 - 第一个字母小写 - 结尾不加句号

Body
----

详细描述 可以分为多行

Footer
------

分两种情况，不兼容变动和关闭Issue

1.	Footer则以BREAKING CHANGE开头 后边是变动的描述以及变动的理由和迁移方法
2.	关闭Issue Closes #234

Revert
------

如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header。

工具的使用 1.Commitizen 2.validate-commit-msg 3.conventional-changelog
