const router = require('express').Router();
const { getAllThoughts,
createNewThought,
getThoughtById,
updateThought,
deleteThought,
createReaction,
removeReaction } = require('../../controllers/thought-controllers');

router
    .route('/')
    .get(getAllThoughts)
    .post(createNewThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(removeReaction)

module.exports = router;