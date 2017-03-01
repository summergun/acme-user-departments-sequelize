const router = require('express').Router();
const User = require('./db/User');
const UserDepartment = require('./db/UserDepartment');

router.post('/', (req,res,next)=>{
  User.create(req.body.name)
  .then( (user) => res.redirect('/'))
  .catch (next);
});

router.post('/:id/user_departments', (req,res,next)=>{
  UserDepartment.create({ userId: req.params.id, departmentId: req.body.departmentId})
  .then( (result) => res.redirect('/'))
  .catch(next);
})

router.delete('/:userId/user_departments/:id', (req,res,next)=>{
  UserDepartment.destroy({
    where: { userId: req.params.userId, departmentId: req.params.id }
  })
  .then( ()=> res.redirect('/'))
  .catch(next);
})

router.delete('/:id', (req,res,next)=>{
  UserDepartment.destroy({ where: { userId: req.params.id }})
  .then( ()=> User.destroy({ where: { id: req.params.id }}))
  .then( ()=> res.redirect('/'))
  .catch(next);
})

module.exports = router;