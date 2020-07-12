<template>
<el-container style="height: 100vh">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1', '3']">

      <el-submenu index="1">
        
        <template slot="title"><i class="el-icon-message"></i>内容管理</template>

        <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/categories/create">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-menu-item-group>

         <el-menu-item-group>
          <template slot="title">物品</template>
          <el-menu-item index="/items/create">新建物品</el-menu-item>
          <el-menu-item index="/items/list">物品列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">英雄</template>
          <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
          <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">文章</template>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">广告位</template>
          <el-menu-item index="/ads/create">新建广告位</el-menu-item>
          <el-menu-item index="/ads/list">广告位列表</el-menu-item>
        </el-menu-item-group>

      </el-submenu>

    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Tom</span>
    </el-header>
    
    <el-main>
        <router-view></router-view>
      <!-- <el-table :data="tableData">
        <el-table-column prop="date" label="Date" width="140">
        </el-table-column>
        <el-table-column prop="name" label="Name" width="120">
        </el-table-column>
        <el-table-column prop="address" label="Address">
        </el-table-column>
      </el-table> -->
    </el-main>
  </el-container>
</el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>