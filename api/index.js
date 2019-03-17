const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const router = express()

router.use(bodyParser.json())

// Get Posts
router.get('/api/posts', async (req, res) => {
  const posts = await loadPostsCollection()
  res.send(await posts.find({}).toArray())
})

// Add Posts
router.post('/api/posts', async(req, res) => {
  const posts = await loadPostsCollection()
  await posts.insertOne({
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Update Posts

// Delete Posts
router.delete('/api/posts/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/big2tiny', { useNewUrlParser: true })

  return client.db('big2tiny').collection('posts')
}

module.exports = router
