module.exports = function(app, models) {

  // 全件取得 スラッシュのとき
  app.get('/', function(req, res) {
    models.costs.findAll({
      // include: [{
      // }]
    }).then(function(results) {
      res.render("index", {
        scripts: ["app"],
        costsList :  results.map(function(result) {
          console.log(result.toJSON());
          return result.toJSON()
        })
      });
    });
  });
}


// 全件取得 スラッシュのとき
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
// 1件取得
// models.users.findOne({
//   where: {
//     id: 2
//   }
// }).then(function(result){
//   console.log(result);
// });
//
// // 1件登録
// models.users.create({
//     username: 'test'
//   })
//   .then(function(result) {
//       console.log(result)
//   });
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
