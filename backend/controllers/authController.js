const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
    try{
        const {name, email, password, contactNumber, address, isAdmin} = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({
            name, 
            email,
            password,
            address,
            contactNumber,
            isAdmin
        });

        await user.save();
        

        res.status(201).json({ message: 'User registered successfully', user });
    }catch(err){
        next(err)
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

       // console.log("email ==> ", email);

        const user = await User.findOne({ email });

        // console.log("user found ==> ", user);
        if(!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // // console.log("password ==> ", password);

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
            )

        res.status(200).json({ message: 'Login successful', token });
    }catch(err){
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
}