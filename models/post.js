const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    body : {
        type : String,
        required : true,
        default : "NA"
    },
    tags : {
        type : Array,
        required : false,
        default : []
    },
    userId : {
        type : mongoose.Types.ObjectId,      //its a monggose's data type.
        ref : "users"                       // Refered to users collections's user id.
    },
    comments : [
        {
            comment : {
                type : String,
            },
            date : {
                type : String,
                default : new Date()
            },
            userId : {
                type : mongoose.Types.ObjectId
            }
        }
    ]
},
{
    timestamps : true   //it'll crete 2 fields "createdAt" and "updatedAt"
}
);

const postModel = mongoose.model("post",postSchema);
module.exports = postModel;