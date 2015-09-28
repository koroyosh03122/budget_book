
module.exports = function(app, models) {

  models.users.findAll()
  .then(function(results){
    console.log(results);
  });

};
