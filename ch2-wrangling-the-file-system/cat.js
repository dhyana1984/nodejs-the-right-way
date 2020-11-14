#!/usr/bin/env node

//#!/usr/bin/env node 表示可以直接运行
//但是还需要chmod +x cat.js 修改文件可执行权限
'use strict'
require('fs').createReadStream(process.argv[2]).pipe(process.stdout)