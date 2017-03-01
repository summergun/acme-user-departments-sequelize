const db = require('./db');

const UserDepartment = db.define('user_department',{

},{
  classMethods:{
    deleteUserDept: function(id){
      return this.destroy({ where: { departmentId: id } });
    }
  }
});

module.exports = UserDepartment;