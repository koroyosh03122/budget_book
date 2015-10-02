var chkFormText = function(text) {
  return typeof(text);
};


module.exports = function(app, models) {

    // // 1件登録(内容)
    app.post('/post', function(req, res) {
      // parseInt
      var costText = parseInt(req.body.costText, 10);
      var groupId = parseInt(req.body.groupId, 10);
      var userId = 3;

      // 空白エラー
      if (costText && groupId) {
        // 文字列型以外
        if (chkFormText(costText) === 'number' && chkFormText(costText) === 'number') {
          models.costs.create({
              userId: userId,
              groupId: groupId,
              costText: costText
          }).then(function(result) {
              res.redirect(301, '/');
          });
        }
      }
    });

    // 全件取得 スラッシュのとき
    app.get('/', function(req, res) {
      var userId = 3;
      models.group.findAll().then(function(groups) {
        return models.costs.findAll({
          include: [{
            model: models.users,
            where: {
              id: userId
            }
          }, {
            model: models.group
          }]
        }).then(function(costs) {
          var _costs = costs.map(function(cost) {
            return cost.toJSON();
          });
          var _groups = groups.map(function(group) {
            return group.toJSON();
          });
          return [_costs, _groups];
        });
      }).spread(function(costs, groups) {
        res.render("index", {
          scripts: ["app"],
          costsList: costs,
          groupList: groups
        });
      });
    });
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


  }
  // ==========================================
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
