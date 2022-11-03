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
     createThought({params,body}, res){
    Thought.create({
        thoughtText: body.thoughtText,
        username: body.username,
        userId: params.userId,
    })  
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$addToSet: {thoughts:_id}},
                {new: true}
            );
        })
        .then ((userData) =>{
            !userData
            ? res.status(404).json({ message: 'no user found, but thought created'})
            :res.json({message: 'Thought created'});
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        })
     },
     deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then((user) => {
            if (!user) {
              res.status(404).json({ message: "No user with that ID" });
              return;
            }
            return res.json(user);
          })
          .catch((err) => res.json(err));
      },

     updateThought(req,res){ 
        Thought.findOneAndUpdate({ _id: req.params.thoughtId}, { $set: req.body},
            {runValidators: true, new: true})
            .then((thoughtData) => {
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