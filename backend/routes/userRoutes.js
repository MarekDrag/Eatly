const express = require('express');
const router = express.Router();
const { getUsers, getUser, setUser, updateUser, deleteUser } = require('../controllers/userController');


router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', setUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);



module.exports = router;