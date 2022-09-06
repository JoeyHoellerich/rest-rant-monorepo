const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { User } = db

router.post('/', async (req, res) => {
    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({
            message: "could not find user"
        })
    } else {
        //const result = await jwt.encode(process.env.JWT_SECRET, { id: user.userId })
        const token = jwt.sign({id: user.userId}, process.env.JWT_SECRET)
        //req.session.userId = user.userId
        res.json( { user: user, token: token} )
    }
})

router.get('/profile', async (req, res) => {
    try {
        //Split authorization header into ["Bearer", "Token"]
        const [authenticationMethod, token] = req.headers.authorization.split(' ')

        if (authenticationMethod == "Bearer"){
            const result = jwt.verify(token, process.env.JWT_SECRET)

            const { id } = result
            
            let user = await User.findOne({
                where: {
                    userId: id
                }
            })
            res.json(user)
        }
    } catch {
        res.json(null)
    }
})

module.exports = router
