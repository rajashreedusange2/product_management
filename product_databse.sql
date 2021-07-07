/*
SQLyog Ultimate v11.11 (32 bit)
MySQL - 5.5.5-10.4.19-MariaDB : Database - product_database
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`product_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `product_database`;

/*Table structure for table `tbl_product_master` */

DROP TABLE IF EXISTS `tbl_product_master`;

CREATE TABLE `tbl_product_master` (
  `product_id` bigint(20) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `sku_number` varchar(20) DEFAULT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `product_price` bigint(10) DEFAULT NULL,
  `stock_level` bigint(200) DEFAULT NULL,
  `product_create_date` datetime DEFAULT NULL,
  `product_update_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_active_flag` tinyint(2) DEFAULT 1 COMMENT '1 active || 2 Delete',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `tbl_product_master` */

insert  into `tbl_product_master`(`product_id`,`product_name`,`sku_number`,`product_description`,`product_price`,`stock_level`,`product_create_date`,`product_update_date`,`product_active_flag`) values (21624292496688,'abc','12a','abc',20,10,'2021-07-07 03:07:18','2021-07-07 09:07:06',2),(21625607274694,'abc','12a','abc',20,10,'2021-07-07 03:04:34','2021-07-07 03:04:34',1),(21625611828971,'xyz','ac','tyu',12,31,'2021-07-07 04:20:28','2021-07-07 09:12:06',2),(21625628253649,NULL,NULL,NULL,NULL,NULL,'2021-07-07 08:54:13','2021-07-07 09:13:13',2),(31625604365480,'abc','12a','abc',20,10,'2021-07-07 02:16:05','2021-07-07 09:12:13',2),(31625628392170,NULL,NULL,NULL,NULL,NULL,'2021-07-07 08:56:32','2021-07-07 09:13:23',2),(31625637826429,'123','123','123',123,123,'2021-07-07 11:33:46','2021-07-07 11:33:46',1),(31625642344037,'dress','abc78','nice dress',12,10,'2021-07-07 12:49:04','2021-07-07 12:49:04',1),(41625627978607,'abc','45698','plkjh',10,10,'2021-07-07 08:49:38','2021-07-07 09:14:18',2),(51625607166499,'abc','12a','abc',20,10,'2021-07-07 03:02:46','2021-07-07 03:02:46',1),(51625611794080,'abc','452a','abc',20,10,'2021-07-07 04:19:54','2021-07-07 09:44:27',2),(51625627687160,'shree','8520','abcd',10,30,'2021-07-07 08:44:47','2021-07-07 09:14:48',2),(61625603545421,'abc','12a','abc',20,10,'2021-07-07 02:02:25','2021-07-07 02:12:26',2),(61625635565610,'add','123','ahnc',12,12,'2021-07-07 10:56:05','2021-07-07 10:56:05',1),(71625611898247,'abc','av','abc',10,20,'2021-07-07 04:21:38','2021-07-07 10:47:50',2),(71625627817091,'abc','12','athc',20,120,'2021-07-07 08:46:57','2021-07-07 08:46:57',1),(71625628249084,'shruti','741','abc',10,12,'2021-07-07 08:54:09','2021-07-07 09:14:27',2),(71625628346888,'raja','12','abnvch',10,12,'2021-07-07 08:55:46','2021-07-07 09:07:29',2);

/*Table structure for table `tbl_product_user_mapping` */

DROP TABLE IF EXISTS `tbl_product_user_mapping`;

CREATE TABLE `tbl_product_user_mapping` (
  `userid` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `active_flag` tinyint(4) DEFAULT 1 COMMENT '1 Active| 2 Deleted',
  `createdon` datetime DEFAULT NULL,
  `updatedon` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`userid`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `tbl_product_user_mapping` */

insert  into `tbl_product_user_mapping`(`userid`,`product_id`,`active_flag`,`createdon`,`updatedon`) values (0,21625607274694,1,'2021-07-07 03:04:34','2021-07-07 03:04:34'),(0,51625607166499,1,'2021-07-07 03:02:46','2021-07-07 03:02:46'),(21625642308329,31625642344037,1,'2021-07-07 12:49:04','2021-07-07 12:49:04'),(41625597823364,21624292496688,1,'2021-07-07 03:07:18','2021-07-07 03:07:18'),(41625597823364,21625611828971,1,'2021-07-07 04:20:29','2021-07-07 04:20:29'),(41625597823364,21625628253649,1,'2021-07-07 08:54:13','2021-07-07 08:54:13'),(41625597823364,31625604365480,1,NULL,'2021-07-07 02:58:46'),(41625597823364,31625628392170,1,'2021-07-07 08:56:32','2021-07-07 08:56:32'),(41625597823364,31625637826429,1,'2021-07-07 11:33:46','2021-07-07 11:33:46'),(41625597823364,41625627978607,1,'2021-07-07 08:49:38','2021-07-07 08:49:38'),(41625597823364,51625611794080,1,'2021-07-07 04:19:54','2021-07-07 04:19:54'),(41625597823364,51625627687160,1,'2021-07-07 08:44:47','2021-07-07 08:44:47'),(41625597823364,61625635565610,1,'2021-07-07 10:56:05','2021-07-07 10:56:05'),(41625597823364,71625611898247,1,'2021-07-07 04:21:38','2021-07-07 04:21:38'),(41625597823364,71625627817091,1,'2021-07-07 08:46:57','2021-07-07 08:46:57'),(41625597823364,71625628249084,1,'2021-07-07 08:54:09','2021-07-07 08:54:09'),(41625597823364,71625628346888,1,'2021-07-07 08:55:47','2021-07-07 08:55:47');

/*Table structure for table `tbl_user_master` */

DROP TABLE IF EXISTS `tbl_user_master`;

CREATE TABLE `tbl_user_master` (
  `userid` bigint(20) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `createdon` datetime DEFAULT NULL,
  `active_flag` tinyint(4) DEFAULT 1 COMMENT '0 - inactive | 1 - active',
  `password` varchar(255) DEFAULT NULL,
  `updatedon` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`userid`,`mobile_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `tbl_user_master` */

insert  into `tbl_user_master`(`userid`,`name`,`mobile_number`,`email_address`,`createdon`,`active_flag`,`password`,`updatedon`) values (12345,'shree','',NULL,NULL,1,NULL,NULL),(11625633061801,'shree','7020070122','rajashreedusange2@gmail.com','2021-07-07 10:14:21',1,'Abc123',NULL),(11625639037079,'shree','7412589630','abc@gmail.com','2021-07-07 11:53:57',1,'Abc123',NULL),(11625640319391,'abc','7896541231',NULL,'2021-07-07 12:15:19',1,'Abc123',NULL),(21625642308329,'abc','9999999999',NULL,'2021-07-07 12:48:28',1,'Abc123',NULL),(31625583240734,'shree','9359479450',NULL,'2021-07-06 20:24:43',1,'Abc123',NULL),(31625583824059,'shree','9359479450',NULL,'2021-07-06 20:33:44',1,'Abc123',NULL),(31625632027984,'shree','7020070178','rajashreedusange2@gmail.com','2021-07-07 09:57:07',1,'Abc123',NULL),(31625640171904,'shree','8520369745','rajashreedusange2@gmail.com','2021-07-07 12:12:51',1,'Abc123',NULL),(31625642079359,'shree','1234567877',NULL,'2021-07-07 12:44:39',1,'Abc123',NULL),(41625597823364,'abc','9359479488',NULL,'2021-07-07 00:27:03',1,'Abc123',NULL),(41625632141535,'shree','7020070111','rajashreedusange2@gmail.com','2021-07-07 09:59:01',1,'Abc123',NULL),(41625633124487,'shree','7020070123','rajashreedusange2@gmail.com','2021-07-07 10:15:24',1,'Abc123',NULL),(51625632359705,'shree','7020070112','rajashreedusange2@gmail.com','2021-07-07 10:02:39',1,'Abc123',NULL),(51625632414912,'shree','7020070115','rajashreedusange2@gmail.com','2021-07-07 10:03:34',1,'Abc123',NULL),(51625639600883,'shree','7412589633','rajashreedusange2@gmail.com','2021-07-07 12:03:20',1,'Abc123',NULL),(61625585068105,'shree','9359479455',NULL,'2021-07-06 20:54:28',1,'Abc123',NULL),(61625638921826,'shree','7020070188','rajashreedusange2@gmail.com','2021-07-07 11:52:01',1,'Abc123',NULL),(61625640112314,'shree','8520369741','rajashreedusange2@gmail.com','2021-07-07 12:11:52',1,'Abc123',NULL),(61625642106969,'shree','1234567899','rajashreedusange2@gmail.com','2021-07-07 12:45:06',1,'Abc123',NULL),(71625638981131,'abc','7896541230',NULL,'2021-07-07 11:53:01',1,'Abc123',NULL),(81625632070705,'shree','7020070000','rajashreedusange2@gmail.com','2021-07-07 09:57:50',1,'Abc123',NULL),(81625633034830,'shree','7020070118','rajashreedusange2@gmail.com','2021-07-07 10:13:54',1,'Abc123',NULL),(81625640230530,'shree','8520369746','rajashreedusange2@gmail.com','2021-07-07 12:13:50',1,'Abc123',NULL),(81625640274696,'shree','8520369747','rajashreedusange2@gmail.com','2021-07-07 12:14:34',1,'Abc123',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
