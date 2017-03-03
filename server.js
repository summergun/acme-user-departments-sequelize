//load installed modules
const express = require('express');
const app = express();
const swig = require('swig');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

//Template Engine
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults( {cache:false});

//Global Use
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/vendors', express.static(__dirname + '/vendors/'));

//load internal modules

//why is db in the routes folder?
const db = require('./routes/db');
const User = require('./routes/db/User');//how about db.models.User
const Department = require('./routes/db/Department');//how about db.models.Department
const UserDepartment = require('./routes/db/UserDepartment');//how about db.models.UserDepartment

//load internal routes

const departmentRoutes = require('./routes/departments');
const userRoutes = require('./routes/users');


//Seeding the data
db.seed()
  .then( ()=> console.log('DataBase is seeded'))
  .catch( (err)=> console.log(err));



app.get('/', (req,res,next)=>{
  let department;
  //you could use Promise.all([ Department.findAll(), User.getUserDepts()])
  return Department.findAll()
  .then( _depts =>{
    department = _depts;
    return User.getUserDepts()
  })
  .then( users => {
    res.render('index', {department, users})
  })
  .catch(next);
})

app.use('/departments', departmentRoutes);
app.use('/users', userRoutes);


//Port Listening

const port = process.env.PORT || 3000 ;
app.listen(port, ()=> console.log(`listening on port ${port}`));
