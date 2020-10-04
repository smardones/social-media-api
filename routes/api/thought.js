const router = require('express').Router();
const { getAllThoughts,
createNewThought,
getThoughtById,
updateThought,
deleteThought } = require('../../controllers/thought-controllers');

router
    .route('/')
    .get(getAllThoughts)
    .post(createNewThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;