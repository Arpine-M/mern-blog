const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const Category = require("../../models/Category/Category");
const User = require("../../models/User/User");
const sendNotificationMsg = require("../../utils/sendNotificationMsg");

const postController = {
  
  createPost: asyncHandler(async (req, res) => {
    
    const { description, category } = req.body;
    const categoryFound = await Category.findById(category);
    if (!categoryFound) {
      throw new Error("Category not found");
    }
    const userFound = await User.findById(req.user);
    if (!userFound) {
      throw new Error("User not found");
    }
    const postCreated = await Post.create({
      description,
      image: req.file,
      author: req.user,
      category,
    });
    categoryFound.posts.push(categoryFound?._id);
    await categoryFound.save();

    userFound.posts.push(postCreated?._id);
    await userFound.save();

    await Notification.create({
      userId: req.user,
      postId: postCreated?._id,
      message:`New post created by ${userFound?.username}`,
    });

    userFound.followers.forEach(async(follower)=>{
        const users = await User.find({_id:follower});
        users.forEach(async(user)=>{
            await sendNotificationMsg(user.email, postCreated?._id);
        })
    })
    res.json({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  }),

  
  fetchAllPosts: asyncHandler(async (req, res) => {
    const { category, title, page = 1, limit = 300 } = req.query;
   
    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (title) {
      filter.description = { $regex: title, $options: "i" }; //case insensitive
    }

    const posts = await Post.find(filter)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    //total posts
    const totalPosts = await Post.countDocuments(filter);
    res.json({
      status: "success",
      message: "Post fetched successfully",
      posts,
      currentPage: page,
      perPage: limit,
      totalPages: Math.ceil(totalPosts / limit),
    });
  }),
  
  getPost: asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;

    const userId = req.user ? req.user : null;
    //find the post
    const postFound = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "author",
      }
    });
    if(!postFound){
        throw new Error("Post not found");
    }
    if (userId) {

      await Post.findByIdAndUpdate(postId, { 
        $addToSet: { viewers: userId }, 
    }, { new: true });
      // if(!postFound?.viewers.includes(userId)){
      //   postFound.viewers.push(userId);
      //   postFound.viewsCount = postFound.viewsCount + 1;
      //   await postFound.save();
      // }
    }
    res.json({
      status: "success",
      message: "Post fetched successfully",
      postFound,
    });
  }),
  
  delete: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    await Post.findByIdAndDelete(postId);
    res.json({
      status: "success",
      message: "Post deleted successfully",
    });
  }),
  
  update: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    //find the post
    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error("Post  not found");
    }
    
    const postUpdated = await Post.findByIdAndUpdate(
      postId,
      { description: req.body.description, image: req.file },
      {
        new: true,
      }
    );
    res.json({
      status: "Post updated successfully",
      postUpdated,
    });
  }),

  like: asyncHandler(async (req, res) => {
      const postId = req.params.postId;
      const userId = req.user;
      const post = await Post.findById(postId);

      if(post?.dislikes.includes(userId)){
        post.dislikes.pull(userId);
      }

      if(post?.likes.includes(userId)){
        post?.likes?.pull(userId);
      } else {
        post?.likes?.push(userId);
      }

      await post.save();

      res.json({
        message: "Post liked",
      });
  }),

  dislike: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
      const userId = req.user;
      const post = await Post.findById(postId);

      if(post?.likes.includes(userId)){
        post.likes.pull(userId);
      }

      if(post?.dislikes.includes(userId)){
        post?.dislikes?.pull(userId);
      } else {
        post?.dislikes?.push(userId);
      }

      await post.save();

      res.json({
        message: "Post disliked",
      });
    })
};

module.exports = postController;