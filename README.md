# LoadTimeTest

### 测试分别加载文件 和 加载zip包后用JsZip解压并加载文件

##### 

##### 测试结果表格

|      文件个数/方法      | 普通加载 | zip包解压加载 |
| :---------------------: | :------: | :-----------: |
|   2张图片/2个json文件   |    4     |       9       |
|  10张图片/10个json文件  |    10    |      11       |
|  20张图片/20个json文件  |    18    |      14       |
|  50张图片/50个json文件  |    39    |      18       |
| 150张图片/150个json文件 |   111    |      36       |
| 384张图片/390个json文件 |   254    |      83       |
