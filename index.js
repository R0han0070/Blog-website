import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));


const posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/create-post", (req, res) => {
  const { title, author, content } = req.body;

  if (title && author && content) {
    // Add the new post to the array
    const newPost = { title, author, content };
    posts.push(newPost);

    // Redirect back to the home page
    res.redirect("/");
  } else {
    // Handle validation errors or missing data
    res.send("Please fill out all fields.");
  }
});

app.get("/update-post/:index", (req, res) => {
  const index = req.params.index;
  const post = posts[index];
  console.log(post);
  res.render("update.ejs", { post, index });
});

app.post("/update-post/:index", (req, res) => {
  const index = req.params.index;
  const { title, author, content } = req.body;

  if (title && author && content) {
    // Update the post in the array
    posts[index] = { title, author, content };

    // Redirect back to the home page
    res.redirect("/");
  } else {
    // Handle validation errors or missing data
    res.send("Please fill out all fields.");
  }
});

// Delete post route
app.post("/delete-post/:index", (req, res) => {
  const index = req.params.index;

  // Remove the post from the array
  posts.splice(index, 1);

  // Redirect back to the home page
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
