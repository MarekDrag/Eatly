const User = require('../models/userModel');

// @desc Get users
// @route GET /api/users
const getUsers = async(req, res) => {
    const users = await User.find()
    
    res.json(users)
};

//@desc Get user
//@route GET /api/users/:id
const getUser = async(req, res) => {
    const user = await User.findById(req.params.id);
    
    res.json(user)
};

// @desc Set user
// @route POST /api/users
const setUser = async (req, res) => {
    if(!req.body) {
        res.status(400).json({ message: 'please add a text field'})
        throw new Error('Please add a text field')
    }
    
    const {email, name, password, mealPlan} = req.body;
    const newUser = new User({
        email,
        name,
        password,
        mealPlan
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
};

// @desc Update user
// @route PATCH /api/users
const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    let mealPlan;

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    if(Object.keys(req.body.mealPlan).length === 0){
        // delete mealPlan
        mealPlan = {mealPlan:{}};
    } else {
        // update mealPlan
        mealPlan = {mealPlan:{...user.mealPlan, ...req.body.mealPlan}};
    }


    const updatedUser = await User.findByIdAndUpdate(req.params.id, mealPlan);

    res.json(updatedUser);
};

// @desc Delete user
// @route DELETE /api/users
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(400);
        throw new Error('User not found');
    };

    await user.remove();


    res.json({ id: req.params.id })
};

module.exports = {
    getUsers,
    getUser, 
    setUser,
    updateUser, 
    deleteUser
};