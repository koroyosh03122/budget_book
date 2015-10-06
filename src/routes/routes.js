var handlebars = require('express-handlebars');

function chkFormText(text) {
  return typeof(text);
};

module.exports = function(app, models) {



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
        console.log(costs[1].createdAt);

        res.render("index", {
          scripts: ["app"],
          costsList: costs,
          groupList: groups,
          helpers: {
              cast: function (date) {
                var dateStamp = new Date(date);
                var fullYear = dateStamp.getFullYear();
                var month = dateStamp.getMonth() + 1;
                var day = dateStamp.getDay();
                var hour = dateStamp.getHours();
                var min = dateStamp.getMinutes();
                dateStamp = fullYear + '-' + month + '-' + day + ' ' + hour + ':' + min;
                console.log(dateStamp);
                return dateStamp;
                // return (new Date(date)).format("yyyy-MM-dd");
               }
          }
        });

      });
    });



    // ==========================================
    app.get('/detail/:id', function(req, res) {
      var id = req.params.id;

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
