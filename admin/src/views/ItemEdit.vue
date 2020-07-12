<template>
    <div class="about">
      <!-- 使用一个三目运算符，如果有ID就是编辑分类，不然就是新建分类 -->
        <h1>{{id?'编辑':'新建'}}物品</h1>
        <el-form label-width="120px" @submit.native.prevent="save">

            <el-form-item label ="名称">   
                <el-input v-model="model.name">请输入名称</el-input>
            </el-form-item>


             <!-- 图片上传模块 -->
                <!-- 两个组件 一个图片，一个上传图标，如果有图片就上传图片没有上传图标 -->
                <!--action （上传的接口地址是什么）一个地址 上传图片是当我们选择一个图片后，提交一个if请求，发到后端的某个接口，这个接口保存图片
                保存完以后并返回给客户端一个完整的url图片的网址，前端拿到响应后将图片展示出来  -->
                <!-- on-success 上传成功之后要做什么 将返回值里的图片地址赋值给model.icon afterUpload一个方法  -->
                <!-- action前加:表示动态绑定 -->
                <!-- baseURL:'http://localhost:3000/admin/api'用不了，需要在后端写一个upload的接口 -->
            <el-form-item label ="图标">
               <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :show-file-list="false"
                :on-success="afterUpload"
                >
                <img v-if="model.icon" :src="model.icon" class="avatar"><!--图片  -->
                <i v-else class="el-icon-plus avatar-uploader-icon"></i> <!-- 上传图标 -->
                </el-upload>
            </el-form-item>


            <el-form-item >   
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>


        </el-form> 
    </div>
</template>



<script>
    export default {
        props:{
            id:{}
        },

        data(){
            return{
                model:{}
            }
        },

    methods:{

        afterUpload(res){
            this.$set(this.model,'icon',res.url)//set 在model上加一个icon属性，赋值为res.url
           //this.model.icon=res.url
        },

        
        async save(){
           let res
            if(this.id){
                res = await this.$http.put(`rest/items/${this.id}`,this.model)
            }else{
                //rest后面的都可以找到，相当于一个resources
                res = await this.$http.post('rest/items',this.model)
           }

           console.log(res)
           this.$router.push('/items/list')
          
           this.$message({
               type:'success',
               message:'保存成功'
           })
        },

       async fetch(){
            const res = await this.$http.get(`rest/items/${this.id}`)
            this.model = res.data
        }
    },
    
    created(){
        this.id && this.fetch()
    }
}
</script>

<style>
   
</style>