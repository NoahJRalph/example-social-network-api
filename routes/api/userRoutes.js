const router = require('express').Router();
const { User, Thought } = require('../../models');
//=======User Interactions=======
//Get all Users
router.get('/', async (req, res) => {
  try {
    res.status(200).json(await User.find());
  }
  catch (err) {res.status(500).json(err)}
});
// Get a User by ID
router.get('/:userId', async (req, res) => {
  try {
    res.status(200).json(await User.findById({_id: req.params.userId}));
  }
  catch (err) {res.status(500).json(err)}
});
//Create a User
router.post('/', async (req, res) => {
  try {
    res.status(200).json(await User.create(req.body));
  }
  catch (err) {res.status(500).json(err)}
});
//Update a User
router.put('/:userId', async (req, res) => {
  try {
    await User.findByIdAndUpdate({_id: req.params.userId},req.body);
    res.status(200).json(await User.findByIdAndUpdate({_id: req.params.userId},req.body));
  }
  catch (err) {res.status(500).json(err)}
});
//Delete a User
router.delete('/:userId', async (req, res) => {
  try {
    res.status(200).json(await User.findOneAndDelete({_id: req.params.userId}));
  }
  catch (err) {res.status(500).json(err)}
});
//=======Friend Interactions=======
//Add a Friend
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const userData = await User.findById({_id: req.params.userId});
    if (!userData.friends.includes(req.params.friendId)) {
      userData.friends.push(req.params.friendId);
    }
    else (res.status(200).json('You already have this friend added!'))
    await userData.save();
    res.status(200).json(userData);
  }
  catch (err) {res.status(500).json(err)}
});
//Remove a Friend
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const userData = await User.findById({_id: req.params.userId})
    if (userData.friends.includes(req.params.friendId)) {
      userData.friends.splice(userData.friends.indexOf(req.params.friendId));
    }
    await userData.save();
    res.status(200).json(userData);
  }
  catch (err) {res.status(500).json(err)}
});
module.exports = router;