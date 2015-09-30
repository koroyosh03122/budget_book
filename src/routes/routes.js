module.exports = function(app, models) {

  // 全件取得 スラッシュのとき
  app.get('/', function(req, res) {
    var table = 'costs';
    var userId = 3;

    var _include =  [{
      model: models.users,
      where: {id: userId}
    }];
    console.log(_include);
    models[table].findAll({
      include: _include
    }).then(function(results) {
      res.render("index", {
        scripts: ["app"],
        costsList: results.map(function(result) {
          console.log(result.toJSON());
          return result.toJSON()
        })
      });
    });
  });
  // models.costs.findAll({
  //   include: [{
  //     model: models.group,
  //     where: { id: 3 }
  //   }]
  // })
  //   .then(function(results) {
  //     console.log(results.map(function(result){
  //       return result.toJSON();
  //     }));
  //   });
  // ==========================================


  // 1件登録
  app.post('/post/:table', function(req, res) {
    var table = req.params.table;
    models[table].create({
        username: 'test'
      })
      .then(function(result) {
        console.log(result)
      });
  });
  // models.users.create({
  //     username: 'test'
  //   })
  //   .then(function(result) {
  //       console.log(result)
  //   });
  // ==========================================
  app.get('/detail/:id', function(req, res) {
    models.costs.findOne({
      include: [{
        model: models.users,
        where: {
          id: id
        }
      }]
    }).then(function(results) {

    });
  });
  // 1件取得
  // models.users.findOne({
  //   where: {
  //     id: 2
  //   }
  // }).then(function(result){
  //   console.log(result);
  // });
  //
  // ==========================================
  // app.put('/update/:table/:id', function(req,res){
  //   var id = req.params.id;
  //   models[table].update({
  //     //あぷで内容
  //       username: 'みす'
  //     }, {
  //       where: {
  //         id: id
  //       }
  //     })
  //     .then(function(result) {
  //       console.log(result);
  //     });
  // });
  // // 1件更新
  // models.users.update({
  //     username: 'みす'
  //   }, {
  //     where: {
  //       id: 3
  //     }
  //   })
  //   .then(function(result) {
  //     console.log(result);
  //   });
  // ==========================================


}





// // 1件更新
// models.users.update({
//     username: 'みす'
//   }, {
//     where: {
//       id: 3
//     }
//   })
//   .then(function(result) {
//     console.log(result);
//   });
// 1件削除
// models.users.destroy({
//     where: {
//       id: 3
//     }
//   })
//   .then(function(result) {
//     console.log(result);
//   });
