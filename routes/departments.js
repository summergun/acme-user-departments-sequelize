const router = require('express').Router();
const db = require('./db');
const Department = require('./db/Department');
const UserDepartment = require('./db/UserDepartment');

router.post('/', (req,res,next)=>{
  Department.createDept(req.body.name)
  .then( dept => { res.redirect('/') })
  .catch(next);
})

router.delete('/:id',(req,res,next)=>{
  db.models.UserDepartment.deleteUserDept(req.params.id)
  .then( () => db.models.Department.deleteDept(req.params.id))
  .then( ()=> res.redirect('/'))
  .catch (next);
})

module.exports = router;