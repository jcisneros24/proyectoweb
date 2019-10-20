var User = require('../model/User');
var mongoose = require('mongoose');

module.exports = {
  getByID: function(req, res) {
    const id = req.params.id;
    User.findById(id)
      .exec()
      .then(user => {
        console.log(user);
        if (user) {
          res.status(200).json({
            code: "1",
            message: "Se encontro el usuario",
            foundUser: user
          });
        } else {
          res.status(404).json({
            code: "0",
            message: 'No se encontro al usuario'
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          code: "-1",
          error: err
        });
      });
  },
  getAll: function(req, res) {
    User.find()
    .exec()
    .then(users => {
      console.log(users);
        res.status(200).json({
          code: "1",
          message: "Lista de usuarios",
          ListUsers: users
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        code: "-1",
        error: err
      });
    });
  },
  create: function(req, res) {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      celular: req.body.celular,
      usuario: req.body.usuario,
      password: req.body.password
    });
    user.save().then(result => {
      console.log(result);
      res.redirect('back');
    }).catch(err => {
      console.log(err);
      res.status(404).json({
        code: "-1",
        error: err
      });
    });
  },
  deleteById: function(req, res) {
    const id = req.params.id;
    User.remove({_id: id})
      .exec()
      .then(result => {
          res.status(200).json({
            code: "1",
            message: "Se elimino el usuario",
            deletedUser: result
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          code: "-1",
          error: err
        });
      });
  },
  updateById: function(req, res) {
    const id = req.params.id;
    const user = new User({
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      celular: req.body.celular,
      usuario: req.body.usuario,
      password: req.body.password
    });
    user.update({_id:id}, {$set:user}).then(result => {
      console.log(result);
      res.status(200).json({
        code: "1",
        message: "Se actualizo el usuario",
        updatedUser: user
      });
    }).catch(err => {
      console.log(err);
      res.status(404).json({
        code: "-1",
        error: err
      });
    });
  },
  init: function(req, res) {
    User.find()
    .exec()
    .then(users => {
        res.render('user', { title: 'User' , lstUsers: users });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        code: "-1",
        error: err
      });
    });
  }
  
};