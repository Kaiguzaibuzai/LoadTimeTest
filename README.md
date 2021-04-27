# LoadTimeTest

### 测试分别加载文件 和 加载zip包后用JsZip解压并加载文件

##### 

##### 测试结果表格(单位 ms)

|      文件个数/方法      | 普通加载 | zip包解压加载 | zip包解压加载(关闭浏览器缓存) |
| :---------------------: | :------: | :-----------: | :---------------------------: |
|   2张图片/2个json文件   |    4     |       9       |              9.5              |
|  10张图片/10个json文件  |    10    |      11       |             11.2              |
|  20张图片/20个json文件  |    18    |      14       |             14.4              |
|  50张图片/50个json文件  |    39    |      18       |              23               |
| 150张图片/150个json文件 |   111    |      36       |              47               |
| 384张图片/390个json文件 |   254    |      83       |             107.5             |







##### 2)测试结果表格(单位 ms)（关闭浏览器缓存）（gltf模型：.bin&.gltf）

| 文件个数/方法 | 普通加载 | zip包解压加载 |
| :-----------: | :------: | :-----------: |
| 39个gltf模型  |   9.94   |     15.82     |
| 78个gltf模型  |  18.78   |     27.18     |
| 149个gltf模型 |  37.79   |     41.16     |
| 377个gltf模型 |  90.71   |     81.03     |
| 607个gltf模型 |  148.85  |    121.83     |



（测试结果为 测试五次 去掉最大最小取平均值）

（注：每次测量时 zip包解压方法测得时间会出现比平均时间大很多或小很多的值，但整体还算平稳，普通加载时间比较平稳）