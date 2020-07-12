<template>
  <div class="about">
    <!-- 使用一个三目运算符，如果有ID就是编辑分类，不然就是新建分类 -->
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name">请输入名称</el-input>
      </el-form-item>

      <el-form-item label="广告">
        <el-button type="text" @click="model.items.push({})">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <!-- wrap 换行 -->
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :md="24" v-for="(item,i) in model.items" :key="i">

            <el-form-item label="跳转链接(URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>

            <el-form-item label="图片" style="margin-top:0.5rem">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :show-file-list="false"
                :on-success="res => $set(item,'image',res.url)">
                
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(i,1)">Delete</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  //获取ID，实现和router文件的解耦
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        items: []
      }
    };
  },
  methods: {
    // 请求一个接口提交数据
    async save() {
      let res;
      //如果有id,直接进入修改，否则为新建
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }
      console.log(res);

      this.$router.push("/ads/list");

      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },

  //如果是编辑的话需要获取相应分类ID的信息
  //在created里面要有一个方法去获取数据，并且要存在ID
  created() {
    this.id && this.fetch();
  }
};
</script>