import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type: String,
            required: true,
        },
        price:{
            type:Number,
            required:true,
            min:0,
        },
        stock:{
            type:Number,
            required:true,
            min:0,
            default:0,
        },
        category:{
            type:String,
            required:true,
            enum:["food", "medicine" ,"accessories","clothes"],
        },
        petType: {
            type: String,
            required: true,
            enum: ["dog","cat"],

        },
        image:{
            type:String,// url
            required:true,
        },
        isActive:{
            type:Boolean,
            default:true,
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps:true,
    }
);

export default mongoose.model("Product", productSchema);

        