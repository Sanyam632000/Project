const Conversation = require("../models/Conversation.js")
const Message = require("../models/Message.js")
const router = require("express").Router();

//New Conversation
router.post("/:senderId/:receiverId", async(req,res) => {
    
    if(req.params.senderId!= req.params.receiverId){
        const findConversation = await Conversation.findOne({
            members:{$all:[req.params.senderId,req.params.receiverId]}
        })

        if(!findConversation){
            const newConversation = new Conversation({
                members:[req.params.senderId, req.params.receiverId]
                
            })  
            try{
                const conversation = await newConversation.save();
                res.status(200).json(conversation);
            }
            catch(err){
                res.status(407).json(err)
            }
        }
        else{
            res.json("jsl")
        }
       
    }
    

   
})

//Check Conversation
router.get("/:senderId/:receiverId",async(req,res) => {
    
        if(req.params.senderId !== req.params.receiverId){
            const findConversation = await Conversation.findOne({
                members:{$all:[req.params.senderId,req.params.receiverId]}
            })
            res.json(findConversation?findConversation:"chan")
        }
        else{
            res.json("No such conversation exist")
        }
        
})

//Delete Conversation
router.delete("/:senderId/:receiverId", async(req,res) => {
    try{
        const delete_conversation = await Conversation.findOneAndDelete({
            members:{$all:[req.params.senderId,req.params.receiverId]}
        })
        res.json("COnversation is deleted...")
    }
    catch(err){
        console.log(err)
    }
})

//Get COnversation

router.get("/:id", async(req,res) =>{
    try{
        const get_conversation = await Conversation.find({
            members:{$in:[req.params.id]}
        })
        res.status(200).json(get_conversation)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router