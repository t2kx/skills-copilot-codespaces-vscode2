// create web server
const express = require("express");
const app = express();
const port = 3000;

// create a route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

## 3. Create a route for comments

```javascript
// Path: comments.js
// creqate web server
const express = require("express");
const app = express();
const port = 3000;

// create a route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/comments", (req, res) => {
  res.json({
    comments: [
      {
        id: 1,