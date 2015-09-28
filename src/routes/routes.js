module.exports = function(app, models) {
  console.log(models);


};





// var _ = require("lodash");
//
// var redis = require("redis"),
//   client = redis.createClient();
//
// var CACHE_EXPIRE = 60;
//
// var CACHE_PREFIX = "todo:";
//
// client.on("error", function(err) {
//   console.log("Error" + err);
// });
//
// //全件一覧そーと
// var result_sort = function(orderBy, reply) {
//   if (orderBy) {
//     if (orderBy == "asc") {
//       reply = _.sortBy(reply, function(record) {
//         return new Date(record.updatedAt);
//       });
//     }
//     if (orderBy == "desc") {
//       reply = _.sortBy(reply, function(record) {
//         return new Date(record.updatedAt);
//       });
//       reply.reverse();
//     }
//   }
// }
//
// var record_destroy = function(table, contentIDs, cb) {
//   models[table].destroy({
//       where: {
//         id: contentIDs
//       }
//     })
//     .then(function(result) {
//       client.del(CACHE_PREFIX + table + ":all", function(err, reply) {
//         client.del(CACHE_PREFIX + table, function(err, reply) {
//           return res.status(200).json(JSON.parse(reply));
//         });
//       });
//     })
//     .catch(function(err) {
//       return res.status(500).json({
//         status: 500,
//         message: "500 Internal Server Error."
//       });
//     });
// }
//
//
// module.exports = function(app, models) {
//
//   app.get('/', function(req, res) {
//     res.render("index", {
//       scripts: ["app"]
//     });
//   });
//
//   app.get('/detail/:id', function(req, res) {
//     res.render("detail", {
//       id: parseInt(req.params.id),
//       scripts: ["detail", "app"]
//     });
//   });
//
//
//   //  とっぷぺーじ
//   //  リスト全件取得/１件削除/Insert
//   app.get('/api/v1/:table', function(req, res) {
//     var orderBy = req.query.orderBy;
//     var table = req.params.table;
//     client.get(CACHE_PREFIX + table + ":all", function(err, reply) {
//       reply = JSON.parse(reply);
//       if (reply) {
//         //sort_function
//         result_sort(orderBy, reply);
//         return res.status(200).json(reply);
//       }
//
//       models[table].findAll()
//         .then(function(result) {
//           client.set(CACHE_PREFIX + table + ":all", JSON.stringify(result), function(err, reply) {
//             client.expire(CACHE_PREFIX + table + ":all", CACHE_EXPIRE);
//             //sort_function
//             result_sort(orderBy, result);
//             return res.status(200).json(result);
//           });
//         });
//     });
//   });
//
//   //全件DELETE
//   app.delete('/api/v1/:table', function(req, res) {
//     var table = req.params.table;
//     var contentIDs = [];
//     client.get(CACHE_PREFIX + table + ":all", function(err, reply) {
//       reply = JSON.parse(reply);
//       if (reply) {
//         contentIDs = _.pluck(reply, 'id');
//
//         ///!!
//         record_destroy(table, contentIDs, function(err,n){
//           if(err){
//             return res.status(500).json({
//               status: 500,
//               message: "500 Internal Server Error."
//             });
//           }
//         });
//         return
//       }
//
//       models[table].findAll()
//         .then(function(result) {
//           //3.全id取得後、配列にする
//           contentIDs = _.pluck(result, 'id');
//           models[table].destroy({
//               where: {
//                 id: contentIDs
//               }
//             })
//             .then(function(result) {
//               client.del(CACHE_PREFIX + table + ":all", function(err, reply) {
//                 client.del(CACHE_PREFIX + table, function(err, reply) {
//                   return res.status(200).json(JSON.parse(reply));
//                 });
//               });
//             })
//             .catch(function(err) {
//               return res.status(500).json({
//                 status: 500,
//                 message: "500 Internal Server Error."
//               });
//             });
//           // console.log(contentIDs);
//         });
//     });
//
//     // console.log(contentIDs);
//     //配列化したIDSをデストロイ！！！！
//
//   });
//
//   //hget----1件検索
//   app.get('/api/v1/:table/:id', function(req, res) {
//     var table = req.params.table;
//     var id = parseInt(req.params.id);
//
//     client.hget(CACHE_PREFIX + table, id, function(err, reply) {
//
//       if (reply) {
//         return res.status(200).json(JSON.parse(reply));
//       }
//       models[table].findOne({
//           where: {
//             id: id
//           }
//         })
//         .then(function(result) {
//
//           if (!result) {
//
//             return res.status(404).json({
//               status: 404,
//               message: "Record not found."
//             });
//           }
//           client.hset(CACHE_PREFIX + table, id, JSON.stringify(result), function(err, reply) {
//             client.expire(CACHE_PREFIX + table, CACHE_EXPIRE);
//             return res.status(200).json(result);
//           });
//         });
//     });
//   });
//
//
//   //INSERT
//   app.post('/api/v1/:table', function(req, res) {
//     var table = req.params.table;
//     var text = req.body.text;
//
//     models[table].create({
//         text: text
//       })
//       .then(function(result) {
//         client.del(CACHE_PREFIX + table + ":all", function(err, reply) {
//           return res.status(200).json(result);
//         });
//       })
//       .catch(function(err) {
//         return res.status(500).json({
//           status: 500,
//           message: "500 Internal Server Error."
//         }); //return
//       }); //catch
//   });
//
//
//   //！！！！！
//   //1件DELETE
//   app.delete('/api/v1/:table/:id', function(req, res) {
//     var table = req.params.table;
//     var id = parseInt(req.params.id);
//
//     models[table].destroy({
//         where: {
//           id: id
//         }
//       })
//       .then(function(result) {
//         client.del(CACHE_PREFIX + table + ":all", function(err, reply) {
//           client.hdel(CACHE_PREFIX + table, id, function(err, reply) {
//             return res.status(200).json(JSON.parse(reply));
//           });
//         });
//       })
//       .catch(function(err) {
//         return res.status(500).json({
//           status: 500,
//           message: "500 Internal Server Error."
//         });
//       });
//   });
//
//
//   //  Bページ
//   //  UPDATE,DEL
//   app.put('/api/v1/:table/:id', function(req, res) {
//     var table = req.params.table;
//     var id = parseInt(req.params.id);
//     var text = req.body.text;
//
//     //text
//     if (!text) {
//       return res.status(400).json({
//         status: 400,
//         message: "text not valid."
//       });
//     }
//     models[table].update({
//         text: text
//       }, {
//         where: {
//           id: id
//         }
//       })
//       .then(function(result) {
//         client.del(CACHE_PREFIX + table + ":all", function(err, reply) {
//           client.hdel(CACHE_PREFIX + table, id, function(err, reply) {
//             return res.status(200).json(JSON.parse(result));
//           });
//         });
//       })
//       .catch(function(err) {
//         return res.status(500).json({
//           status: 500,
//           message: "500 Internal Server Error."
//         });
//       });
//   });
//
// };
