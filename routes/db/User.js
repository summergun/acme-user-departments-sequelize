const db = require('./db');

const User = db.define('user', 
  {
  name: {
    type: db.Sequelize.STRING
    }
  },
  {
    classMethods:{
      //naming.. how about getUsersWithDepartments
      getUserDepts: function(){
        return User.findAll({ order: '"name" ASC',
          include: [{
            model: db.models.user_department,
          }]
        });
      }
    },
    instanceMethods:{
      hasAllDepartments: function(totalDepts){
        return this.user_departments.length === totalDepts;
      },
      hasNoDepartments: function(){
        return this.user_departments.length === 0;
      },
      hasDepartment: function(department){
        let check = 0;
        //use filter instead
        this.user_departments.forEach( userDept => {
          if (userDept.department.name === department)
            check++;
        })
        return check;
      }
    }
  }
)

module.exports = User;
