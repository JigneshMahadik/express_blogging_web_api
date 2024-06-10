const postModel = require("../models/post");

const postList = async(req,res)=>{
    try {
        const data = await postModel.find().populate("userId");
        res.json({
            status : true,
            total_records : data.length,
            records : data
        })
    } catch (error) {
        res.json({
            status : false,
            message : "Something went wrong while fetching the data !"
        })
    }
    
}

const createPost = async (req,res)=>{
    // console.log(req.user._id);
    try {
        const newPost = new postModel({...req.body, userId : req.user._id});
        await newPost.save();   
    } 
    catch (error) {
       return res.json({
        message : "Something went wrong !"
       }) 
    }
    res.json({
        status : true,
        message : "Post is created successfully",
        post_detail : req.body
    });
}

const getPostById = async (req,res)=>{
    try {
        const data = await postModel.findById(req.params.id).populate("userId");    
        res.json({
            status : true,
            message : data
        })
    }
    catch (error) {
        return res.json({
            status : false,
            message : "Something went wrong while fetching the data !"
        })
    }
}

const updatePostById = async (req,res)=>{
    const resp = await postModel.findByIdAndUpdate(req.params.id, req.body);
    // console.log(resp);
    res.json({
        status : true,
        message : "Post has been updated",
        updated_post_detail : req.body
    })
}

const deletePostById = async(req,res)=>{
    await postModel.findByIdAndDelete(req.params.id);
    res.json({
        message : "Post has been deleted"
    })
}

const addComments = async(req,res)=>{
    // console.log("Comments added");
    try {
        await postModel.updateOne(
            { _id : req.params.postId },
            {
                $push : {
                    comments : { comment : req.body.comment, userId : req.user._id }
                }
            }
        )
        return res.json({
            status : true,
            message : "Comment added successfully",
            commented_message : req.body
        })
    } 
    catch (error) {
        return res.json({
            status : false,
            message : "Something went wrong !"
        })    
    }
}

const updateComments = async(req,res)=>{
    // console.log("Comments added");
    try {
        await postModel.findOneAndUpdate(
            { 
                _id : req.params.postId,
                "comments._id" : req.query.commentId
            },
            {
                $set : {
                    "comments.$.comment" : req.body.comment
                }
            }
        )
        return res.json({
            status : true,
            message : "Comment updated successfully",
            updated_comment : req.body
        })
    } 
    catch (error) {
        console.log(error);
        return res.json({
            status : false,
            message : "Something went wrong !"
        })    
    }
}

const deleteComments = async(req,res)=>{
    // console.log("Comments added");
    try {
        await postModel.findOneAndUpdate(
            { 
                _id : req.params.postId,
            },
            {
                $pull : {
                    comments : { _id : req.query.commentId }
                }
            }
        )
        return res.json({
            status : true,
            message : "Comment deleted successfully"
        })
    } 
    catch (error) {
        console.log(error);
        return res.json({
            status : false,
            message : "Something went wrong !"
        })    
    }
}


const postControllers = {
    postList,
    createPost,
    getPostById,
    updatePostById,
    deletePostById,
    addComments,
    updateComments,
    deleteComments
};

module.exports = postControllers;