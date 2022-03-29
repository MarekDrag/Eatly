
// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = async (req, res) => {
    res.json({ message: 'Get goals'})
};

// @desc Set goals
// @route POST /api/goals
// @access Private
const setGoal = async (req, res) => {
    if(!req.body.text) {
        res.stats(400).json({ message: 'please add a text field'})
        throw new Error('Please add a text field')
    }

    res.json({ message: 'Set goal' })
};

// @desc Update goals
// @route PUT /api/goals
// @access Private
const updateGoal = async (req, res) => {
    res.json({ message: `Update goal ${req.params.id}` })
};

// @desc Delete goals
// @route DELETE /api/goals
// @access Private
const deleteGoal = async (req, res) => {
    res.json({ message: `Delete goal ${req.params.id}` })
};

export {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
};