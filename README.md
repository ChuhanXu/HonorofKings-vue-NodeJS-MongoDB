# HonorofKings-vue-NodeJS-MongoDB
## 一 入门
1. 项目介绍
2. 工具安装和环境搭建
3. 初始化项目
## 二 管理后台
### 1. 基于Element UI的后台管理基础界面搭建(安装插件Element vue add element/ vue add router)
1. 在admin的views里新建一个Main.vue,将Element UI里的后台框架放进去，要自己加一个<template></template>标签
2. 修改router里的index.js文件
3. 创建分类(多层级)
### 2. 修改分类
1. 在分类列表中加按钮或链接
2. 修改的方法也写在新建的方法中，用同一个地址，但是不同的接口，在此方法中加一个if语句来判断到底属于修改还是新建
3. 在server route/admin.index 文件中添加接口
### 3. 删除分类
1. 在Category list中新建按钮delete
2. 在IU element 里找确认对话框元素当作确认删除，前端
3. 写 delete 接口
### 4. 子分类
1. 
### CRUD 接口（保证接口的通用性和扩展性）


