const db = require('./db');

const User = db.define('user', 
  {
  name: {
    type: db.Sequelize.STRING
    }
  },
  {
    classMethods:{
      getUserDepts: function(){
        return User.findAll({ order: '"name" ASC',
          include: [{
            model: db.models.user_department,
              // include: [{
              //   model: db.models.department
              // }]
          }]
        })
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
          //  this.userdepartments.forEach(
          //     userdepartment=>{
          //         return userdepartment.department.id===id;
          //     }
          // )
        let check = 0;
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