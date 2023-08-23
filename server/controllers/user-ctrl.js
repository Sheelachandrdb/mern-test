const User = require('../models/user-model')

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!user.firstname) {
        return res.status(400).json({ success: false, error: 'Firstname should net be empty' })
    }

    if (!user.lastname) {
        return res.status(400).json({ success: false, error: 'Lastname should net be empty' })
    }

    if (!user.email) {
        return res.status(400).json({ success: false, error: 'Email should net be empty' })
    }

    if (user.firstname.length > 100) {
        return res.status(400).json({ success: false, error: 'Firstname length should be less than 100 characters.' })
    }

    if (user.lastname.length > 100) {
        return res.status(400).json({ success: false, error: 'Lastname length should be less than 100 characters.' })
    }

    if (user.email.length) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!user.email.match(validRegex)) {
            return res.status(400).json({ success: false, error: 'Invalid email address.' })
        }
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    getUsers
}