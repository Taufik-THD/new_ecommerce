const User = require("../models/model_user");
const jwt = require ("jsonwebtoken");

module.exports = {

  getUsers(req,res){
      User.find({})
      .then(function(users){
          res.status(200)
          .send({
              message: "Here are the name of the users: ",
              users
          })
      })
      .catch(function(err){
          res.status(409)
          .send({
              message: err.message
          })
      })
  },
  signUp(req, res){

    User.findOne({ email: req.body.email }, function(err, user) {

      if (err) {
        res.status(404).json('bad request')
      } else {

        if (user) {
          res.status(404).json('email is already exists')

        } else {

          const newUser = {
            username: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            role: 'user'
          }

          User.create(newUser, (err, success) => {

            if (err) {
              res.status(404).json('bad request')
            } else {
              res.status(201).json('succes add new user')
            }

          })

        }

      }

    })

  },
  signIn (req, res){

    if (req.headers.id) {

      User.find({email: req.headers.email}, ( err, user ) => {


        if (user.length != 0) {

          if (user[0].role == 'admin') {
            const jwtToken = jwt.sign({ email: req.headers.email, id: user[0]._id }, "SECRET")
            const admin = 'admin'
            res.status(200).json({ jwtToken, admin })
          } else {
            const jwtToken = jwt.sign({ email: req.headers.email, id: user[0]._id }, "SECRET")
            res.status(200).json({ jwtToken })
          }


        } else {

          const newUser = {
            username: req.headers.name,
            email: req.headers.email,
            password: String(req.headers.id),
            role: 'user'
          }

          User.create(newUser, function(err, success) {

            if (err) {
              console.log(err);
              res.status(404).json('bad request')
            } else {
              res.status(200).json('succes add new user')
            }

          })

        }

      })

    } else {

      User.findOne({email: req.body.email}, ( err, user ) => {

        if (err) {

          res.status(404).json('user not found')

        } else {

          if (user) {

            user.comparePassword(req.body.password, function(err, isMatch) {

              if (err) {
                res.status(404).json(err)
              } else {

                if (!isMatch) {

                  res.status(400).json('wrong password')

                } else {

                  if (user.role == 'admin') {
                    const jwtToken = jwt.sign({ email: req.body.email, id: user._id }, "SECRET")
                    const admin = 'admin'
                    res.status(200).json({ jwtToken, admin })
                  } else {
                    const jwtToken = jwt.sign({ email: req.body.email, id: user._id }, "SECRET")
                    res.status(200).json({ jwtToken })
                  }

                }

              }

            })

          } else {

            res.status(400).json('user not found')

          }

        }

      })

    }

  }

};
