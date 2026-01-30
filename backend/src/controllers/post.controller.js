import Post from "../models/Post.js";

/* GET /api/posts */
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

/* GET /api/posts/:id */
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

/* POST /api/posts */
export const createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title y content son obligatorios" });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const post = await Post.create({
      title,
      content,
      excerpt,
      slug,
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

/* DELETE /api/posts/:id */
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });
    res.json({ message: "Post eliminado" });
  } catch (err) {
    next(err);
  }
};
