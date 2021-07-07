const mysql = require('mysql');
const db = require('../config/db').localConnect;
// const config = require('../config/db');
const helper = require('../config/helper');
// const nodemailer = require('nodemailer');
module.exports = {
    userMobileExistCheck: function (mobile_number) {
        return new Promise((resolve, reject) => {
            let userMobileExistQuery = 'SELECT \n\
        userid \n\
    FROM \n\
        tbl_user_master \n\
    WHERE \n\
        mobile_number = ' + mysql.escape(mobile_number) + '';
            db.query({ sql: userMobileExistQuery}, (errs, rows) => {
                try {
                    if (errs) {
                        reject([]);
                    } else if (rows.length > 0) {
                        return reject({ msg: 'mobile alreday exist' });
                    } else {
                        return resolve(rows);
                    }
                } catch (err) {
                    console.log("catch error")
                    return reject({ msg: 'mobile check reject' });
                };

            });
        });
    },
    addUserDetail: (req) => {
        return new Promise((resolve, reject) => {
            let mobile_number = (req.body.mobile_number);
            let name = (req.body.name);
            let password = (req.body.password);
            let email_address = (req.body.email_address);
            let userid = req.body.userid ? req.body.userid : helper.getId();
            let userSql = 'INSERT tbl_user_master SET ';
            let userGenrSql = '';
            if (helper.checkEmpty(userid)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' userid = ' + mysql.escape(userid) + '';
            }
            if (helper.checkEmpty(mobile_number)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' mobile_number = ' + mysql.escape(mobile_number) + '';
            }
            if (helper.checkEmpty(email_address)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' email_address = ' + mysql.escape(email_address) + '';
            }
            if (helper.checkEmpty(name)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' name = ' + mysql.escape(name) + '';
            }

            if (helper.checkEmpty(password)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' password = ' + mysql.escape(password) + '';
            }

            userSql = userSql + ' ' + userGenrSql + ' , createdon = now() ON DUPLICATE KEY UPDATE ' + userGenrSql + ' ';
            console.log(userSql)
            db.query(userSql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject([]);
                } else {
                    resolve({ mobile_number: mobile_number, userid : userid });
                }
            });
        })
    },
    // sendMail: (req) => {
    //     return new Promise((resolve, reject) => {
    //             var transporter = nodemailer.createTransport({
    //                 service: 'gmail',
    //                 secure: false,
    //                 port: 587,
    //                 auth: {
    //                     user: config.user,
    //                     pass: config.pass
    //                 },
    //                 tls: { rejectUnauthorized: false },
    //             });
    //             const mailOptions = {
    //                 from: config.user,
    //                 to: req.query.email_address,
    //                 subject: 'registered successfully',
    //                 text: 'registered successfully'
    //             };
    //             transporter.sendMail(mailOptions, (err, info) => {
    //                 if (err) {
    //                     console.log(err);
    //                     return reject([]);
    //                 } else {
    //                     return resolve({ email_address: email_address});
    //                 }
    //             });
    //     });
    // },
    addProductDetail: (req) => {
        return new Promise((resolve, reject) => {
            let userid = req.body.userid ? req.body.userid : '';
            let product_id = req.body.product_id ? req.body.product_id : helper.getId();
            let product_name = req.body.product_name ? req.body.product_name : '';
            let sku_number = req.body.sku_number ? req.body.sku_number : '';
            let product_description = req.body.product_description ? req.body.product_description : '';
            let product_price = req.body.product_price ? req.body.product_price : '';
            let stock_level = req.body.stock_level ? req.body.stock_level : '';

            let userSql = 'INSERT tbl_product_master SET ';
            let userGenrSql = '';
            if (helper.checkEmpty(product_id)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' product_id = ' + mysql.escape(product_id) + '';
            }
            if (helper.checkEmpty(product_name)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' product_name = ' + mysql.escape(product_name) + '';
            }
            if (helper.checkEmpty(sku_number)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' sku_number = ' + mysql.escape(sku_number) + '';
            }
            if (helper.checkEmpty(product_description)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' product_description = ' + mysql.escape(product_description) + '';
            }
            if (helper.checkEmpty(product_price)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' product_price = ' + mysql.escape(product_price) + '';
            }
            if (helper.checkEmpty(stock_level)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' stock_level = ' + mysql.escape(stock_level) + '';
            }

            userSql = userSql + ' ' + userGenrSql + ' , product_create_date = now() ON DUPLICATE KEY UPDATE ' + userGenrSql + ' ';

            db.query(userSql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject([]);
                } else {
                    resolve({userid:userid, product_id: product_id });
                }
            });
        })
    },
    addProductUserDetail: (data) => {
        return new Promise((resolve, reject) => {
            let userid = data.userid ? data.userid : '';
            let product_id = data.product_id ? data.product_id : '';

            let userSql = 'INSERT tbl_product_user_mapping SET ';
            let userGenrSql = '';
            if (helper.checkEmpty(userid)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' userid = ' + mysql.escape(userid) + '';
            }
            if (helper.checkEmpty(product_id)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' product_id = ' + mysql.escape(product_id) + '';
            }

            userSql = userSql + ' ' + userGenrSql + ' , createdon = now() ON DUPLICATE KEY UPDATE ' + userGenrSql + ' ';

            db.query(userSql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject([]);
                } else {
                    resolve("Product Detail Updated");
                }
            });
        })
    },
    deleteProductDetail: (req) => {
        return new Promise((resolve, reject) => {
            let product_id = req.body.product_id ? req.body.product_id : '';
            let product_active_flag = 2;

            let userSql = 'INSERT tbl_product_master SET ';
            let userGenrSql = '';
            if (helper.checkEmpty(product_id)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' product_id = ' + mysql.escape(product_id) + '';
            }
            if (helper.checkEmpty(product_active_flag)) {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' product_active_flag = ' + mysql.escape(product_active_flag) + '';
            }

            userSql = userSql + ' ' + userGenrSql + ' ON DUPLICATE KEY UPDATE ' + userGenrSql + ' ';

            db.query(userSql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject([]);
                } else {
                    resolve("deleted Product Detail");
                }
            });
        })
    },
    getAllProductByUserid: (req) => {
        return new Promise((resolve, reject) => {
            let userid = req.query.userid ? req.query.userid : '';
            let result = [];
            let sQuery = '';
            sQuery = ' SELECT \n\
                       pc.userid, \n\
                       pc.product_id, \n\
            p.product_id,\n\
            p.sku_number, \n\
            p.product_description, \n\
            p.product_price, \n\
            p.stock_level, \n\
            p.product_name ';
            sQuery += ' FROM \n\
            tbl_product_user_mapping pc,tbl_product_master p \n\
                      WHERE pc.product_id = p.product_id AND product_active_flag = 1 ';
            if (userid != '') {
                sQuery += ' AND userid = ' + mysql.escape(userid) + "";
            }
            db.query(sQuery, (err, rows) => {
                if (err) {
                    console.log(err)
                    return reject([]);
                } else if (rows && rows.length) {
                    rows.forEach(element => {
                        result.push({
                            userid: element.userid,
                            product_id: element.product_id,
                            product_name: element.product_name,
                            sku_number: element.sku_number,
                            product_description: element.product_description,
                            product_price:element.product_price,
                            stock_level: element.stock_level
                        });
                    });
                    return resolve(result);

                } else {
                    return reject({ msg: "data not found" });
                }
            });
        });
    },
    getProductDetailByProductid: (req) => {
        return new Promise((resolve, reject) => {
            let product_id = req.query.product_id ? req.query.product_id : '';
            let result = [];
            let sQuery = '';
            sQuery = ' SELECT \n\
                product_id,\n\
                sku_number, \n\
                product_description, \n\
                product_price, \n\
                stock_level, \n\
                product_name ';
            sQuery += ' FROM \n\
             tbl_product_master p \n\
                      WHERE product_active_flag = 1 ';
            if (product_id != '') {
                sQuery += ' AND product_id = ' + mysql.escape(product_id) + "";
            }
            db.query(sQuery, (err, rows) => {
                if (err) {
                    console.log(err)
                    return reject([]);
                } else if (rows && rows.length) {
                    rows.forEach(element => {
                        result.push({
                            product_id: element.product_id,
                            product_name: element.product_name,
                            sku_number: element.sku_number,
                            product_description: element.product_description,
                            product_price:element.product_price,
                            stock_level: element.stock_level
                        });
                    });
                    return resolve(result);

                } else {
                    return reject({ msg: "data not found" });
                }
            });
        });
    }
}
