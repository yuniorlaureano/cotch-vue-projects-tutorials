const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3128;
const saltRound = 10;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req, res, next){

 
  if (req.originalUrl == '/login') {
    next();
  }

  let token  = req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
     console.log(req.originalUrl);
    jwt.verify(token, "appSecret", function(err, decoded){
      if (err) {
            return res.json({
              success: false,
              message: "Failed to authenticate token."
            });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
    });
  }else{
    return res.status(403).send({
          success: false,
          message: "No token provided."
        });
  }
});

const isEmpty = function(value){
	return (value == '' || value == undefined);
};

app.listen(PORT, function(){
	console.log(`App running on localhost:${PORT}`);
});

app.post('/register', function(req, res){
	if (isEmpty(req.body.name) || isEmpty(req.body.email) || isEmpty(req.body.password)) {
		return res.json({
			'status': false,
			'message': 'All fields are required'
		});
	}
	bcrypt.hash(req.body.password, saltRound, function(err, hash){

		let db = new sqlite3.Database("./database/InvoicingApp.db");
		let sql = `INSERT INTO users(name,email,company_name,password) VALUES('${
          req.body.name
        }','${req.body.email}','${req.body.company_name}','${hash}')`;
        db.run(sql, function(err){
        	if (err) {
        		throw err;
        	}else{
            let user_id = this.lastID;
            let query = `SELECT * FROM users WHERE id='${user_id}'`;
            db.all(query, [], (err, rows) => {

              if (err) {
                throw err;
              }

              let user = rows[0];
              delete user.password;
              const payload = {
                user: user
              };
              let token = jwt.sign(payload, "appSecret",{
                expiresInMinutes: "24h"
              });

              return res.json({
                'status': true,
                'message': "User Created",
                'token':token
              });
            });        		
        	}
        });
        db.close();
	});
});

app.post('/login', function(req, res){
	let db = new sqlite3.Database("./database/InvoicingApp.db");
	let sql = `SELECT * from users where email='${req.body.email}'`;
	console.log(req.body.email);
	db.all(sql, [], (err, rows) => {
		if (err) { 

			throw err;
		}

		db.close();
		if (rows.length == 0) {
			return res.json({
				'status': false,
				"message": "Sorry, wrong email"
			});
		}

		let user = rows[0];
		let authenticated = bcrypt.compareSync(req.body.password, user.password);
		delete user.password;

		if (authenticated) {

          const payload = {user: user};

          let token = jwt.sign(payload, "appSecret",{
            expiresInMinutes: "24h"
          });

          return res.json({
            status: true,
            token: token
          });
        }

        return res.json({
				'status': false,
				'message': "Wrong Password, please retry"
			});
	});	
});

app.post('/invoice', function(req, res){

	if (isEmpty(req.body.name)) {
		return res.json({
          status: false,
          message: "Invoice needs a name"
        });
	}

	let db = new sqlite3.Database("./database/InvoicingApp.db");
	let sql = `INSERT INTO invoices(name,user_id,paid) VALUES(
        '${req.body.name}',
        '${req.body.user_id}',
        0
      )`;

     db.serialize(function(){
     	db.run(sql, function(err){
     		if (err) {
            throw err;
          }

          let invoice_id = this.lastID;
          for (var i = 0; i < req.body.txn_names; i++) {
          	 let query = `INSERT INTO transactions(name,price,invoice_id) VALUES(
                '${req.body.txn_names[i]}',
                '${req.body.txn_prices[i]}',
                '${invoice_id}'
            )`;

            db.run(query);
          }

           return res.json({
            status: true,
            message: "Invoice created"
          });

     	});
     });
});

app.get("/invoice/user/:user_id", function(req, res){
	let db = new sqlite3.Database("./database/InvoicingApp.db");
      let sql = `SELECT * FROM invoices LEFT JOIN transactions ON invoices.id=transactions.invoice_id WHERE user_id='${req.params.user_id}'`;
      db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        return res.json({
          status: true,
          transactions: rows
        });
      });
});

app.get("/invoice/user/:user_id/:invoice_id", function(req, res) {
      let db = new sqlite3.Database("./database/InvoicingApp.db");
      let sql = `SELECT * FROM invoices LEFT JOIN transactions ON invoices.id=transactions.invoice_id WHERE user_id='${
        req.params.user_id
      }' AND invoice_id='${req.params.invoice_id}'`;
      db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        return res.json({
          status: true,
          transactions: rows
        });
      });
    });
