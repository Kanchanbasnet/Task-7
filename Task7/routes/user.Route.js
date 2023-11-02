const express = require('express');
const {getUsers, getUserById, createUser,updateUser, deleteUser} = require('../modules/User/user.Controller');


const router = express.Router();

router.get('/', getUsers);
router.get('/:id',getUserById)
router.post('/create', createUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router;