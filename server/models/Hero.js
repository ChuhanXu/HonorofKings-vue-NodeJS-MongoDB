const mongoose = require('mongoose')
//建立数据库的结构
const schema = new mongoose.Schema({
    //字段 name,建立模型 定义数据类型
    name:{type:String},
    title:{type:String}, 
    //对于图片，不会直接将图片存到数据库里，而是将图片放到一个图片地址里
    avatar:{type:String},
   
    //如果是多个元素，用数组
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],//刺客或法师

    scores:{
        difficult:{type: Number},//难度
        skills:{type: Number},//技能
        attack:{type: Number},//攻击
        survive:{type: Number},//生存
    },
    //skills数据结构是又多个对象构成一个数组，数组里有四个属性
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String},
    }],

    //出装推荐，直接从物品库里选
    items1:[{type: mongoose.SchemaTypes.ObjectId,ref:'Item'}],//顺风出装
    items2:[{type: mongoose.SchemaTypes.ObjectId,ref:'Item'}],//逆风出装

    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},

    //英雄关系
    partners:[{
        hero:[{type: mongoose.SchemaTypes.ObjectId,ref:'Hero'}],
        description:{type:String},
    }],

})
//将这个模型导出的是一个mongo的模型，哪里需要用就去哪里导入，数据库的增删改查需要用
module.exports = mongoose.model('Hero',schema)