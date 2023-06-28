const router = require('express').Router();
const { User, Thought } = require('../../models');
//Thought Interactions
//Get all Thoughts
router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Thought.find());
  }
  catch (err) {res.status(500).json(err)}
});
//Get a Thought by ID
router.get('/:thoughtId', async (req, res) => {
  try {
    res.status(200).json(await Thought.findById({_id: req.params.thoughtId}));
  }
  catch (err) {res.status(500).json(err)}
});
//Create a Thought
router.post('/', async (req, res) => {
  try {
    const thoughtData = await Thought.create(req.body);
    await User.findByIdAndUpdate({_id: req.body.username}, {$push: {thoughts: thoughtData._id}});
    res.status(200).json(thoughtData);
  }
  catch (err) {res.status(500).json(err)}
});
//Update a Thought
router.put('/:thoughtId', async (req, res) => {
  try {
    await Thought.findByIdAndUpdate({_id: req.params.thoughtId},req.body);
    res.status(200).json(await Thought.findByIdAndUpdate({_id: req.params.thoughtId},req.body));
  }
  catch (err) {res.status(500).json(err)}
});
//Delete a Thought
router.delete('/:thoughtId', async (req, res) => {
  try {
    res.status(200).json(await Thought.findOneAndDelete({_id: req.params.thoughtId}));
  }
  catch (err) {res.status(500).json(err)}
});
//Reaction Interactions
//Add a Reaction
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thoughtData = await Thought.findById({_id: req.params.thoughtId});
    thoughtData.reactions.push(req.body);
    await thoughtData.save();
    res.status(200).json(thoughtData);
  }
  catch (err) {res.status(500).json(err)}
});
//Remove a Reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thoughtData = await Thought.findById({_id: req.params.thoughtId})
    thoughtData.reactions.splice(thoughtData.reactions.indexOf(req.params.reactionId));
    res.status(200).json(thoughtData);
  }
  catch (err) {res.status(500).json(err)}
});
module.exports = router;