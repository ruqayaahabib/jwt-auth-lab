const router = require("express").Router();
const verfiyToken = require("../middleware/verifyToken")
const Entry = require ("../models/Entry")


router.post("/", verfiyToken,async(req,res)=>{
    try{
        // looged in is always re.user
        const {title, entryBody, isPublic} = req.body
        const newEntry = await Entry.create({
            title,
            entryBody,
            isPublic,
            owner: req.user._id
        })
        res.status(201).json(newEntry)
    }catch(err){
        console.log(err)
    }
})

router.get("/", async(req,res)=>{
    try{
        const publicEntries = await Entry.find({
            isPublic: true
        })
        
        res.status(200).json(publicEntries);

    }
    catch(err){
        console.log(err)
    }
})

router.get("/my-entries", verfiyToken,async(req,res)=>{
    try{
        const myEntries = await Entry.find({
            owner: req.user._id
        })
        res.status(200).json(myEntries)
    }
    catch(err){
        console.log(err)
    }
})

router.delete("/:entryId", verfiyToken, async(req,res)=>{
    try{
        const entry = await Entry.findById(req.params.entryId)

        if (!entry) {
            return res.status(404).json({message: "Entry not found"});
        }
        if (!entry.owner.equals(req.user._id)) {
            return res.status(403).json({message: "NO permission to delete"});
        }
        await Entry.findByIdAndDelete(req.params.entryId)

        res.status(200).json({message: "Entry deleted"});
    }
    catch(err){
        console.log(err)
    }
})

router.put("/:entryId" , verfiyToken, async(req,res)=>{
    try{
        const {title, entryBody, isPublic} = req.body
        const entry = await Entry.findById(req.params.entryId)

        if (!entry) {
            return res.status(404).json({message: "Entry not found"});
        }
        if (!entry.owner.equals(req.user._id)) {
            return res.status(403).json({message: "NO permission to update"});
        }

        const updatedEntry = await Entry.findByIdAndUpdate(req.params.entryId, {
            title, isPublic, entryBody
        },{new:true})
        res.status(200).json(updatedEntry)
    }
    catch(err){
        console.log(err)
    }
})

module.exports= router