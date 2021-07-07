const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const HttpStatus = require('http-status-codes');
let mysql = require('mysql');
const db = require('../config/db').localConnect;



router.post('/signupUser', function (req, res) {
    let userid = req.body.userid;
    let mobile_number = req.body.mobile_number;
    let mobileCheck = userController.userMobileExistCheck(mobile_number);
    mobileCheck.then((data) => {
            userController.addUserDetail(req).then((data) => {
            //   userController.sendMail(req).then((data) => {
                userid = data.userid;
                    res.send({
                        "userid": userid,
                    });
            // }).catch((e) => {
            //     res.status(HttpStatus.CONFLICT).send(e);
            //     console.log(e)
            // });
        }).catch((e) => {
            res.status(HttpStatus.CONFLICT).send(e);
            console.log(e);
        });
    }).catch((e) => {
        res.status(HttpStatus.OK).send(e);
        console.log(e);
    });
});
router.post('/loginUser', function (req, res) {
    let mobile_number = req.body.mobile_number;
    let password = req.body.password;
    let sQuery = '';
    sQuery = ' SELECT \n\
                     userid, \n\
                     userid AS uid, \n\
                     name ';
    sQuery += ' FROM \n\
                     tbl_user_master \n\
               WHERE active_flag = 1  ';           
    sQuery += '  AND mobile_number = ' + mysql.escape(mobile_number) + '';
    sQuery += '  AND  password = ' + mysql.escape(password) + '  ';
    db.query({ sql: sQuery }, function (err, rows, fields) {
        if (err) {
            res.status(HttpStatus.CONFLICT).send([]);
        }
        else if (rows && rows.length) {
            results = {
                userid: rows[0].userid,
                name: rows[0].name,
                mobile_number: rows[0].mobile_number,
                active_flag: rows[0].actflg,
            };
            res.status(HttpStatus.OK).send(results);
        } else {
            res.status(HttpStatus.NOT_FOUND).send([]);
            return;
        }
    });
});
router.post('/addAndUpdateProduct', (req, res) => {
    userController.addProductDetail(req).then((data) => {
     userController.addProductUserDetail(data).then((data) => {
      res.status(HttpStatus.OK).send(data)
    }).catch((e) => {
        res.status(HttpStatus.CONFLICT).send(e);
      });
    }).catch((e) => {
      res.status(HttpStatus.CONFLICT).send(e);
    });
});
router.post('/deleteProductByProductId', (req, res) => {
    userController.deleteProductDetail(req).then((data) => {
      res.status(HttpStatus.OK).send(data)
    }).catch((e) => {
      res.status(HttpStatus.CONFLICT).send(e);
      console.log(e)
    });
});
router.get("/getAllProductByUserid", (req, res) => {
    userController.getAllProductByUserid(req).then((data) => {
      res.send(data);
    }).catch((e) => {
      res.status(HttpStatus.CONFLICT).send(e);
    });
});
router.get("/getProductDetailByProductid", (req, res) => {
    userController.getProductDetailByProductid(req).then((data) => {
      res.send(data);
    }).catch((e) => {
      res.status(HttpStatus.CONFLICT).send(e);
    });
});
module.exports = router
