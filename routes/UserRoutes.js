var express = require('express');
var router = express.Router();
var userController = require('../src/controller/UserController');

/* GET user page. */
router.get('/home', userController.init);

/* GET get user by ID. */
router.get('/:id', userController.getByID);

/* GET get all users. */
router.get('/', userController.getAll);

/* POST create user. */
router.post('/', userController.create);

/* GET delete user by ID. */
router.delete('/:id', userController.deleteById);

/* GET update user by ID. */
router.patch('/:id', userController.updateById);

module.exports = router;
