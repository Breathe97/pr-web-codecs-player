## 配置 protobuf

### 使用 protobufjs-cli 生成

```bash
npm i -g protobufjs-cli

```

### 在根目录执行以下命令生成 compiled.js 和 compiled.d.ts

```bash

pbjs -t static-module -w es6 -o src/protos/compiled.js src/protos/modules/*.proto

pbts -o src/protos/compiled.d.ts src/protos/compiled.js

```
