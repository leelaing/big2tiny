const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.send('Hello World from the blog!')
  console.log('Hello World from the blog!')
}),

module.exports = {
  path: "/api/blog",
  handler: app
}