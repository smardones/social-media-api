const router = require('express').Router();
const { getAllUsers,
createNewUser,
getUserById,
updateUser,
deleteUser,
addFriend,
deleteFriend} = require('../../controllers/user-controllers');

router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router  
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;