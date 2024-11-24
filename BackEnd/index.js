const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Middleware to parse JSON requests
app.use(express.json());

// In-memory database (for simplicity)
let posts = [
  { id: 1, title: "First Post", body: "This is my first post." },
  { id: 2, title: "Second Post", body: "This is my second post." },
];

// GET: Fetch all posts
app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

// POST: Create a new post
app.post("/posts", (req, res) => {
  const newPost = { id: posts.length + 1, ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT: Update a post by ID
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex((post) => post.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  posts[index] = { ...posts[index], ...req.body };
  res.status(200).json(posts[index]);
});

// DELETE: Delete a post by ID
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((post) => post.id !== parseInt(id));
  res.status(200).json({ message: "Post deleted successfully" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
