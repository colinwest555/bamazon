var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",


  password: "password",
  database: "bamazon_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  showTable();


});

function showTable() {
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    console.table(res);
  }
  )
}
itemSearch();
function itemSearch() {
  inquirer
    .prompt({
      name: "itemSearch",
      type: "input",
      message: "What is the id number of the item you would like to buy?"
    })
    .then(function (answer) {
      console.log(answer);
      connection.query("SELECT * FROM products WHERE ?", { item_id: parseInt(answer.itemSearch) }, function (err, res) {

        console.log(
          "you have purchased" +
          res[0].product_name +

          " for $" +
          res[0].price,

        );
        var tableLength
        var newStock = parseInt(res[0].stock_quantity) - 1
        console.log(newStock)
        if (answer > 0 && answer <= tableLength) {
          connection.query("UPDATE products SET ? where ?", [{ stock_quantity: newStock }, { item_id: newStock }])
        }
      });
    })
}

