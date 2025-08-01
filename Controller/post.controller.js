const postModel = require("../Model/post.model");
const userModel = require("../Model/user.model");

// Create a post
const createPost = async (req, res) => {
    const body = req.body;
    const { id } = req.user;

    try{
        //Create a post
        const newPost = new postModel({
            creator: id,
            ...body,
        });

        const savedPost = await newPost.save();

        //Modify the user account
        await userModel.findByIdAndUpdate(id,
            { $push: {post: savedPost.id} },
            {new: true}
        )
    } catch(error) {
        console.log(error.message)
        return res.send(error.message)
    };
    
};

// Get a single post
const getSinglePost = async (req, res) => {
    const { postId } = req.query;
    try {
        const post = await postModel.findById(postId).populate("creator");
        return res.status(200).json(post);
    } catch(error) {
        return res.send(error.message);
    }
};

// Delete post
const deletePost = async (req, res) => {
    const { postId } = req.query;
    const { id, admin } = req.user;
    console.log(req.user);

    // check for post existence
    const post = await postModel.findById(postId);
    if(!post) {
        return res.json({message: "post does not exist"});
    }

    //check if its creator
    if(id != post.creator && !admin) {
        return res.json({message: "this post does not belong to you"})
    }

    try{
        await postModel.findByIdAndDelete(postId)
        return res.status(200).json({message: "post deleted successfully!!!"});

    } catch(error) {
        return res.send(error.message)
    }
}

// Update post
const updatePost = async (req, res) => {
    const { postId, userId } = req.query;
    const body = req.body;

    //get the post
    const post = await postModel.findById(postId);
    if(!post) {
        return res.json({message: "post does not exist"});
    }

    // check if its the owner
    if(userId != post.creator) {
    return res.json({message: "you can only update your post"})
    }

    try{
        await postModel.findByIdAndUpdate(postId, {...body}, {new: true});
        res.status(200).json({message: "post updated successfully"})

    } catch(error) {
        res.send(error.message)
    }

};

// Get all posts
const getUserPosts = async (req, res) => {
    const { userId } = req.query;

    try{
        const posts = await postModel.find({ creator: userId});
        return res.status(200).json(posts)

    } catch (error) {
        res.send(error.message)
    }
};

module.exports = { createPost, getSinglePost, deletePost, updatePost, getUserPosts };