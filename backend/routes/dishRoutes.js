const express = require('express');
const router = express.Router();
const { getDishes, setDish, updateDish, deleteDish } = require('../controllers/dishController');


router.get('/', getDishes);

router.post('/', setDish);

router.put('/:id', updateDish);

router.delete('/:id', deleteDish);



module.exports = router;