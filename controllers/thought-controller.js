const {Thought,User} = require('../models');

module.exports= {
     getThoughts(req,res) {
        Thought.find()
       .sort({createdAt: -1})
       .then((thoughtData) => {
        res.json(thoughtData);
       });
     },
     getOneThought(req,res){
        Thought.findOne({ _id: req.params.thoughtId})
        .then((thoughtData) =>{
            !thoughtData
            ? res.status(404).json({ message: 'No thoughts with that ID'})
            :res.json({ thoughtData});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).JSON(err);
     });
     },
     createThought(req,res){
        Thought.create(req.body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: thoughtData._id}},
                {new: true}
            );
        })
        .then ((user) =>{
            !user
            ? res.status(404).json({ message: 'no user found, but thought created'})
            :res.json({message: 'Thoguht created'});
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        })
     },
     deleteThought(req,res){
        Thought.findOneAndRemove({ _id: req.params.thoughtId})
        .then((thoughtData)=>
        !thoughtData
        ? res.status(404).json({message: 'No thought, sorry'})
        : User.findOneAndUpdate(
            {thoughts: req.params.thoughtId},
            {$pull: {thoughts: req.parmas.thoughtId}},
            {new:true}
        )
     )
        .then ((user) =>
        !user
        ?res.stauts(404).json({message: 'Thought deleted, but no user found'})
            : res.json({ message: 'Thought successfully deleted'})
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
     },
     updateThought(req,res){ 
        Thought.findOneAndUpdate({ _id: req.params.thoguthId}, { $set: req.body},
            {runValidators: true, new: true})
            .then((thoughtData) =>{
                !thoughtData
                ? res.status(404).json({message: 'No thought found'})
                : res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
     },
     addReaction(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then((thoughtData) =>{
            !thoughtData
            ? res.status(404).json({message: 'No thought found'})
            : res.json(thoughtData);
        })
        .catch((err) =>{
            console.log(err);
            res.status(500).json(err);
        });
     },
     removeReaction(req,res) {
        Thought.findoneandUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then((thoughtData) =>{
            !thoughtData
            ? res.status(404).json({message: 'No thought found'})
            : res.json(thoughtData);
        })
        .catch((err) =>{
            console.log(err);
            res.status(500).json(err);
        });
     }
}