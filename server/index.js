const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const { TelegramClient } = require("messaging-api-telegram");

// get accessToken from telegram [@BotFather](https://telegram.me/BotFather)

// async..await is not allowed in global scope, must use a wrapper

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createConnection({
  host: "localhost",
  user: "jou",
  password: "123456",
  database: "react",
});

db.connect((error) => {
  console.log("Connection Established");
});
app.get("/get", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    console.log(result);
    res.send(JSON.stringify(result));
  });
});
app.get("/getUsers", (req, res) => {
  var name = req.query.name;
  var email = req.query.email;
  var contact = req.query.contact;
  db.query(
    "SELECT * FROM users WHERE name = ? AND email = ? AND contact = ? ",
    [name, email, contact],
    (err, result) => {
      console.log(result);
      res.send(JSON.stringify(result));
    }
  );
});
app.get("/getOrders", (req, res) => {
  const sql = "SELECT * FROM orders";
  db.query(sql, (err, result) => {
    console.log(result);

    res.send(JSON.stringify(result));
  });
});
app.get("/sendFinalOrders", async (req, res) => {
  const total=req.query.total;
  const sql = "SELECT * FROM orders";
  db.query(sql, (err, result) => {
    console.log(result);
    var content = JSON.stringify(result).toString();
    console.log(content);
   

    fetch(
      `https://api.telegram.org/bot5433201631:AAFrL72wf9qnpeLAI5nMN0P1llxfPZujOl8/sendMessage?chat_id=1014271607&text=${content}${total}`,
      { method: "GET" }
    ).then(
      (success) => {
        res.send("Order placed");
      },
      (error) => {
        res.send("Order not placed");
      }
    );
    
 
    
  });
  db.query("DELETE FROM orders", (err, result) => {});
});

app.post("/add", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var contact = req.body.contact;
  db.query(
    "INSERT INTO users (name, email, contact) VALUES (?,?,?)",
    [name, email, contact],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      res.send(result);
    }
  );
});
app.post("/updateOrder", (req, res) => {
  var quantity = req.body.quantity;
  var oid = req.body.oid;

  db.query(
    "UPDATE orders SET quantity = ? WHERE oid = ? ",
    [quantity, oid],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(result);
    }
  );
});

app.post("/insert", (req, res) => {
  var pid = req.body.pid;
  var name = req.body.name;
  var price = req.body.price;
  var quantity = req.body.quantity;
  db.query(
    "INSERT INTO orders (pid, name, price,quantity) VALUES (?,?,?,?)",
    [pid, name, price, quantity],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      res.send(result);
    }
  );
});
app.post("/deleteOrder", (req, res) => {
  var oid = req.body.oid;
  db.query("DELETE FROM orders WHERE oid = ?", [oid], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.listen(5000, () => {
  console.log("Server listening at fucking port");
});
