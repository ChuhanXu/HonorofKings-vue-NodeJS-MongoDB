<template>
  <div class="about">
      <!-- 使用一个三目运算符，如果有ID就是编辑分类，不然就是新建分类 -->
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <!-- native表示原生表单el-form，prevent表示阻止默认提交防止跳转页面 -->

    <!-- news的子分类，上级为news， 做成下拉菜单的形式-->
     <el-form-item label ="上级分类">   
         <el-select v-model="model.parent">
             <!-- el-option 三个参数 key是为了提高性能 label 选项栏显示的内容 value 真正选中的值是id，因为我们需要把id存入数据库 -->
             <!-- 如果不是id，关联名字的话，当修改名字后，可能关联就取消了 -->
             <!-- v-for for循环 --> 
             <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id">
             </el-option>
        </el-select>
     </el-form-item>


     <el-form-item label ="名称">   
         <el-input v-model="model.name">请输入名称</el-input>
     </el-form-item>

     <el-form-item >   
         <el-button type="primary" native-type="submit">保存</el-button>
     </el-form-item>

    </el-form>  
  </div>
</template>
<script>
export default {
    //获取ID，实现和router文件的解耦
    props:{
        id:{

        }

    },
    data(){
        return{
            model:{},
            parents:[]
        }
    },
    methods:{
        // 请求一个接口提交数据
       async save(){
           let res
           //如果有id,直接进入修改，否则为新建
           if(this.id){
                res = await this.$http.put(`rest/categories/${this.id}`,this.model)
           }else{
                res = await this.$http.post('rest/categories',this.model)
           }
           console.log(res)
           //发送请求到categories接口，参数为this.model
           //将异步的回调函数的方法换成async同步的
           
           
           //跳转到list页面
           this.$router.push('/categories/list')
           //跳转页面后提示保存成功了
           this.$message({
               type:'success',
               message:'保存成功'
           })

       },
       async fetch(){
        const res = await this.$http.get(`rest/categories/${this.id}`)//需要去写接口
        this.model = res.data
    },
    //获取父亲的选项，数据肯定是从数据库通过接口过来的，数据就是分类列表的数据，可以直接使用分类列表的接口，也可以专门写接口
    async fetchParents(){
        const res = await this.$http.get(`rest/categories`)//需要去写接口
        this.parents= res.data//获得的是父级的数据，而不是选项
    }
    },
    
    //如果是编辑的话需要获取相应分类ID的信息
    //在created里面要有一个方法去获取数据，并且要存在ID
    created(){
        this.fetchParents()
        //&&表示前面条件满足以后再执行后面的方法
        this.id && this.fetch()
    }

    
}
</script>