<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 同一篇文章有可能属于多个分类 -->
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title">请输入名称</el-input>
      </el-form-item>

      <el-form-item label="詳情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
//富文本编辑器 { VueEditor } 解构
import { VueEditor } from "vue2-editor";
export default {
  //获取ID，实现和router文件的解耦
  props: {
    id: {}
  },

  components: {
    VueEditor
  },

  data() {
    return {
      model: {},
      categories: [] //分类名称的一个属性，一个变量
    };
  },

  methods: {
    //Handle image uploading instead of using default conversion to Base64
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        const formData = new FormData();//先定义一个表单数据，因为要上传数据
        formData.append("file", file);//file是图片二进制格式的字段名，我们自己在admin的index中定义的

        const res = await this.$http.post('upload',formData);//上传的地址是upload ,formData是提交的数据，返回来的结果res
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();//重置上传器
      
    },

    //创建新的article或修改article
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }
      console.log(res);
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },

    //
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`); //需要去写接口
      this.model = res.data;
    },

    //获取公告，新闻，活动等news的儿子，从哪里获取，地址就要改为哪里
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    }
  },

  //created不属于methods里面
  created() {
    this.fetchCategories();
    //&&表示前面条件满足以后再执行后面的方法
    this.id && this.fetch();
  }
};
</script>