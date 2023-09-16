const asyncHandler = require('express-async-handler')
const UserModel = require('../models/User')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async(req,res)=> {
    const { username,password }=req.body

    const userExists = await UserModel.findOne({username})

    if (userExists){
        res.status(400)
        throw new Error('Username already exists!')
    }

    const user = await UserModel({
        username, password
    })

    if(user) {
        res.status(201).json({
            _id:user._id,
            username:user.username,
            password:user.password,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
    throw new Error('Error Occured!')
    }
})

const authUser = asyncHandler(async(req,res)=> {
    const { username,password }=req.body
    const user = await UserModel.findOne({username})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            username:user.username,
            password:user.password,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
    throw new Error('Invalid Email or Password!')
    }
})

module.exports = {registerUser, authUser}