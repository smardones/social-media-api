const router = require('express').Router();
const { getAllUsers,
createNewUser,
getUserById,
updateUser,
deleteUser} = require('../../controllers/user-controllers');

router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;