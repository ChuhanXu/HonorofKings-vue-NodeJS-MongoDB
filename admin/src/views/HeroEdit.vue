<template>
    <div class="about">
      <!-- 使用一个三目运算符，如果有ID就是编辑分类，不然就是新建分类 -->
        <h1>{{id?'编辑':'新建'}}英雄</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <!--默认值是skill，防止刷新后会跳转页面  -->
            <el-tabs value="skills" type="border-card" >

                <el-tab-pane label="基本信息" name="basic">

                    <el-form-item label ="名称">   
                        <el-input v-model="model.name">请输入名称</el-input>
                    </el-form-item>

                    <el-form-item label ="称号">   
                        <el-input v-model="model.title">请输入名称</el-input>
                    </el-form-item>

                            <!-- 图片上传模块 -->
                        <!-- 两个组件 一个图片，一个上传图标，如果有图片就上传图片没有上传图标 -->
                        <!--action （上传的接口地址是什么）一个地址 上传图片是当我们选择一个图片后，提交一个if请求，发到后端的某个接口，这个接口保存图片
                        保存完以后并返回给客户端一个完整的url图片的网址，前端拿到响应后将图片展示出来  -->
                        <!-- on-success 上传成功之后要做什么 将返回值里的图片地址赋值给model.icon afterUpload一个方法  -->
                        <!-- action前加:表示动态绑定 -->
                        <!-- baseURL:'http://localhost:3000/admin/api'用不了，需要在后端写一个upload的接口 -->
                    <el-form-item label ="头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL+'/upload'"
                            :show-file-list="false"
                            :on-success="afterUpload"
                        >
                            <img v-if="model.avatar" :src="model.avatar" class="avatar"><!--图片  -->
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i> <!-- 上传图标 -->
                        </el-upload>
                    </el-form-item>

                    <el-form-item label ="类型"> 
                            <!-- multiple表示类型可以多选 -->
                        <el-select v-model="model.categories" multiple>
                            <!-- 这里的数据是从分类这个变量循环出来-->
                            <el-option v-for="item of categories" 
                                :key="item._id" 
                                :label="item.name" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label ="难度"> 
                            <!--model.scores.difficult多层级一定要保证存在，在data return中定义score  -->
                            <!--margin-top:0.65rem 是难度和星星在同一行  -->
                        <el-rate style="margin-top:0.65rem" v-model="model.scores.difficult" 
                            :max="10" show-score>
                        </el-rate>
                    </el-form-item>

                    <el-form-item label ="技能"> 
                        <el-rate style="margin-top:0.65rem" v-model="model.scores.skills" 
                            :max="10" show-score>
                        </el-rate>
                    </el-form-item>

                    <el-form-item label ="攻击"> 
                        <el-rate style="margin-top:0.65rem" v-model="model.scores.attack" 
                            :max="10" show-score>
                        </el-rate>
                    </el-form-item>

                    <el-form-item label ="生存"> 
                        <el-rate style="margin-top:0.65rem" v-model="model.scores.survive" 
                            :max="10" show-score>
                        </el-rate>
                    </el-form-item>

                    <el-form-item label ="顺风出装"> 
                        <el-select v-model="model.items1" multiple>
                             <el-option v-for="item of items" 
                                :key="item._id" 
                                :label="item.name" 
                                :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label ="逆风出装"> 
                        <el-select v-model="model.items2" multiple>
                             <el-option v-for="item of items" 
                                :key="item._id" 
                                :label="item.name" 
                                :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label ="使用技巧"> 
                        <el-input type="textarea" v-model="model.usageTips" >
                        </el-input>
                    </el-form-item>

                    <el-form-item label ="对抗技巧"> 
                        <el-input type="textarea" v-model="model.battleTips" >
                         </el-input>
                     </el-form-item>

                    <el-form-item label ="团战思路"> 
                        <el-input type="textarea" v-model="model.teamTips" >
                        </el-input>
                    </el-form-item>

                </el-tab-pane>

                <el-tab-pane label="技能" name="skills">
                    <!-- 点击此按钮的时候给model.skills里添加一个空对象 -->
                    <el-button type="text" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                    <el-row type="flex" style="flex-wrap:wrap">
                        <!-- 每一列是循环的，当点击添加的时候，出现新的一列，循环的元素是model.skills里的所有 name icon,discription tip -->
                        <!-- 每一列的宽度为12 -->
                        <!-- i 是索引 -->
                        <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>

                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL+'/upload'"
                                    :show-file-list="false"
                                    :on-success="res => $set(item,'icon',res.url)">
                                    <!-- 需要用vue里的set方法显示赋值 -->
                                    <!-- 接受一个参数res，将接受到的参数的url赋值给item.icon -->
                                    <img v-if="item.icon" :src="item.icon" class="avatar"><!--图片  -->
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i> <!-- 上传图标 -->
                                </el-upload>
                            </el-form-item>

                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>

                            <el-form-item label="小提示">
                                <el-input type="textarea" v-model="item.tips"></el-input>
                            </el-form-item>


                            <!--删除技能 用删除数据的方式  -->
                            <!-- splice函数（删除的位置，删除数量）在i的位置删1个 -->
                            <el-form-item >
                                <el-button size="small" type="danger"
                                @click="model.skills.splice(i,1)">Delete</el-button>
                            </el-form-item>


                        </el-col>

                    </el-row>

                </el-tab-pane>

                

            </el-tabs>
            <!-- 1和rem之间没有空格 -->
            <el-form-item style ="margin-top:1rem" >   
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
                categories:[],
                items:[],
                model:{
                    //name:{},
                    //avatar:{}
                    scores:{
                        difficult:0//默认0分
                    }
                
                }
            }
        },

    methods:{

        afterUpload(res){
            this.$set(this.model,'avatar',res.url);//set 在model上加一个icon属性，赋值为res.url
           //this.model.avatar=res.url
        },

        
        async save(){
           let res
            if(this.id){
                res = await this.$http.put(`rest/heroes/${this.id}`,this.model);
            }else{
                //rest后面的都可以找到，相当于一个resources
                res = await this.$http.post('rest/heroes',this.model);
           }

           console.log(res)
           this.$router.push('/heroes/list');
          
           this.$message({
               type:'success',
               message:'保存成功'
           })
        },

       async fetch(){
            const res = await this.$http.get(`rest/heroes/${this.id}`);
            // res.data 是从服务端获取的数据，会覆盖model里的全部数据，其中不包含scores，因此写在model对象里的scores对象会被覆盖掉
            //this.model = res.data
            this.model = Object.assign({},this.model,res.data);//res里有什么数据就会赋值什么上去，不会覆盖model中存在的对象
        },
        //从服务端请求英雄类型的名称，例如射手 战士
        async fetchCategories(){
            const res = await this.$http.get(`rest/categories/`);
            this.categories = res.data;
        },
        //从服务端请求装备类型的名称，例如shoes
        async fetchItems(){
            const res = await this.$http.get(`rest/items/`);
            this.items = res.data;
        }

    },
    
    created(){
        this.fetchCategories();
        this.fetchItems();
        this.id && this.fetch();
    }
}
</script>

<style>
   
</style>