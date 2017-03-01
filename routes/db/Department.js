const db = require('./db');

const Department = db.define('department',{
  name: {
    type: db.Sequelize.STRING,
  }
},{
  classMethods: {
    deleteDept: function(id){
      return this.destroy({ where: { id: id }})
    },
    createDept: function(name){
      return db.models.department.findOne({ where: { name: name } })
      .then( dept => {
        if(dept) return dept;
        return db.models.department.create({ name: name })
      })
    }
  }
})

module.exports = Department;