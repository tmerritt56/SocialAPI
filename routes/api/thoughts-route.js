const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts)
router.route('/:userId').post(createThought);
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);
router.route('/:thoguhtID/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionID').delete(removeReaction);

module.exports = router;
