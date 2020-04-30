-- MySQL dump 10.13  Distrib 5.7.14, for Linux (x86_64)
--
-- Host: localhost    Database: mysql
-- ------------------------------------------------------
-- Server version	5.7.14-google-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `new_db_my_pp`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `new_db_my_pp` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `new_db_my_pp`;

--
-- Table structure for table `fed_messages`
--

DROP TABLE IF EXISTS `fed_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fed_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_user_id` int(11) NOT NULL,
  `recipient_user_id` int(11) NOT NULL,
  `msg_date` datetime DEFAULT NULL,
  `msg_text` text COLLATE utf8mb4_bin,
  `forward_status` enum('0','1') COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `is_read` tinyint(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sender_user_id` (`sender_user_id`),
  KEY `recipient_user_id` (`recipient_user_id`),
  CONSTRAINT `fed_messages_ibfk_1` FOREIGN KEY (`sender_user_id`) REFERENCES `fed_user` (`msg_user_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fed_messages_ibfk_2` FOREIGN KEY (`recipient_user_id`) REFERENCES `fed_user` (`msg_user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=234 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fed_messages`
--

LOCK TABLES `fed_messages` WRITE;
/*!40000 ALTER TABLE `fed_messages` DISABLE KEYS */;
INSERT INTO `fed_messages` VALUES (1,40,36,'2013-06-06 10:57:17','❤️HELLO WOLRD','1',0),(2,36,38,'2013-06-06 11:03:49','another message','0',0),(3,38,36,'2013-06-06 12:29:33','some message ?Hello\r\n','0',0),(4,38,36,'2013-06-06 12:29:53','updated last message','0',0),(5,36,38,'2013-06-06 12:47:26','uGY8AAAbbbDeleted: InappropriateuGY8AAAccc','0',0),(6,36,40,'2013-06-10 16:22:46','some message','0',0),(7,40,36,'2019-05-30 03:00:00','Hello John\r\n\r\n','1',0),(8,36,40,'2019-05-29 04:00:00','Hey fez my resposn','0',0),(9,41,36,'2019-05-29 01:00:00','hELLO ITS fEZ','0',0),(10,36,40,'2019-05-29 08:01:00','mY RESPONSE','0',0),(11,36,42,'2019-05-29 09:00:00','uGY8AAAbbbDeleted: TypouGY8AAAccc','0',0),(12,40,38,'2019-05-29 19:00:00','Not show','0',0),(13,38,36,'2019-05-29 21:00:00','This one should show','0',0),(14,40,38,'2019-05-30 17:00:00','testes test','0',0),(15,36,41,'2019-05-31 23:00:00','Hey, friday test','0',1),(17,36,40,'2019-06-03 10:15:23','I need to build an Empire Bob theBuilder\n','0',1),(18,41,36,'2019-06-03 11:09:10','Eira bro\n','0',1),(19,41,36,'2019-06-03 11:14:41','test message\n','0',1),(20,41,36,'2019-06-03 11:15:57','Eita\n','0',1),(21,41,36,'2019-06-03 11:20:00','Olaa\n','0',1),(22,41,36,'2019-06-03 11:20:09','ola\n','0',1),(23,36,41,'2019-06-03 11:22:27','ol\n','0',1),(24,36,41,'2019-06-03 11:23:25','test 4\n','0',1),(25,36,41,'2019-06-03 11:24:12','tewstr 5\n','0',1),(26,41,36,'2019-06-03 11:24:21','ol\n','0',1),(27,40,36,'2019-06-03 23:00:00','Heita','0',1),(28,41,36,'2019-06-03 11:28:26','Ola\n','0',1),(29,41,36,'2019-06-03 11:33:36','Ola\n','0',1),(30,36,40,'2019-06-03 11:35:57','uGY8AAAbbbDeleted: Wrong destinationuGY8AAAccc','0',1),(31,36,40,'2019-06-03 11:36:28','uGY8AAAbbbDeleted: Wrong destinationuGY8AAAccc','0',1),(32,36,40,'2019-06-03 11:36:52','uGY8AAAbbbDeleted: TypouGY8AAAccc','0',1),(33,41,36,'2019-06-03 11:37:23','ola\n','0',1),(34,41,36,'2019-06-03 11:37:43','un\n','0',1),(35,41,36,'2019-06-03 11:38:25','uGY8AAAbbbDeleted: Wrong destinationuGY8AAAccc','0',1),(36,41,36,'2019-06-03 11:39:04','hi\n','0',1),(37,41,36,'2019-06-03 11:39:34','hi\n','0',1),(38,36,41,'2019-06-03 11:42:21','hi\n','0',1),(39,41,36,'2019-06-03 11:42:43','unj\n','0',1),(40,41,36,'2019-06-03 11:42:53','k\n','0',1),(41,40,36,'2019-06-03 16:57:15','Bob\n','0',1),(57,36,41,'2019-06-10 13:59:25','uGY8AAAbbbDeleted: TypouGY8AAAccc','0',1),(59,36,38,'2019-06-13 14:46:18','hi, how are you?\n','0',1),(60,36,38,'2019-06-13 19:04:32','Hi\n','0',1),(61,36,38,'2019-06-13 19:05:20','Unjani?\n','0',1),(62,38,36,'2019-06-14 13:33:34','Hello WOrld\n','0',1),(63,36,42,'2019-06-20 17:07:00','uGY8AAAbbbDeleted: TypouGY8AAAccc','0',1),(64,38,36,'2019-06-22 20:10:37','Hello\n','0',1),(65,38,36,'2019-06-22 20:13:48','fff\n','0',1),(67,36,38,'2019-07-05 09:22:22','?Hello','0',1),(68,36,38,'2019-07-05 10:13:30','❤️HELLO WOLRD','1',1),(69,36,42,'2019-07-05 10:22:00',' some message ?Hello\n','1',1),(70,36,38,'2019-07-05 10:33:39',' Deleted: Typo','1',1),(71,36,38,'2019-07-05 10:45:35',' <span style=\"font-family : Monospace; color: #fc8a9e;\">Deleted: Typo</span>','1',1),(72,36,38,'2019-07-07 20:36:01','hi, how are you? ','0',1),(73,36,38,'2019-07-07 20:36:23','??Hello\n\n','0',1),(74,38,36,'2019-07-07 20:38:22','hhv uhuh uhuh uhuh jhj huh uhuh huhu huh me\n','0',1),(75,36,38,'2019-07-07 20:38:39','?????\n\n','0',1),(76,36,38,'2019-07-07 20:39:26','\n\n??\n','0',1),(77,36,38,'2019-07-07 20:51:53','Hello Fezz, how are you?\n\n','0',1),(78,36,38,'2019-07-07 20:53:10','??Hello\n\n','0',1),(79,36,38,'2019-07-07 20:59:38','Hello\n\n','0',1),(80,36,38,'2019-07-07 21:10:54','Hi\n\n','0',1),(81,36,38,'2019-07-07 21:40:38','He, how are you?\n\n','0',1),(82,36,38,'2019-07-07 21:40:51','?Star eys\n\n','0',1),(83,36,38,'2019-07-07 21:40:57','???','0',1),(84,38,36,'2019-07-07 21:41:27','?My reply\n\n','0',1),(85,36,38,'2019-07-07 22:07:03','Hello\n\n','0',1),(86,36,38,'2019-07-07 22:11:04','Test message\n\n','0',1),(87,36,38,'2019-07-07 22:12:45','hello world\n\n','0',1),(88,36,38,'2019-07-07 22:15:10','Test it again\n\n','0',1),(89,38,36,'2019-07-07 22:16:00','Hello  Rich\n\n','0',1),(90,36,38,'2019-07-07 22:18:02','hsdh\n\n','0',1),(91,36,38,'2019-07-07 22:18:13','Hi\n\n','0',1),(92,36,38,'2019-07-07 22:18:16','wdw\n\n','0',1),(93,36,38,'2019-07-07 22:18:45','Hey\n\n','0',1),(94,36,38,'2019-07-07 22:19:15','Molweni\n\n','0',1),(95,38,36,'2019-07-07 22:20:10','Hello More\n\n','0',1),(96,36,38,'2019-07-07 22:23:52','Unjani Rich?\n\n','0',1),(97,38,36,'2019-07-07 22:26:08','Ndisharp wena\n\n','0',1),(98,36,38,'2019-07-07 22:26:51','uGY8AAAbbbDeleted: InappropriateuGY8AAAccc','0',1),(99,38,36,'2019-07-07 22:27:51','Wud?\n\n','0',1),(100,36,38,'2019-07-07 22:28:09','uGY8AAAbbbDeleted: Wrong destinationuGY8AAAccc','0',1),(101,38,40,'2019-07-08 08:03:41',' Ndisharp wena\n\n','1',1),(102,38,36,'2019-07-08 08:03:44',' Ndisharp wena\n\n','1',1),(103,38,40,'2019-07-08 08:03:45',' Ndisharp wena\n\n','1',1),(104,38,36,'2019-07-08 08:03:57',' Ndisharp wena\n\n','1',1),(105,38,40,'2019-07-08 08:04:02',' Unjani Rich?\n\n','1',1),(110,36,38,'2019-07-17 22:40:00','jhssj sddjsjj sdsjdn sjds sj dsdjs siksd sadiksd sks d sd s skds ks dskdsk sk dksskd sks dks dksks kdksa s ksk dskd k dk sk ks dks sk dskd skd sk dskd ksk sksdk sd sk sdskd ssdsmdismsimsiidismdsis dsds dis kssk sds dksd sk dksd skd ks dskds sds','0',1),(111,36,38,'2019-07-17 22:41:35','uGY8AAAbbbDeleted: TypouGY8AAAccc','0',1),(125,48,49,'2019-07-18 11:20:47','Hi new\n\n','0',1),(126,36,48,'2019-07-18 11:27:21','Hi\n\n','0',1),(127,36,40,'2019-07-18 11:29:32','uGY8AAAbbbDeleted: InappropriateuGY8AAAccc','0',1),(128,38,40,'2019-07-18 11:30:19','Hi boib\n\n','0',1),(148,36,42,'2019-07-29 11:56:00','More\n\n','0',1),(149,36,42,'2019-07-29 12:03:39','Hi Mr Plaatyi\n\n','0',1),(150,38,40,'2019-07-29 22:50:17','lol ola\n\n','0',1),(151,38,40,'2019-07-29 22:50:24','We were logged in using same account\n\n','0',1),(152,38,36,'2019-07-29 22:51:02','Ola ntwanas\n\n','0',1),(153,38,36,'2019-07-29 22:51:23','We were logged in suing same aacount\n\n','0',1),(154,36,38,'2019-07-29 23:26:48','Ola ntwanas\n\n','0',1),(155,38,36,'2019-07-29 23:27:28','Ola\n\n','0',1),(156,38,36,'2019-07-29 23:27:30','Ugrand?\n\n','0',1),(157,36,38,'2019-07-29 23:27:53','why is it not notifying xa kungena message\n\n\n','0',1),(158,38,36,'2019-07-29 23:28:12','Ayiyenzi?\n\n','0',1),(159,38,36,'2019-07-29 23:28:30','uGY8AAAbbbDeleted: Wrong destinationuGY8AAAccc','0',1),(160,38,36,'2019-07-29 23:29:15','Ola\n\n','0',1),(161,38,36,'2019-07-29 23:29:19','Talk ntwanas\n\n','0',1),(162,36,38,'2019-07-29 23:33:04','Ola it does now ntwana\n\n','0',1),(163,36,38,'2019-07-29 23:33:23','I noticed its because I was in our chat\n\n','0',1),(164,36,38,'2019-07-30 00:09:59','Ntwana \n\n','0',1),(165,38,40,'2019-08-07 00:17:09',' Talk ntwanas\n\n','1',1),(166,38,40,'2019-08-07 00:17:15',' Talk ntwanas\n\n','1',1),(167,38,36,'2019-08-07 00:18:48',' lol ola\n\n','1',1),(168,38,36,'2019-08-07 00:18:50',' lol ola\n\n','1',1),(169,38,36,'2019-08-07 00:18:52',' lol ola\n\n','1',1),(170,38,36,'2019-08-07 00:18:53',' lol ola\n\n','1',1),(171,38,40,'2019-08-07 00:19:42',' Ntwana \n\n','1',1),(172,36,48,'2019-08-07 16:26:16',' Ntwana \n\n','1',1),(173,36,48,'2019-08-07 23:06:02','uGY8AAAbbbDeleted: InappropriateuGY8AAAccc','0',1),(174,36,48,'2019-08-08 07:39:58','uGY8AAAbbbDeleted: InappropriateuGY8AAAccc','0',1),(175,38,36,'2019-08-08 18:45:42','Eita, how is it?\n\n','0',1),(176,38,36,'2019-08-08 18:45:56','Ola boss, hoezit?\n\n','0',1),(177,36,38,'2019-08-08 18:46:51','uGY8AAAbbbDeleted: Wrong destinationuGY8AAAccc','0',1),(178,36,38,'2019-08-08 19:25:35','Ola lapho\n\n','0',1),(179,38,36,'2019-08-08 19:25:43','EIta boss\n\n','0',1),(180,38,40,'2019-08-08 19:26:14','uGY8AAAbbbDeleted: TypouGY8AAAccc','0',1),(181,38,36,'2019-08-08 19:27:40','uGY8AAAbbbDeleted: Wrong destinationuGY8AAAccc','0',1),(182,36,38,'2019-08-10 13:11:05','?????yE7','0',1),(187,55,54,'2019-08-15 09:13:13','hi\n\n','0',1),(188,54,55,'2019-08-20 01:50:41','????\n\n','0',1),(189,54,55,'2019-08-31 10:38:02','Hi, unjani?\n\n','0',1),(190,55,54,'2019-09-01 17:42:01','????','0',1),(191,55,54,'2019-09-01 17:47:13','Hi','0',1),(192,55,54,'2019-09-01 17:48:09','alert(\"Hi\")','0',1),(193,55,54,'2019-09-02 09:49:58','Hello World','0',1),(194,55,54,'2019-09-02 09:50:05','????Hey world','0',1),(195,55,54,'2019-09-02 09:50:35','uGY8AAAbbbDeleted: Wrong destinationuGY8AAAccc','0',1),(196,55,54,'2019-09-02 09:57:49','uGY8AAAbbbDeleted: TypouGY8AAAccc','0',1),(197,55,54,'2019-09-02 10:38:45','uGY8AAAbbbDeleted: Wrong destinationuGY8AAAccc','0',1),(198,55,54,'2019-09-02 10:39:00','uGY8AAAbbbDeleted: InappropriateuGY8AAAccc','0',1),(199,55,54,'2019-09-02 10:49:35','hi','0',1),(200,55,54,'2019-09-02 10:49:41','&lt;script&gt;&lt;/script&gt;','0',1),(201,55,54,'2019-09-02 10:50:06','&lt;script&gt;alert(\"Hello World\")&lt;/script&gt;','0',1),(202,55,54,'2019-09-02 11:08:46','&lt;h2 onload=&apos;alert(&apos;hi&apos;)&apos;&gt;&lt;/h2&gt;','0',1),(203,55,54,'2019-09-02 12:48:05','Hi&lt;','0',1),(204,55,54,'2019-09-05 15:51:32','Hi','0',1),(205,55,54,'2019-09-05 15:51:36','Unjani Sam','0',1),(206,54,56,'2019-09-12 21:04:27','Hi','0',1),(207,56,54,'2019-09-12 21:05:15','Hello','0',1),(208,56,54,'2019-09-12 21:05:28','Unjani','0',1),(209,56,54,'2019-09-13 11:57:32','????','0',1),(210,54,45,'2019-09-15 12:33:30','Hi','0',1),(211,56,54,'2019-09-15 12:34:15','Hi','0',1),(213,38,36,'2019-09-21 20:16:06','????','0',1),(214,55,54,'2019-09-22 16:42:40','uGY8AAAbbbDeleted: TypouGY8AAAccc','0',1),(215,54,55,'2019-09-30 12:57:42','hi','0',1),(216,54,55,'2019-09-30 12:57:53','uGY8AAAbbbDeleted: Wrong destinationuGY8AAAccc','0',1),(217,54,55,'2019-09-30 14:13:12','????????','0',1),(218,54,55,'2019-09-30 14:14:40','?','0',1),(219,54,55,'2019-10-01 20:37:11','????','0',1),(220,54,55,'2019-10-01 20:44:01','?','0',1),(221,55,54,'2019-10-10 10:31:17','Hi','0',1),(222,55,54,'2019-10-10 10:31:24','How are you\n','0',1),(223,55,54,'2019-10-10 10:31:38','hey','0',1),(224,54,56,'2019-10-27 17:24:32','Hi','0',1),(225,54,56,'2019-11-19 22:40:39','Hey hey','0',1),(226,65,45,'2019-11-20 11:36:37','hi','0',1),(227,59,65,'2019-11-20 19:47:54','Babe','0',1),(228,65,59,'2019-11-20 19:50:36','Babe','0',1),(229,59,65,'2019-11-20 19:50:46','Unjani?','0',1),(230,65,59,'2019-11-20 19:54:36','hi','0',1),(231,59,65,'2019-11-20 19:54:41','hi','0',1),(232,54,65,'2019-11-21 06:42:32','Hi','0',1),(233,65,54,'2019-11-21 07:11:37','Hi','0',1);
/*!40000 ALTER TABLE `fed_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fed_user`
--

DROP TABLE IF EXISTS `fed_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fed_user` (
  `msg_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `msg_user_name` varchar(50) DEFAULT NULL,
  `user_first_name` varchar(200) NOT NULL,
  `user_last_name` varchar(100) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `msg_user_status` varchar(200) NOT NULL,
  `user_gender` enum('f','m') NOT NULL,
  `user_profilepicture` varchar(200) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `email_confirmed` enum('no','yes') NOT NULL,
  `user_date_created` datetime NOT NULL,
  `user_date_modified` datetime NOT NULL,
  PRIMARY KEY (`msg_user_id`),
  UNIQUE KEY `email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fed_user`
--

LOCK TABLES `fed_user` WRITE;
/*!40000 ALTER TABLE `fed_user` DISABLE KEYS */;
INSERT INTO `fed_user` VALUES (36,'John','Richard','Johnson','john@my.com','Hi, I am on mY++','f','36','Uminathi','no','0000-00-00 00:00:00','0000-00-00 00:00:00'),(38,'ClaireMore','More','Clareson','claire@wsu.ac.za','Busy','f','38','Uminathi','no','0000-00-00 00:00:00','0000-00-00 00:00:00'),(40,'Bob','TheBuilder','Bobson','bob@bo.com','In Meeting','f','default','Uminathi','no','0000-00-00 00:00:00','0000-00-00 00:00:00'),(41,'Fez','Plaatyi','Fezson','fez@my.com','Only Calls','f','default','Uminathi','no','0000-00-00 00:00:00','0000-00-00 00:00:00'),(42,'Umie','Plaatyi','Umieson','umie@my.com','Pizza please, hungry','f','42','Uminathi','no','0000-00-00 00:00:00','0000-00-00 00:00:00'),(43,'TEST','TEST','TEST','TEST@TEST.TEST','TEST status','f','default','Uminathi','no','2019-05-31 02:00:00','2019-05-31 01:00:00'),(44,'theCreater','theCreater','theCreater','theCreaterOfmY@my.com','The Creater\'s Status','m','default','Uminathi','no','2019-06-03 10:26:30','2019-06-03 10:26:30'),(45,'hey','hey','hey','hey@my.com','Avaliable in mY++','m','default','Uminathi','no','2019-06-03 11:01:50','2019-06-03 11:01:50'),(46,'testposts','testposts','testposts','testposts@my.com','Avaliable in mY++','m','default','Uminathi','no','2019-06-29 13:07:45','2019-06-29 13:07:45'),(47,'checkm','checkm','checkm','checkm@checkm.checkm','Avaliable in mY++','m','default','Uminathi','no','2019-07-08 09:15:32','2019-07-08 09:15:32'),(48,'newguy','newguy','newguy','newguy@my.com','Avaliable in mY++','m','default','Uminathi','no','2019-07-18 09:14:35','2019-07-18 09:14:35'),(49,'newguy2','newguy2','newguy2','newguy2@my.com','Avaliable in mY++','m','default','Uminathi','no','2019-07-18 10:03:07','2019-07-18 10:03:07'),(50,'hehhh','hehhh','hehhh','hehhh@hehhh.com','Avaliable in mY++','m','default','Uminathi','no','2019-08-02 15:21:39','2019-08-02 15:21:39'),(51,'samsam','sam','sam','sam@my.com','Avaliable in mY++','m','default','Uminathi','no','2019-08-02 15:26:34','2019-08-02 15:26:34'),(52,'helloh','helloh','helloh','helloh@my.com','Avaliable in mY++','m','default','Uminathi','no','2019-08-02 15:27:14','2019-08-02 15:27:14'),(53,'johnson','john','john','jogn@my.com','Avaliable in mY++','m','default','Uminathi','no','2019-08-02 15:28:19','2019-08-02 15:28:19'),(54,'heyhey','heyhey','heyhey','heyhey@heyhey.heyhey','Avaliable in mY++','m','54','$2b$10$B/N6Ymfh9PFAI7g.gUbstebQncsRfBXuwIolMvut/4zbO.FjXgva.','yes','2019-08-14 00:19:26','2019-08-14 00:19:26'),(55,'hey2','hey2','hey2','hey2@hey2.hey2','Avaliable in mY++','m','55','Uminathi','no','2019-08-15 08:50:59','2019-08-15 08:50:59'),(56,'creater','creater','creater','creater@myplusplus.net','Avaliable in mY++','m','default','Uminathi','no','2019-09-12 21:00:36','2019-09-12 21:00:36'),(57,'adfdfdw','Fezekile','Test2','sfdsf@dfdf.com','Avaliable in mY++','m','default','Uminathi','no','2019-09-30 14:55:41','2019-09-30 14:55:41'),(58,'admin','admin','admin','admin@mypp.com','Avaliable in mY++','m','default','Uminathi','no','2019-11-19 09:07:01','2019-11-19 09:07:01'),(59,'TestEmail','TestEmail','TestEmail','fezekileplaatyi@gmail.com','Avaliable in mY++','m','59','$2b$10$O2Go8/v4e3i2GERx.CbmBukfPp6cu/ptveP/HVzFBXojIk7GazAaa','yes','2019-11-20 10:01:19','2019-11-20 10:01:19'),(65,'UminathiNasie','Nasiphi','Vinqishe','nasiphivinqishe@gmail.com','Avaliable in mY++','m','65','$2b$10$PdJW0p72DVIP/bd9D5SELuaT0JE1q/LHVrJDmvaiBRrONccp9FotK','yes','2019-11-20 11:30:33','2019-11-20 11:30:33'),(66,'hum','hum','hum','hum@ddd.com','Avaliable in mY++','m','default','$2b$10$.E1c4fRDVIktBFyuNo63COci/cxxUwcihAmzlkXb.0cpw7qk1GVE.','no','2019-11-21 09:17:52','2019-11-21 09:17:52'),(67,'Siya','Siyanda','Plaatyi','siyandaplaatyi@gmail.com','Avaliable in mY++','m','default','$2b$10$Fym9Css/36.FdNQTsnYA3uK/q45EZqCq58SEujwMZ.cp/85UMrML6','no','2019-11-21 12:06:54','2019-11-21 12:06:54'),(68,'Siphos','Siphokazi','Plaatyi','siphokaziplaatyi@gmail.com','Avaliable in mY++','m','default','$2b$10$bCzovFhK.ljgp3Pgnf7g9uZItVOxKbMhS94ZRxGwZpPOwsuVmHbKq','no','2019-11-21 12:07:39','2019-11-21 12:07:39'),(69,'Terra','Terra','Byte','peshyuku@gmail.com','Avaliable in mY++','m','default','$2b$10$GrkcV91GOOCiUFPgEjncFedwJ8JIhRqeB4M7lOT/BMmytq4n/4IW6','no','2019-11-21 17:33:04','2019-11-21 17:33:04'),(70,'Mtherana','Simthembile','Yuku','syuku@gmail.com','Avaliable in mY++','m','default','$2b$10$IDPQmxaK.nGfavnOwcK6VevhmMlXGm31r0ookirlDIFvSIJkdvLP.','no','2019-11-22 05:22:42','2019-11-22 05:22:42');
/*!40000 ALTER TABLE `fed_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed_captions`
--

DROP TABLE IF EXISTS `feed_captions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feed_captions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `media_id` int(11) NOT NULL,
  `caption_content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `feed_id` (`media_id`),
  CONSTRAINT `feed_captions_ibfk_1` FOREIGN KEY (`media_id`) REFERENCES `feeds_media` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_captions`
--

LOCK TABLES `feed_captions` WRITE;
/*!40000 ALTER TABLE `feed_captions` DISABLE KEYS */;
INSERT INTO `feed_captions` VALUES (25,29,'This is my image, hahaha Image'),(26,30,'This is another image, hahahaha'),(27,31,'My video caption it is this video of camption captain'),(28,33,'Hello world'),(29,34,'30 June image post by John'),(30,35,'Hello World'),(31,36,'hi'),(32,37,'Fezilicious28'),(33,39,'Hello ALAn Walker'),(34,40,'I am so happy, posts are working!'),(35,41,'hello'),(36,42,'hi'),(37,43,'Boot'),(38,44,'Hello world'),(39,46,'Hi'),(40,47,'Hello World testing playback'),(41,48,'Hello World ALAN WORLD'),(42,49,'Test test'),(43,50,'Eita'),(44,53,'Testing sockets'),(45,54,'Testing 2, the events on live stream'),(46,55,'Test 2000000'),(47,56,'Hello world'),(48,57,'New feeds toggled test'),(49,58,'Hello world, hey hey!'),(50,59,'Hello, test again'),(51,60,'Test image'),(52,61,'Hello, test video in realtime'),(53,62,'Hello World of Programming'),(54,63,'Hello everyone'),(55,65,'Hello, everyone'),(56,66,'Hello'),(57,67,'Hi'),(58,68,'Hello World'),(59,69,'Someone like you!'),(60,70,'Going through changes'),(61,71,'Bettwer in time, cover by F.Plaatyi'),(62,72,'Hello'),(63,73,'Hi, hello world'),(64,74,'If I die young!'),(65,75,'Hello World test, Hello hi'),(66,76,'Fezzman'),(67,77,'Testing '),(68,78,'Hi'),(69,79,'Hello helloo test'),(70,80,'Hello, 11:54 Sunday test'),(71,81,'Hi'),(72,82,'undefined'),(73,83,'hello world'),(74,85,'Hi'),(75,87,'Hi'),(76,88,'Hello test'),(77,89,'Hello world'),(78,90,'Hi hi hi test'),(79,91,'Hi hio test'),(80,92,'No audio edited'),(81,93,'Hello deep morning session\n'),(82,94,'hELLO ALL'),(83,96,'Hi'),(84,97,'Hello everyone @Mthatha'),(85,100,'Hello WOrld, pa pa pa paaaa'),(86,102,'Hello test'),(87,103,'hi'),(88,104,'Hi'),(89,105,'h'),(90,106,'Hey'),(91,107,'Hey'),(92,112,'s'),(93,114,'Hello test'),(94,118,'Taking Java'),(95,119,'Monday chillas with little one'),(96,120,'Monday chillas with little one'),(97,122,'Hello World'),(98,123,'Hello World, 3 minutes video'),(99,124,'Hi test'),(100,127,'Druink'),(101,128,'Hi'),(102,139,'Chillas @ ICT'),(103,140,'Hello World in Java'),(104,141,'Hey test'),(105,143,'Hello test'),(106,144,'Hi'),(107,154,'Hello testing local video'),(108,155,'Hello testing local video again'),(109,158,'Hello testing local video again'),(110,159,'Hello world in java'),(111,160,'Hello Fez'),(112,161,'Hello Fez'),(113,162,'Hello Fez'),(114,163,'Hello Fez'),(115,164,'Hello Fez'),(116,165,'Hello Fez'),(117,166,'Hello Fez'),(118,167,'Hello Fez'),(119,168,'Hello Fez'),(120,169,'Hello Fez'),(121,170,'Hello Fez'),(122,171,'Hello Fez'),(123,172,'Hello Fez'),(124,173,'Hello Fez'),(125,174,'Hello Fez'),(126,175,'Hello Fez'),(127,176,'Hello Fez'),(128,177,'Hello Fez'),(129,178,'Hello Fez'),(130,179,'Hello Fez'),(131,180,'Hello Fez'),(132,181,'Hello Fez'),(133,182,'Hello Fez'),(134,183,'Hello Fez'),(135,184,'Hello Fez'),(136,185,'Hello Fez'),(137,186,'Hello Fez'),(138,187,'Hello Fez'),(139,188,'Hello Fez'),(140,189,'Hello Fez'),(141,190,'Hello Fez'),(142,191,'Hello Fez'),(143,192,'Hello Fez'),(144,193,'Hello Fez'),(145,194,'Hello Fez'),(146,195,'Hello Fez'),(147,196,'Hellpo'),(148,197,'Hellpo'),(149,198,'Hellpo'),(150,199,'Hellpo'),(151,204,'h'),(152,205,'h'),(153,206,'h'),(154,207,'h'),(155,213,'Avici'),(156,214,'Hello world'),(157,215,'Olden day @Slimela 2018 room: 325'),(158,217,'Hello World!'),(159,218,'Hello World'),(160,219,'Hello Majesty'),(161,221,'Hi, test'),(162,222,'Hi, test'),(163,223,'Hi, test'),(164,228,'Hello test'),(165,229,'Hello test'),(166,230,'Hello, Hi'),(167,231,'Hello Test'),(168,232,'Nice streets'),(169,233,'Hello world in Java'),(170,236,'Hello, @Khonology'),(171,242,'Test works &lt;'),(172,243,'Test for image capture works &lt; ');
/*!40000 ALTER TABLE `feed_captions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed_comments`
--

DROP TABLE IF EXISTS `feed_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feed_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_id` int(11) NOT NULL,
  `person_commented_id` int(11) NOT NULL,
  `comment_content` text NOT NULL,
  `date_commented` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `person_commented_id` (`person_commented_id`),
  KEY `feed_id` (`feed_id`),
  CONSTRAINT `feed_comments_ibfk_1` FOREIGN KEY (`person_commented_id`) REFERENCES `fed_user` (`msg_user_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `feed_comments_ibfk_2` FOREIGN KEY (`feed_id`) REFERENCES `feeds_table` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_comments`
--

LOCK TABLES `feed_comments` WRITE;
/*!40000 ALTER TABLE `feed_comments` DISABLE KEYS */;
INSERT INTO `feed_comments` VALUES (1,72,36,'Testing comment,','2019-07-03 18:40:59'),(2,48,36,'Scoopy do!','2019-07-03 18:54:33'),(3,72,36,'tESTING ANOTHER COMMENT','2019-07-03 20:30:48'),(4,44,36,'Hello World post1 like comment','2019-07-03 20:42:49'),(5,72,36,'Eita, my comment','2019-07-03 21:38:08'),(6,72,36,'Test comment 1 3 9','2019-07-03 23:42:23'),(7,78,36,'Hi, commented here','2019-07-04 18:02:00'),(8,79,36,'hi, test comment','2019-07-05 13:09:50'),(9,82,36,'hi','2019-07-07 10:07:29'),(10,100,36,'Test comment','2019-07-07 18:20:47'),(11,100,36,'Other comment','2019-07-07 18:21:52'),(12,100,36,'Third test comment','2019-07-07 18:22:36'),(13,100,36,'Test again','2019-07-07 18:50:30'),(14,100,40,'Hey Richrd nice post bro!','2019-07-07 19:19:19'),(15,100,40,'Richardson! Nice post','2019-07-07 19:34:38'),(16,100,40,'Testing another comment','2019-07-07 19:41:29'),(17,100,36,'Hello, test notifications','2019-07-09 10:01:52'),(18,100,36,'Hello test','2019-07-09 10:03:52'),(19,100,36,'09 July test','2019-07-09 18:50:11'),(20,100,36,'hey testr 9 julk','2019-07-09 18:57:25'),(21,100,36,'Hello Umie','2019-07-09 19:02:43'),(22,100,36,'Umie test','2019-07-09 19:04:35'),(23,100,36,'Hi','2019-07-09 19:06:10'),(24,100,36,'Hey hey','2019-07-09 19:14:44'),(25,100,38,'Helo, I am claire@wsu.ac.za Test comment','2019-07-09 19:26:13'),(26,100,38,'Hello','2019-07-09 19:29:55'),(27,100,38,'Comment ','2019-07-09 19:33:21'),(28,100,38,'Test','2019-07-09 19:37:46'),(29,100,36,'Umie test','2019-07-09 19:39:18'),(30,100,38,'Umie','2019-07-09 19:47:28'),(31,100,38,'hi','2019-07-09 20:04:29'),(32,100,38,'dvd','2019-07-09 20:07:39'),(33,100,36,'hhjk','2019-07-09 20:10:02'),(34,100,38,'Test','2019-07-09 20:17:27'),(35,100,36,'Hello','2019-07-09 20:24:32'),(36,100,36,'hi','2019-07-09 20:31:42'),(37,100,36,'Hi','2019-07-09 20:37:18'),(38,100,36,'jjjw','2019-07-09 20:39:15'),(39,100,36,'Hey test','2019-07-09 21:16:23'),(40,100,36,'Hi','2019-07-09 21:18:25'),(41,100,36,'Hey','2019-07-09 21:23:17'),(42,100,36,'hi','2019-07-09 21:24:07'),(43,100,36,'dcda','2019-07-09 21:27:32'),(44,77,36,'hi','2019-07-09 21:28:59'),(45,99,38,'Hello World','2019-07-12 09:50:32'),(46,99,38,'Hello','2019-07-12 09:55:20'),(47,100,36,'I should not get notification for this, but clare and bobtheBuilder should','2019-07-12 10:09:12'),(48,100,38,'Hey','2019-07-12 10:10:47'),(49,100,38,'tEST NOTOFIER','2019-07-16 16:10:03'),(50,100,38,'TEST NOTIFY','2019-07-16 16:12:20'),(51,100,43,'Test it','2019-07-16 16:24:42'),(52,100,43,'hi','2019-07-16 16:26:20'),(53,100,43,'Test','2019-07-16 16:27:49'),(54,100,43,'ttest 1','2019-07-16 16:28:42'),(55,100,43,'Test cleaning','2019-07-16 16:31:45'),(56,100,43,'HAHAHA','2019-07-16 16:36:16'),(57,100,43,'HAHAHA','2019-07-16 16:36:21'),(58,100,43,'HI','2019-07-16 16:36:39'),(59,100,43,'dfd','2019-07-16 16:38:19'),(60,100,43,'hi','2019-07-16 16:40:08'),(61,100,43,'Test realtime comments','2019-07-16 16:52:47'),(62,98,43,'Test comments','2019-07-16 16:54:38'),(63,100,43,'hello','2019-07-16 17:04:56'),(64,93,43,'hi test','2019-07-16 17:05:40'),(65,96,36,'hhjjsu','2019-07-17 21:41:02'),(66,100,36,'undefined','2019-07-21 18:03:05'),(67,100,36,'undefined','2019-07-21 18:12:37'),(68,100,36,'undefined','2019-07-21 18:14:45'),(69,100,36,'undefined','2019-07-21 18:34:05'),(70,100,36,'undefined','2019-07-21 18:34:59'),(71,89,36,'undefined','2019-07-22 23:49:21'),(72,101,36,'Comments text after bug','2019-07-23 09:13:08'),(73,100,38,'test','2019-07-27 16:41:30'),(74,100,36,'Test sunday','2019-07-28 09:25:36'),(75,100,36,'Test sunday 2','2019-07-28 09:26:15'),(76,100,36,'bubbling of comments test','2019-07-28 09:28:54'),(77,100,36,'hi test','2019-07-28 09:31:19'),(78,100,38,'this is not my feed','2019-07-28 09:33:49'),(79,100,38,'hh','2019-07-28 09:42:11'),(80,100,38,'hey again','2019-07-28 09:42:32'),(81,100,38,'hey again','2019-07-28 09:42:35'),(82,100,38,'hi','2019-07-28 09:44:28'),(83,100,38,'Hi rich','2019-07-28 09:45:21'),(84,100,38,'Seems working rich','2019-07-28 09:45:53'),(85,100,36,'Hi','2019-07-28 09:46:24'),(86,100,36,'Test in my posts commenting','2019-07-28 09:49:16'),(87,100,36,'70th comment in my feed','2019-07-28 09:51:49'),(88,100,36,'hy','2019-07-28 09:54:38'),(89,100,36,'hi','2019-07-28 09:57:52'),(90,100,36,'hi','2019-07-28 09:58:59'),(91,100,36,'hiefe','2019-07-28 09:59:07'),(92,100,38,'test','2019-07-28 10:03:13'),(93,100,36,'fr','2019-07-28 10:03:26'),(94,100,36,'fr','2019-07-28 10:04:27'),(95,100,36,'gsd','2019-07-28 10:05:15'),(96,100,36,'dd','2019-07-28 10:06:36'),(97,100,36,'Retest','2019-07-28 10:06:56'),(98,100,38,'test','2019-07-28 10:07:16'),(99,100,38,'test','2019-07-28 10:08:23'),(100,100,36,'tet','2019-07-28 10:12:12'),(101,100,38,'test it again','2019-07-28 10:12:41'),(102,100,36,'tetefe','2019-07-28 10:15:05'),(103,100,38,'Your post','2019-07-28 12:39:31'),(104,100,36,'gf','2019-07-28 12:40:35'),(105,100,36,'dfe','2019-07-28 12:44:39'),(106,100,36,'hey','2019-07-28 12:45:49'),(107,100,38,'Hi','2019-07-28 12:49:29'),(108,100,36,'my post','2019-07-28 13:11:52'),(109,100,36,'hi','2019-07-28 13:12:32'),(110,100,36,'post comment','2019-07-28 13:13:30'),(111,100,36,'Hey 94','2019-07-28 13:13:57'),(112,100,38,'Test','2019-07-28 13:14:43'),(113,100,38,'commentsss ','2019-07-28 13:17:30'),(114,100,36,'Hey fro me','2019-07-28 13:18:16'),(115,100,38,'eita bro','2019-07-28 13:22:42'),(116,100,36,'To see if I am excluded','2019-07-28 13:23:05'),(117,100,38,'Eita','2019-07-28 13:39:25'),(118,100,38,'Eita','2019-07-28 13:39:25'),(119,100,38,'test 2','2019-07-28 13:40:07'),(120,100,38,'test 2','2019-07-28 13:40:07'),(121,100,38,'test 2 ola','2019-07-28 13:40:42'),(122,100,38,'test 2 ola','2019-07-28 13:40:42'),(123,100,36,'hi','2019-07-28 13:41:24'),(124,100,38,'hlo','2019-07-28 13:43:08'),(125,100,38,'hlo','2019-07-28 13:43:08'),(126,100,38,'hi','2019-07-28 13:43:30'),(127,100,36,'hi','2019-07-28 13:43:50'),(128,100,38,'hi 2','2019-07-28 13:43:58'),(129,100,38,'hi','2019-07-28 13:57:18'),(130,100,38,'Ola','2019-07-28 14:01:08'),(131,100,38,'Test test test','2019-07-28 14:15:07'),(132,100,38,'hello world','2019-07-28 14:15:29'),(133,100,38,'ola','2019-07-28 14:17:25'),(134,100,38,'hooo','2019-07-28 14:19:14'),(135,100,38,'Hello test','2019-07-28 14:21:05'),(136,100,38,'Hello test','2019-07-28 14:21:05'),(137,100,38,'test','2019-07-28 14:25:01'),(138,75,38,'Hi','2019-07-29 08:40:44'),(139,100,38,'Ola','2019-08-02 12:56:48'),(140,100,36,'Hi hey','2019-08-02 22:39:13'),(141,100,36,'Hi','2019-08-02 22:39:43'),(142,93,36,'Hi','2019-08-03 00:22:59'),(143,102,36,'Hey','2019-08-03 01:43:40'),(144,108,36,'Hello World','2019-08-03 10:20:34'),(145,143,36,'hELLO NAWE','2019-08-05 12:56:33'),(146,146,38,'Hi','2019-08-05 18:06:13'),(147,147,38,'Hi my video','2019-08-05 18:11:42'),(148,148,38,'Hi','2019-08-05 18:34:01'),(149,150,38,'Hi all','2019-08-05 18:42:28'),(150,150,36,'Hello','2019-08-06 23:34:47'),(151,170,36,'Hey you guys','2019-08-06 23:48:31'),(152,150,38,'Hi hey','2019-08-06 23:50:49'),(153,100,38,'The way you!','2019-08-07 12:36:57'),(154,170,36,'Hi hi you too some','2019-08-07 12:38:16'),(155,64,38,'Hi','2019-08-07 12:44:51'),(156,170,36,'Hi hi','2019-08-07 12:46:04'),(157,74,38,'Fez','2019-08-07 12:47:14'),(158,170,36,'Hi world','2019-08-07 12:48:00'),(159,108,38,'Testing what john?','2019-08-07 12:50:28'),(160,188,36,'Eita','2019-08-08 12:40:13'),(161,207,38,'Hey','2019-08-09 17:14:03'),(162,287,55,'Hey all','2019-08-31 09:59:33'),(163,287,55,'hi test sql injection','2019-09-04 11:56:52'),(164,287,55,'sql inject&lt;\n','2019-09-04 11:57:03'),(165,289,55,'Hi\n','2019-09-05 15:53:21'),(166,302,56,'Hi, I need more friends','2019-09-12 21:07:59'),(167,302,54,'Hello','2019-09-12 21:08:46'),(168,302,56,'Please help me get more users','2019-09-12 21:09:19'),(169,305,54,'Hi','2019-10-10 14:32:24'),(170,305,54,'Hey test','2019-10-10 15:12:16');
/*!40000 ALTER TABLE `feed_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed_comments_updates`
--

DROP TABLE IF EXISTS `feed_comments_updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feed_comments_updates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `update_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `update_id` (`update_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `feed_comments_updates_ibfk_1` FOREIGN KEY (`update_id`) REFERENCES `feeds_updates` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `feed_comments_updates_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `feed_comments` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_comments_updates`
--

LOCK TABLES `feed_comments_updates` WRITE;
/*!40000 ALTER TABLE `feed_comments_updates` DISABLE KEYS */;
INSERT INTO `feed_comments_updates` VALUES (2,28,50),(5,31,51),(8,34,52),(11,37,53),(14,40,54),(17,43,55),(20,46,56),(23,49,57),(26,52,58),(29,55,59),(32,58,60),(35,61,61),(39,65,63),(42,80,66),(43,81,66),(45,83,67),(46,84,67),(48,86,68),(49,87,68),(51,89,69),(52,90,69),(54,92,70),(55,93,70),(56,94,72),(58,98,73),(59,99,73),(60,100,74),(62,102,74),(63,103,75),(65,105,75),(66,106,76),(68,108,76),(69,109,77),(71,111,77),(73,113,78),(74,114,78),(76,116,79),(77,117,79),(79,119,80),(80,120,80),(82,122,81),(83,123,81),(85,125,82),(86,126,82),(88,128,83),(89,129,83),(91,131,84),(92,132,84),(93,133,85),(95,135,85),(96,136,86),(98,138,86),(99,139,87),(101,141,87),(102,142,88),(104,144,88),(105,145,89),(107,147,89),(108,148,90),(110,150,90),(111,151,91),(113,153,91),(115,155,92),(116,156,92),(117,157,93),(119,159,93),(120,160,94),(122,162,94),(123,163,95),(125,165,95),(126,166,96),(128,168,96),(129,169,97),(131,171,97),(133,173,98),(134,174,98),(136,176,99),(137,177,99),(138,178,100),(140,180,100),(142,182,101),(143,183,101),(144,184,102),(146,186,102),(148,188,103),(149,189,103),(150,190,104),(152,192,104),(153,193,105),(155,195,105),(156,196,106),(158,198,106),(160,200,107),(161,201,107),(162,202,108),(164,204,108),(165,205,109),(167,207,109),(168,208,110),(170,210,110),(171,211,111),(173,213,111),(175,215,112),(176,216,112),(178,218,113),(179,219,113),(180,220,114),(182,222,114),(184,224,115),(185,225,115),(186,226,116),(188,228,116),(191,231,117),(192,232,117),(193,233,118),(194,234,118),(197,237,119),(198,238,119),(199,239,120),(200,240,120),(202,242,121),(203,243,121),(205,245,122),(206,246,122),(207,247,123),(209,249,123),(212,252,124),(213,253,124),(214,254,125),(215,255,125),(217,257,126),(218,258,126),(219,259,127),(221,261,127),(223,263,128),(224,264,128),(226,266,129),(227,267,129),(229,269,130),(230,270,130),(232,272,131),(233,273,131),(235,275,132),(236,276,132),(238,278,133),(239,279,133),(241,281,134),(242,282,134),(244,284,135),(245,285,135),(247,287,136),(248,288,136),(250,290,137),(251,291,137),(254,299,139),(255,300,139),(256,303,140),(258,305,140),(259,306,141),(261,308,141),(262,311,142),(267,350,153),(268,351,153),(269,458,169),(270,459,170);
/*!40000 ALTER TABLE `feed_comments_updates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed_likes`
--

DROP TABLE IF EXISTS `feed_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feed_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_id` int(11) NOT NULL,
  `person_liked_id` int(11) NOT NULL,
  `date_liked` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `person_liked_id` (`person_liked_id`),
  KEY `feed_id` (`feed_id`),
  CONSTRAINT `feed_likes_ibfk_1` FOREIGN KEY (`feed_id`) REFERENCES `feeds_table` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `feed_likes_ibfk_2` FOREIGN KEY (`person_liked_id`) REFERENCES `fed_user` (`msg_user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=255 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_likes`
--

LOCK TABLES `feed_likes` WRITE;
/*!40000 ALTER TABLE `feed_likes` DISABLE KEYS */;
INSERT INTO `feed_likes` VALUES (1,72,36,'2019-07-03 16:54:26'),(2,72,40,'2019-07-03 17:43:30'),(3,48,36,'2019-07-03 19:40:36'),(4,46,36,'2019-07-03 19:55:10'),(6,81,38,'2019-07-04 22:46:50'),(7,75,36,'2019-07-05 16:39:38'),(8,77,36,'2019-07-06 14:11:33'),(10,79,36,'2019-07-06 15:13:10'),(21,78,36,'2019-07-06 15:24:59'),(52,79,38,'2019-07-10 18:35:22'),(53,99,36,'2019-07-16 14:23:41'),(65,99,38,'2019-07-16 15:09:49'),(68,100,40,'2019-07-16 15:23:46'),(69,96,38,'2019-07-16 15:24:01'),(70,100,43,'2019-07-16 17:07:20'),(72,55,36,'2019-07-17 21:25:35'),(73,101,49,'2019-07-18 10:38:47'),(83,100,36,'2019-08-02 23:10:41'),(84,106,36,'2019-08-03 10:13:43'),(87,108,36,'2019-08-03 10:28:41'),(89,109,36,'2019-08-03 10:31:09'),(95,81,36,'2019-08-04 10:50:13'),(102,147,38,'2019-08-05 18:11:35'),(107,168,36,'2019-08-05 19:54:26'),(117,194,36,'2019-08-08 18:56:17'),(118,195,38,'2019-08-08 18:57:46'),(119,196,38,'2019-08-09 13:46:53'),(123,212,54,'2019-08-15 10:11:44'),(143,258,54,'2019-08-16 17:15:49'),(144,258,54,'2019-08-16 17:15:49'),(147,268,54,'2019-08-16 21:16:51'),(148,277,55,'2019-08-19 22:53:33'),(151,285,54,'2019-08-21 18:48:18'),(157,281,54,'2019-08-31 14:56:13'),(158,287,54,'2019-08-31 14:56:42'),(161,289,55,'2019-09-05 15:52:40'),(162,302,54,'2019-09-12 21:07:40'),(254,296,54,'2019-10-03 19:37:17');
/*!40000 ALTER TABLE `feed_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feed_post`
--

DROP TABLE IF EXISTS `feed_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feed_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_id` int(11) NOT NULL,
  `feed_postcontent` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `feed_id` (`feed_id`),
  CONSTRAINT `feed_post_ibfk_1` FOREIGN KEY (`feed_id`) REFERENCES `feeds_table` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed_post`
--

LOCK TABLES `feed_post` WRITE;
/*!40000 ALTER TABLE `feed_post` DISABLE KEYS */;
INSERT INTO `feed_post` VALUES (11,44,'Hello World Post1'),(12,45,'Post 2 content'),(13,46,'This is another post by the computer ThinkPad'),(14,72,'Testing the feeds after media'),(15,79,'Hello, feeds 02 July 2019'),(16,80,'hi feed'),(17,81,'Hello, test again! 2 July 2019'),(18,82,'Hello, sunday morning! 07'),(19,83,'Hello WORLD, I SEE JAVASCRIPT EVERYWHERE'),(20,84,'mY++ Inc. is going to be taking over'),(21,85,'Test FEEDS'),(22,86,'Last test'),(23,87,'Hello Morning everyone'),(24,88,'Javascript World'),(25,89,'Sockets World'),(26,90,'So bad, Its not working'),(27,91,'Hey hey hey ey'),(28,92,'Ola'),(29,93,'cOding is life'),(30,94,'Seems as if its working now'),(31,95,'Hey hey'),(32,96,'Hey hey hey, test'),(33,97,'I am so fucking tired about testing this'),(34,101,'Test post'),(35,103,'Hello, We will be hosting soon this weekend'),(36,104,'Hello @Mthatha'),(37,105,'Hello, again and again'),(38,106,'I think I have to learn creating mobile apps'),(39,107,'I love programming <3'),(40,108,'Testing, testing'),(41,109,'Hello everyone, have a blessed day'),(42,129,'Hello, Sunday chillas!'),(43,130,'Hello, I am rich\nI am Richard'),(44,143,'hELLO mONDAY'),(45,195,'Ola lapho majita asekasi'),(46,211,'Hello, this is a post just after initial debugging'),(47,212,'hELLO'),(48,293,'hey he test'),(49,294,'Test again'),(50,295,'Test with &lt; injection&apos;'),(51,297,'Testing text works&lt;'),(52,302,'Hello All, I am a new user'),(53,306,'Hello, I miss my son. Uminathi my love');
/*!40000 ALTER TABLE `feed_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeds_media`
--

DROP TABLE IF EXISTS `feeds_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feeds_media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_id` int(11) NOT NULL,
  `media_name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `feed_id` (`feed_id`),
  CONSTRAINT `feeds_media_ibfk_1` FOREIGN KEY (`feed_id`) REFERENCES `feeds_table` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=252 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeds_media`
--

LOCK TABLES `feeds_media` WRITE;
/*!40000 ALTER TABLE `feeds_media` DISABLE KEYS */;
INSERT INTO `feeds_media` VALUES (29,42,'156157843126736_image_post.png'),(30,43,'156183504227736_image_post.png'),(31,48,'12345_video_post.mp4'),(32,51,'156183508831436_image_post.png'),(33,52,'156183603311136_image_post.png'),(34,53,'156192837073236_image_post.png'),(35,54,'1561928955975_image_post.png'),(36,55,'1561929473666_image_post.png'),(37,56,'1561929609800_image_post.png'),(38,57,'1561975995342_video_post.webm'),(39,58,'1561976130282_video_post.webm'),(40,59,'1561977237546_video_post.webm'),(41,60,'1561984166354_video_post.mp4'),(42,61,'1561984340035_video_post.mp4'),(43,62,'1561999295905_video_post.mp4'),(44,63,'1562000111296_video_post.mp4'),(45,64,'1562000665143_video_post.mp4'),(46,65,'1562000833248_video_post.mp4'),(47,66,'1562002583276_video_post.mp4'),(48,67,'1562003744537_video_post.mp4'),(49,68,'1562003864370_video_post.mp4'),(50,69,'1562004119454_video_post.mp4'),(51,70,'1562004273980_video_post.mp4'),(52,71,'1562004318407_video_post.mp4'),(53,73,'1562062314398_video_post.mp4'),(54,74,'1562062589234_video_post.mp4'),(55,75,'1562062794087_video_post.mp4'),(56,76,'1562064677877_video_post.mp4'),(57,77,'1562067908289_video_post.mp4'),(58,78,'1562068031742_video_post.mp4'),(59,98,'1562479457021_image_post.png'),(60,99,'1562479632678_image_post.png'),(61,100,'1562480233963_video_post.mp4'),(62,102,'1564789329334_image_post.png'),(63,110,'1564821361891_image_post.png'),(64,111,'1564834619917_video_post.mp4'),(65,112,'1564835171075_video_post.mp4'),(66,113,'1564835697258_video_post.mp4'),(67,114,'1564836200080_video_post.mp4'),(68,115,'1564837758053_video_post.mp4'),(69,116,'1564838537755_video_post.mp4'),(70,117,'1564838740988_video_post.mp4'),(71,118,'1564839010637_video_post.mp4'),(72,119,'1564839266196_video_post.mp4'),(73,120,'1564839467093_video_post.mp4'),(74,121,'1564839850950_video_post.mp4'),(75,122,'1564910748916_image_post.png'),(76,123,'1564911022761_image_post.png'),(77,124,'1564911833136_image_post.png'),(78,125,'1564912112859_image_post.png'),(79,126,'1564912325749_image_post.png'),(80,127,'1564912483745_image_post.png'),(81,128,'1564912779607_image_post.png'),(82,131,'1564948065748_image_post.png'),(83,132,'1564948279623_image_post.png'),(84,133,'1564948279714_image_post.png'),(85,134,'1564948318680_image_post.png'),(86,135,'1564951246544_video_post.mp4'),(87,136,'1564951579725_video_post.mp4'),(88,137,'1564951957878_video_post.mp4'),(89,138,'1564952220288_video_post.mp4'),(90,139,'1564952294727_video_post.mp4'),(91,140,'1564952972760_video_post.mp4'),(92,141,'1564953898832_video_post.mp4'),(93,142,'1564991996998_video_post.mp4'),(94,144,'1565002619146_image_post.png'),(95,145,'1565003300847_video_post.mp4'),(96,146,'1565021165059_image_post.png'),(97,147,'1565021480683_video_post.mp4'),(98,148,'1565022765960_video_post.mp4'),(99,149,'1565022824673_image_post.png'),(100,150,'1565023233061_video_post.mp4'),(101,151,'1565023693532_image_post.png'),(102,152,'1565023851576_image_post.png'),(103,153,'1565024137483_image_post.png'),(104,154,'1565024244604_image_post.png'),(105,155,'1565024520519_image_post.png'),(106,156,'1565024679729_image_post.png'),(107,157,'1565024751001_image_post.png'),(108,158,'1565024869737_image_post.png'),(109,159,'1565024906723_image_post.png'),(110,160,'1565024933451_image_post.png'),(111,161,'1565024933481_image_post.png'),(112,162,'1565024967279_image_post.png'),(113,163,'1565025215024_image_post.png'),(114,164,'1565025449479_image_post.png'),(115,165,'1565025488875_image_post.png'),(116,166,'1565025526607_image_post.png'),(117,167,'1565025526732_image_post.png'),(118,168,'1565027619681_image_post.png'),(119,169,'1565042418976_video_post.mp4'),(120,170,'1565042419165_video_post.mp4'),(121,171,'1565206456987_video_post.mp4'),(122,172,'1565209424908_video_post.mp4'),(123,173,'1565210083682_video_post.mp4'),(124,174,'1565258557579_image_post.png'),(125,175,'1565258557602_image_post.png'),(126,176,'1565258557619_image_post.png'),(127,177,'1565258979822_image_post.png'),(128,178,'1565259115249_image_post.png'),(129,179,'1565259206249_image_post.png'),(130,180,'1565259374240_image_post.png'),(131,181,'1565259677530_image_post.png'),(132,182,'1565259753702_image_post.png'),(133,183,'1565259755651_image_post.png'),(134,184,'1565260266921_image_post.png'),(135,185,'1565260343031_image_post.png'),(136,186,'1565260417789_image_post.png'),(137,187,'1565260423115_image_post.png'),(138,188,'1565260591630_image_post.png'),(139,189,'1565261055431_image_post.png'),(140,190,'1565261193345_image_post.png'),(141,191,'1565261345895_image_post.png'),(142,192,'1565261660346_image_post.png'),(143,193,'1565261660460_image_post.png'),(144,194,'1565261725123_image_post.png'),(145,196,'1565351006715_image_post.png'),(146,197,'1565352529037_image_post.png'),(154,205,'1565361749051_video_post.mp4'),(155,206,'1565362154723_video_post.mp4'),(156,207,'1565363312926_image_post.png'),(157,208,'1565377889641_image_post.png'),(158,209,'1565377928687_video_post.mp4'),(159,210,'1565441647953_video_post.mp4'),(160,213,'1565869860574_image_post.png'),(161,214,'1565869860690_image_post.png'),(162,215,'1565869860809_image_post.png'),(163,216,'1565869860926_image_post.png'),(164,217,'1565869861054_image_post.png'),(165,218,'1565869861179_image_post.png'),(166,219,'1565869861295_image_post.png'),(167,220,'1565869861431_image_post.png'),(168,221,'1565869861561_image_post.png'),(169,222,'1565869861675_image_post.png'),(170,223,'1565869861805_image_post.png'),(171,224,'1565869861934_image_post.png'),(172,225,'1565869862194_image_post.png'),(173,226,'1565869862271_image_post.png'),(174,227,'1565869862772_image_post.png'),(175,228,'1565869862933_image_post.png'),(176,229,'1565869863093_image_post.png'),(177,230,'1565869863467_image_post.png'),(178,231,'1565869863767_image_post.png'),(179,232,'1565869864291_image_post.png'),(180,233,'1565869864562_image_post.png'),(181,234,'1565869865094_image_post.png'),(182,235,'1565869865141_image_post.png'),(183,236,'1565869865538_image_post.png'),(184,237,'1565869865619_image_post.png'),(185,238,'1565869865706_image_post.png'),(186,239,'1565869866141_image_post.png'),(187,240,'1565869866522_image_post.png'),(188,241,'1565869866644_image_post.png'),(189,242,'1565869866793_image_post.png'),(190,243,'1565869866830_image_post.png'),(191,244,'1565869866996_image_post.png'),(192,245,'1565869867163_image_post.png'),(193,246,'1565869867361_image_post.png'),(194,247,'1565869867428_image_post.png'),(195,248,'1565869867618_image_post.png'),(196,249,'1565893762166_image_post.png'),(197,250,'1565893762296_image_post.png'),(198,251,'1565893762426_image_post.png'),(199,252,'1565893762556_image_post.png'),(200,253,'1565893934132_image_post.png'),(201,254,'1565893934251_image_post.png'),(202,255,'1565893934376_image_post.png'),(203,256,'1565899677851_image_post.png'),(204,257,'1565968523581_image_post.png'),(205,258,'1565968523606_image_post.png'),(206,259,'1565968523741_image_post.png'),(207,260,'1565968523913_image_post.png'),(208,261,'1565969385592_image_post.png'),(209,262,'1565969436536_image_post.png'),(210,263,'1565971218449_image_post.png'),(211,264,'1565972215441_image_post.png'),(212,265,'1565972441560_image_post.png'),(213,266,'1565972494519_video_post.mp4'),(214,267,'1565982892483_image_post.png'),(215,268,'1565983003021_image_post.png'),(216,269,'1565984214259_image_post.png'),(217,270,'1565986021126_video_post.mp4'),(218,271,'1566042833383_video_post.mp4'),(219,272,'1566042972257_image_post.png'),(220,273,'1566044280399_image_post.png'),(221,274,'1566046240898_video_post.mp4'),(222,275,'1566046241684_video_post.mp4'),(223,276,'1566046242050_video_post.mp4'),(224,277,'1566049550567_video_post.mp4'),(225,278,'1566300245003_video_post.mp4'),(226,279,'1566300541736_video_post.mp4'),(227,280,'1566300609733_video_post.mp4'),(228,281,'1566300866661_video_post.mp4'),(229,282,'1566301286670_video_post.mp4'),(230,283,'1566303511148_video_post.mp4'),(231,284,'1566319450695_video_post.mp4'),(232,285,'1566327050388_image_post.png'),(233,286,'1567065094674_video_post.mp4'),(234,287,'1567066295232_video_post.mp4'),(235,288,'1567593654073_image_post.png'),(236,289,'1567691462221_image_post.png'),(237,290,'1567846882036_image_post.png'),(238,291,'1567846915074_image_post.png'),(239,292,'1567846946982_image_post.png'),(240,296,'1567848885874_video_post.mp4'),(241,298,'1568102265163_image_post.png'),(242,299,'1568102299991_image_post.png'),(243,300,'1568102328589_image_post.png'),(244,301,'1568103339640_image_post.png'),(245,303,'1568315465733_image_post.png'),(246,304,'1568315505340_image_post.png'),(247,305,'1568315505367_image_post.png'),(248,307,'1574358638369_image_post.png'),(249,308,'1574358702172_image_post.png'),(250,309,'1574358823539_image_post.png'),(251,310,'1574358982890_video_post.mp4');
/*!40000 ALTER TABLE `feeds_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeds_table`
--

DROP TABLE IF EXISTS `feeds_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feeds_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_owner` int(11) NOT NULL,
  `privacy_status` enum('private','protected','public') NOT NULL,
  `story_type` enum('1','2','3','4') NOT NULL,
  `date_created` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `feed_owner` (`feed_owner`),
  CONSTRAINT `feeds_table_ibfk_1` FOREIGN KEY (`feed_owner`) REFERENCES `fed_user` (`msg_user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=311 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeds_table`
--

LOCK TABLES `feeds_table` WRITE;
/*!40000 ALTER TABLE `feeds_table` DISABLE KEYS */;
INSERT INTO `feeds_table` VALUES (42,38,'public','1','2019-06-12 02:00:00','2019-06-28 08:00:00'),(43,36,'public','1','2019-06-28 03:00:00','2019-06-28 08:00:00'),(44,38,'public','2','2019-06-28 03:00:00','2019-06-28 00:00:23'),(45,44,'public','2','2019-06-28 02:00:00','2019-06-28 02:00:00'),(46,42,'public','2','2019-06-29 02:00:00','2019-06-29 04:00:00'),(48,41,'public','3','2019-06-29 04:00:00','2019-06-29 00:00:08'),(51,36,'','1','2019-06-29 21:04:48','2019-06-29 21:04:48'),(52,36,'','1','2019-06-29 21:20:33','2019-06-29 21:20:33'),(53,36,'','1','2019-06-30 22:59:30','2019-06-30 22:59:30'),(54,36,'','1','2019-06-30 23:09:15','2019-06-30 23:09:15'),(55,38,'','1','2019-06-30 23:17:53','2019-06-30 23:17:53'),(56,36,'','1','2019-06-30 23:20:09','2019-06-30 23:20:09'),(57,36,'public','3','2019-07-01 12:13:15','2019-07-01 12:13:15'),(58,36,'public','3','2019-07-01 12:15:30','2019-07-01 12:15:30'),(59,38,'public','3','2019-07-01 12:33:57','2019-07-01 12:33:57'),(60,36,'public','3','2019-07-01 14:29:26','2019-07-01 14:29:26'),(61,36,'public','3','2019-07-01 14:32:20','2019-07-01 14:32:20'),(62,36,'public','3','2019-07-01 18:41:35','2019-07-01 18:41:35'),(63,36,'public','3','2019-07-01 18:55:11','2019-07-01 18:55:11'),(64,36,'public','3','2019-07-01 19:04:25','2019-07-01 19:04:25'),(65,36,'public','3','2019-07-01 19:07:13','2019-07-01 19:07:13'),(66,36,'public','3','2019-07-01 19:36:23','2019-07-01 19:36:23'),(67,36,'public','3','2019-07-01 19:55:44','2019-07-01 19:55:44'),(68,36,'public','3','2019-07-01 19:57:44','2019-07-01 19:57:44'),(69,36,'public','3','2019-07-01 20:01:59','2019-07-01 20:01:59'),(70,36,'public','3','2019-07-01 20:04:33','2019-07-01 20:04:33'),(71,36,'public','3','2019-07-01 20:05:18','2019-07-01 20:05:18'),(72,38,'public','2','2019-07-01 21:28:20','2019-07-01 21:28:20'),(73,36,'public','3','2019-07-02 12:11:54','2019-07-02 12:11:54'),(74,36,'public','3','2019-07-02 12:16:29','2019-07-02 12:16:29'),(75,36,'public','3','2019-07-02 12:19:54','2019-07-02 12:19:54'),(76,36,'public','3','2019-07-02 12:51:17','2019-07-02 12:51:17'),(77,36,'public','3','2019-07-02 13:45:08','2019-07-02 13:45:08'),(78,36,'public','3','2019-07-02 13:47:11','2019-07-02 13:47:11'),(79,36,'public','2','2019-07-02 14:58:53','2019-07-02 14:58:53'),(80,36,'public','2','2019-07-02 14:59:32','2019-07-02 14:59:32'),(81,36,'public','2','2019-07-02 15:05:16','2019-07-02 15:05:16'),(82,36,'public','2','2019-07-07 07:18:21','2019-07-07 07:18:21'),(83,36,'public','2','2019-07-07 07:19:48','2019-07-07 07:19:48'),(84,36,'public','2','2019-07-07 07:20:52','2019-07-07 07:20:52'),(85,36,'public','2','2019-07-07 07:25:52','2019-07-07 07:25:52'),(86,36,'public','2','2019-07-07 07:27:03','2019-07-07 07:27:03'),(87,36,'public','2','2019-07-07 07:30:10','2019-07-07 07:30:10'),(88,36,'public','2','2019-07-07 07:39:39','2019-07-07 07:39:39'),(89,36,'public','2','2019-07-07 07:41:08','2019-07-07 07:41:08'),(90,36,'public','2','2019-07-07 07:42:45','2019-07-07 07:42:45'),(91,36,'public','2','2019-07-07 07:47:02','2019-07-07 07:47:02'),(92,36,'public','2','2019-07-07 07:48:54','2019-07-07 07:48:54'),(93,36,'public','2','2019-07-07 07:50:39','2019-07-07 07:50:39'),(94,36,'public','2','2019-07-07 07:52:22','2019-07-07 07:52:22'),(95,36,'public','2','2019-07-07 07:56:53','2019-07-07 07:56:53'),(96,36,'public','2','2019-07-07 07:58:47','2019-07-07 07:58:47'),(97,36,'public','2','2019-07-07 08:03:04','2019-07-07 08:03:04'),(98,36,'','1','2019-07-07 08:04:16','2019-07-07 08:04:16'),(99,36,'','1','2019-07-07 08:07:12','2019-07-07 08:07:12'),(100,36,'public','3','2019-07-07 08:17:13','2019-07-07 08:17:13'),(101,48,'public','2','2019-07-18 10:38:23','2019-07-18 10:38:23'),(102,36,'','1','2019-08-03 01:42:09','2019-08-03 01:42:09'),(103,36,'public','2','2019-08-03 09:17:38','2019-08-03 09:17:38'),(104,36,'public','2','2019-08-03 09:26:22','2019-08-03 09:26:22'),(105,36,'public','2','2019-08-03 09:56:36','2019-08-03 09:56:36'),(106,36,'public','2','2019-08-03 09:58:40','2019-08-03 09:58:40'),(107,36,'public','2','2019-08-03 10:14:02','2019-08-03 10:14:02'),(108,36,'public','2','2019-08-03 10:20:21','2019-08-03 10:20:21'),(109,38,'public','2','2019-08-03 10:30:17','2019-08-03 10:30:17'),(110,36,'','1','2019-08-03 10:36:01','2019-08-03 10:36:01'),(111,36,'public','3','2019-08-03 14:16:59','2019-08-03 14:16:59'),(112,36,'public','3','2019-08-03 14:26:11','2019-08-03 14:26:11'),(113,36,'public','3','2019-08-03 14:34:57','2019-08-03 14:34:57'),(114,36,'public','3','2019-08-03 14:43:20','2019-08-03 14:43:20'),(115,36,'public','3','2019-08-03 15:09:18','2019-08-03 15:09:18'),(116,36,'public','3','2019-08-03 15:22:17','2019-08-03 15:22:17'),(117,36,'public','3','2019-08-03 15:25:40','2019-08-03 15:25:40'),(118,36,'public','3','2019-08-03 15:30:10','2019-08-03 15:30:10'),(119,36,'public','3','2019-08-03 15:34:26','2019-08-03 15:34:26'),(120,36,'public','3','2019-08-03 15:37:47','2019-08-03 15:37:47'),(121,36,'public','3','2019-08-03 15:44:10','2019-08-03 15:44:10'),(122,36,'','1','2019-08-04 11:25:48','2019-08-04 11:25:48'),(123,36,'','1','2019-08-04 11:30:22','2019-08-04 11:30:22'),(124,36,'','1','2019-08-04 11:43:53','2019-08-04 11:43:53'),(125,36,'','1','2019-08-04 11:48:32','2019-08-04 11:48:32'),(126,36,'','1','2019-08-04 11:52:05','2019-08-04 11:52:05'),(127,36,'','1','2019-08-04 11:54:43','2019-08-04 11:54:43'),(128,36,'','1','2019-08-04 11:59:39','2019-08-04 11:59:39'),(129,36,'public','2','2019-08-04 16:50:41','2019-08-04 16:50:41'),(130,36,'public','2','2019-08-04 17:03:35','2019-08-04 17:03:35'),(131,36,'','1','2019-08-04 21:47:45','2019-08-04 21:47:45'),(132,36,'','1','2019-08-04 21:51:19','2019-08-04 21:51:19'),(133,36,'','1','2019-08-04 21:51:19','2019-08-04 21:51:19'),(134,36,'','1','2019-08-04 21:51:58','2019-08-04 21:51:58'),(135,36,'public','3','2019-08-04 22:40:46','2019-08-04 22:40:46'),(136,36,'public','3','2019-08-04 22:46:19','2019-08-04 22:46:19'),(137,36,'public','3','2019-08-04 22:52:37','2019-08-04 22:52:37'),(138,36,'public','3','2019-08-04 22:57:00','2019-08-04 22:57:00'),(139,36,'public','3','2019-08-04 22:58:14','2019-08-04 22:58:14'),(140,36,'public','3','2019-08-04 23:09:32','2019-08-04 23:09:32'),(141,36,'public','3','2019-08-04 23:24:58','2019-08-04 23:24:58'),(142,36,'public','3','2019-08-05 09:59:57','2019-08-05 09:59:57'),(143,36,'public','2','2019-08-05 12:53:50','2019-08-05 12:53:50'),(144,36,'','1','2019-08-05 12:56:59','2019-08-05 12:56:59'),(145,36,'public','3','2019-08-05 13:08:20','2019-08-05 13:08:20'),(146,38,'','1','2019-08-05 18:06:05','2019-08-05 18:06:05'),(147,38,'public','3','2019-08-05 18:11:20','2019-08-05 18:11:20'),(148,38,'public','3','2019-08-05 18:32:45','2019-08-05 18:32:45'),(149,38,'','1','2019-08-05 18:33:44','2019-08-05 18:33:44'),(150,38,'public','3','2019-08-05 18:40:33','2019-08-05 18:40:33'),(151,38,'','1','2019-08-05 18:48:13','2019-08-05 18:48:13'),(152,38,'','1','2019-08-05 18:50:51','2019-08-05 18:50:51'),(153,38,'','1','2019-08-05 18:55:37','2019-08-05 18:55:37'),(154,38,'','1','2019-08-05 18:57:24','2019-08-05 18:57:24'),(155,38,'','1','2019-08-05 19:02:00','2019-08-05 19:02:00'),(156,38,'','1','2019-08-05 19:04:39','2019-08-05 19:04:39'),(157,38,'','1','2019-08-05 19:05:50','2019-08-05 19:05:50'),(158,38,'','1','2019-08-05 19:07:49','2019-08-05 19:07:49'),(159,38,'','1','2019-08-05 19:08:26','2019-08-05 19:08:26'),(160,38,'','1','2019-08-05 19:08:53','2019-08-05 19:08:53'),(161,38,'','1','2019-08-05 19:08:53','2019-08-05 19:08:53'),(162,38,'','1','2019-08-05 19:09:27','2019-08-05 19:09:27'),(163,38,'','1','2019-08-05 19:13:34','2019-08-05 19:13:34'),(164,36,'','1','2019-08-05 19:17:29','2019-08-05 19:17:29'),(165,38,'','1','2019-08-05 19:18:08','2019-08-05 19:18:08'),(166,38,'','1','2019-08-05 19:18:46','2019-08-05 19:18:46'),(167,38,'','1','2019-08-05 19:18:46','2019-08-05 19:18:46'),(168,38,'','1','2019-08-05 19:53:39','2019-08-05 19:53:39'),(169,38,'public','3','2019-08-06 00:00:19','2019-08-06 00:00:19'),(170,38,'public','3','2019-08-06 00:00:19','2019-08-06 00:00:19'),(171,36,'public','3','2019-08-07 21:34:16','2019-08-07 21:34:16'),(172,36,'public','3','2019-08-07 22:23:44','2019-08-07 22:23:44'),(173,36,'public','3','2019-08-07 22:34:43','2019-08-07 22:34:43'),(174,36,'','1','2019-08-08 12:02:37','2019-08-08 12:02:37'),(175,36,'','1','2019-08-08 12:02:37','2019-08-08 12:02:37'),(176,36,'','1','2019-08-08 12:02:37','2019-08-08 12:02:37'),(177,36,'','1','2019-08-08 12:09:39','2019-08-08 12:09:39'),(178,36,'','1','2019-08-08 12:11:55','2019-08-08 12:11:55'),(179,36,'','1','2019-08-08 12:13:26','2019-08-08 12:13:26'),(180,36,'','1','2019-08-08 12:16:14','2019-08-08 12:16:14'),(181,36,'','1','2019-08-08 12:21:17','2019-08-08 12:21:17'),(182,36,'','1','2019-08-08 12:22:33','2019-08-08 12:22:33'),(183,36,'','1','2019-08-08 12:22:35','2019-08-08 12:22:35'),(184,36,'','1','2019-08-08 12:31:06','2019-08-08 12:31:06'),(185,36,'','1','2019-08-08 12:32:22','2019-08-08 12:32:22'),(186,36,'','1','2019-08-08 12:33:37','2019-08-08 12:33:37'),(187,36,'','1','2019-08-08 12:33:43','2019-08-08 12:33:43'),(188,36,'','1','2019-08-08 12:36:31','2019-08-08 12:36:31'),(189,36,'','1','2019-08-08 12:44:15','2019-08-08 12:44:15'),(190,36,'','1','2019-08-08 12:46:33','2019-08-08 12:46:33'),(191,36,'','1','2019-08-08 12:49:05','2019-08-08 12:49:05'),(192,36,'','1','2019-08-08 12:54:20','2019-08-08 12:54:20'),(193,36,'','1','2019-08-08 12:54:20','2019-08-08 12:54:20'),(194,36,'','1','2019-08-08 12:55:25','2019-08-08 12:55:25'),(195,36,'public','2','2019-08-08 18:57:30','2019-08-08 18:57:30'),(196,38,'','1','2019-08-09 13:43:26','2019-08-09 13:43:26'),(197,38,'','1','2019-08-09 14:08:49','2019-08-09 14:08:49'),(205,38,'public','3','2019-08-09 16:42:30','2019-08-09 16:42:30'),(206,38,'public','3','2019-08-09 16:49:15','2019-08-09 16:49:15'),(207,38,'','1','2019-08-09 17:08:32','2019-08-09 17:08:32'),(208,38,'','1','2019-08-09 21:11:29','2019-08-09 21:11:29'),(209,38,'public','3','2019-08-09 21:12:08','2019-08-09 21:12:08'),(210,38,'public','3','2019-08-10 14:54:08','2019-08-10 14:54:08'),(211,54,'public','2','2019-08-14 00:37:54','2019-08-14 00:37:54'),(212,54,'public','2','2019-08-15 08:46:26','2019-08-15 08:46:26'),(213,55,'','1','2019-08-15 13:51:00','2019-08-15 13:51:00'),(214,55,'','1','2019-08-15 13:51:01','2019-08-15 13:51:01'),(215,55,'','1','2019-08-15 13:51:01','2019-08-15 13:51:01'),(216,55,'','1','2019-08-15 13:51:01','2019-08-15 13:51:01'),(217,55,'','1','2019-08-15 13:51:01','2019-08-15 13:51:01'),(218,55,'','1','2019-08-15 13:51:01','2019-08-15 13:51:01'),(219,55,'','1','2019-08-15 13:51:01','2019-08-15 13:51:01'),(220,55,'','1','2019-08-15 13:51:01','2019-08-15 13:51:01'),(221,55,'','1','2019-08-15 13:51:02','2019-08-15 13:51:02'),(222,55,'','1','2019-08-15 13:51:02','2019-08-15 13:51:02'),(223,55,'','1','2019-08-15 13:51:02','2019-08-15 13:51:02'),(224,55,'','1','2019-08-15 13:51:03','2019-08-15 13:51:03'),(225,55,'','1','2019-08-15 13:51:03','2019-08-15 13:51:03'),(226,55,'','1','2019-08-15 13:51:03','2019-08-15 13:51:03'),(227,55,'','1','2019-08-15 13:51:04','2019-08-15 13:51:04'),(228,55,'','1','2019-08-15 13:51:04','2019-08-15 13:51:04'),(229,55,'','1','2019-08-15 13:51:04','2019-08-15 13:51:04'),(230,55,'','1','2019-08-15 13:51:04','2019-08-15 13:51:04'),(231,55,'','1','2019-08-15 13:51:05','2019-08-15 13:51:05'),(232,55,'','1','2019-08-15 13:51:05','2019-08-15 13:51:05'),(233,55,'','1','2019-08-15 13:51:06','2019-08-15 13:51:06'),(234,55,'','1','2019-08-15 13:51:06','2019-08-15 13:51:06'),(235,55,'','1','2019-08-15 13:51:06','2019-08-15 13:51:06'),(236,55,'','1','2019-08-15 13:51:06','2019-08-15 13:51:06'),(237,55,'','1','2019-08-15 13:51:06','2019-08-15 13:51:06'),(238,55,'','1','2019-08-15 13:51:06','2019-08-15 13:51:06'),(239,55,'','1','2019-08-15 13:51:06','2019-08-15 13:51:06'),(240,55,'','1','2019-08-15 13:51:07','2019-08-15 13:51:07'),(241,55,'','1','2019-08-15 13:51:07','2019-08-15 13:51:07'),(242,55,'','1','2019-08-15 13:51:07','2019-08-15 13:51:07'),(243,55,'','1','2019-08-15 13:51:07','2019-08-15 13:51:07'),(244,55,'','1','2019-08-15 13:51:07','2019-08-15 13:51:07'),(245,55,'','1','2019-08-15 13:51:07','2019-08-15 13:51:07'),(246,55,'','1','2019-08-15 13:51:08','2019-08-15 13:51:08'),(247,55,'','1','2019-08-15 13:51:08','2019-08-15 13:51:08'),(248,55,'','1','2019-08-15 13:51:08','2019-08-15 13:51:08'),(249,54,'','1','2019-08-15 20:29:22','2019-08-15 20:29:22'),(250,54,'','1','2019-08-15 20:29:22','2019-08-15 20:29:22'),(251,54,'','1','2019-08-15 20:29:22','2019-08-15 20:29:22'),(252,54,'','1','2019-08-15 20:29:22','2019-08-15 20:29:22'),(253,54,'','1','2019-08-15 20:32:14','2019-08-15 20:32:14'),(254,54,'','1','2019-08-15 20:32:14','2019-08-15 20:32:14'),(255,54,'','1','2019-08-15 20:32:14','2019-08-15 20:32:14'),(256,54,'','1','2019-08-15 22:07:57','2019-08-15 22:07:57'),(257,54,'','1','2019-08-16 17:15:23','2019-08-16 17:15:23'),(258,54,'','1','2019-08-16 17:15:23','2019-08-16 17:15:23'),(259,54,'','1','2019-08-16 17:15:24','2019-08-16 17:15:24'),(260,54,'','1','2019-08-16 17:15:24','2019-08-16 17:15:24'),(261,54,'','1','2019-08-16 17:29:45','2019-08-16 17:29:45'),(262,54,'','1','2019-08-16 17:30:36','2019-08-16 17:30:36'),(263,54,'','1','2019-08-16 18:00:18','2019-08-16 18:00:18'),(264,54,'','1','2019-08-16 18:16:55','2019-08-16 18:16:55'),(265,54,'','1','2019-08-16 18:20:41','2019-08-16 18:20:41'),(266,54,'public','3','2019-08-16 18:21:34','2019-08-16 18:21:34'),(267,54,'','1','2019-08-16 21:14:52','2019-08-16 21:14:52'),(268,54,'','1','2019-08-16 21:16:43','2019-08-16 21:16:43'),(269,54,'','1','2019-08-16 21:36:54','2019-08-16 21:36:54'),(270,54,'public','3','2019-08-16 22:07:01','2019-08-16 22:07:01'),(271,54,'public','3','2019-08-17 13:53:53','2019-08-17 13:53:53'),(272,54,'','1','2019-08-17 13:56:12','2019-08-17 13:56:12'),(273,54,'','1','2019-08-17 14:18:00','2019-08-17 14:18:00'),(274,54,'public','3','2019-08-17 14:50:40','2019-08-17 14:50:40'),(275,54,'public','3','2019-08-17 14:50:41','2019-08-17 14:50:41'),(276,54,'public','3','2019-08-17 14:50:42','2019-08-17 14:50:42'),(277,54,'public','3','2019-08-17 15:45:50','2019-08-17 15:45:50'),(278,54,'public','3','2019-08-20 13:24:05','2019-08-20 13:24:05'),(279,54,'public','3','2019-08-20 13:29:01','2019-08-20 13:29:01'),(280,54,'public','3','2019-08-20 13:30:09','2019-08-20 13:30:09'),(281,54,'public','3','2019-08-20 13:34:26','2019-08-20 13:34:26'),(282,54,'public','3','2019-08-20 13:41:26','2019-08-20 13:41:26'),(283,54,'public','3','2019-08-20 14:18:31','2019-08-20 14:18:31'),(284,54,'public','3','2019-08-20 18:44:10','2019-08-20 18:44:10'),(285,54,'','1','2019-08-20 20:50:50','2019-08-20 20:50:50'),(286,55,'public','3','2019-08-29 09:51:34','2019-08-29 09:51:34'),(287,55,'public','3','2019-08-29 10:11:35','2019-08-29 10:11:35'),(288,38,'','1','2019-09-04 12:40:54','2019-09-04 12:40:54'),(289,55,'','1','2019-09-05 15:51:02','2019-09-05 15:51:02'),(290,55,'','1','2019-09-07 11:01:21','2019-09-07 11:01:21'),(291,55,'','1','2019-09-07 11:01:55','2019-09-07 11:01:55'),(292,55,'','1','2019-09-07 11:02:26','2019-09-07 11:02:26'),(293,55,'public','2','2019-09-07 11:02:57','2019-09-07 11:02:57'),(294,55,'public','2','2019-09-07 11:05:52','2019-09-07 11:05:52'),(295,55,'public','2','2019-09-07 11:06:11','2019-09-07 11:06:11'),(296,55,'public','3','2019-09-07 11:34:45','2019-09-07 11:34:45'),(297,55,'public','2','2019-09-10 09:57:10','2019-09-10 09:57:10'),(298,55,'','1','2019-09-10 09:57:45','2019-09-10 09:57:45'),(299,55,'','1','2019-09-10 09:58:20','2019-09-10 09:58:20'),(300,55,'','1','2019-09-10 09:58:48','2019-09-10 09:58:48'),(301,55,'','1','2019-09-10 10:15:39','2019-09-10 10:15:39'),(302,56,'public','2','2019-09-12 21:07:24','2019-09-12 21:07:24'),(303,56,'','1','2019-09-12 21:11:05','2019-09-12 21:11:05'),(304,56,'','1','2019-09-12 21:11:45','2019-09-12 21:11:45'),(305,56,'','1','2019-09-12 21:11:45','2019-09-12 21:11:45'),(306,65,'public','2','2019-11-21 17:49:21','2019-11-21 17:49:21'),(307,65,'public','1','2019-11-21 17:50:39','2019-11-21 17:50:39'),(308,65,'public','1','2019-11-21 17:51:42','2019-11-21 17:51:42'),(309,65,'public','1','2019-11-21 17:53:43','2019-11-21 17:53:43'),(310,65,'public','3','2019-11-21 17:56:23','2019-11-21 17:56:23');
/*!40000 ALTER TABLE `feeds_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeds_updates`
--

DROP TABLE IF EXISTS `feeds_updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feeds_updates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `update_type` enum('1','2','3') NOT NULL,
  `by_user_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `feed_id` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `feed_id` (`feed_id`),
  KEY `by_User_id` (`by_user_id`),
  KEY `to_user_id` (`to_user_id`),
  CONSTRAINT `feeds_updates_ibfk_1` FOREIGN KEY (`by_user_id`) REFERENCES `fed_user` (`msg_user_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `feeds_updates_ibfk_2` FOREIGN KEY (`feed_id`) REFERENCES `feeds_table` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=460 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeds_updates`
--

LOCK TABLES `feeds_updates` WRITE;
/*!40000 ALTER TABLE `feeds_updates` DISABLE KEYS */;
INSERT INTO `feeds_updates` VALUES (28,'1',38,40,100,'2019-07-16 16:12:21'),(31,'1',43,40,100,'2019-07-16 16:24:42'),(34,'1',43,40,100,'2019-07-16 16:26:21'),(37,'1',43,40,100,'2019-07-16 16:27:49'),(40,'1',43,40,100,'2019-07-16 16:28:43'),(43,'1',43,40,100,'2019-07-16 16:31:45'),(46,'1',43,40,100,'2019-07-16 16:36:16'),(49,'1',43,40,100,'2019-07-16 16:36:21'),(52,'1',43,40,100,'2019-07-16 16:36:39'),(55,'1',43,40,100,'2019-07-16 16:38:20'),(58,'1',43,40,100,'2019-07-16 16:40:09'),(61,'1',43,40,100,'2019-07-16 16:52:47'),(65,'1',43,40,100,'2019-07-16 17:04:56'),(68,'2',43,40,100,'2019-07-16 17:07:20'),(72,'2',49,48,101,'2019-07-18 10:38:47'),(74,'2',36,40,100,'2019-07-21 18:01:29'),(75,'2',36,43,100,'2019-07-21 18:01:29'),(77,'2',36,40,100,'2019-07-21 18:01:43'),(78,'2',36,43,100,'2019-07-21 18:01:43'),(80,'1',36,40,100,'2019-07-21 18:03:05'),(81,'1',36,43,100,'2019-07-21 18:03:05'),(83,'1',36,40,100,'2019-07-21 18:12:37'),(84,'1',36,43,100,'2019-07-21 18:12:37'),(86,'1',36,40,100,'2019-07-21 18:14:45'),(87,'1',36,43,100,'2019-07-21 18:14:45'),(89,'1',36,40,100,'2019-07-21 18:34:05'),(90,'1',36,43,100,'2019-07-21 18:34:05'),(92,'1',36,40,100,'2019-07-21 18:34:59'),(93,'1',36,43,100,'2019-07-21 18:34:59'),(94,'1',36,48,101,'2019-07-23 09:13:08'),(95,'2',36,49,101,'2019-07-24 15:08:18'),(96,'2',36,48,101,'2019-07-24 15:08:18'),(98,'1',38,40,100,'2019-07-27 16:41:30'),(99,'1',38,43,100,'2019-07-27 16:41:30'),(100,'1',36,40,100,'2019-07-28 09:25:36'),(102,'1',36,43,100,'2019-07-28 09:25:36'),(103,'1',36,40,100,'2019-07-28 09:26:15'),(105,'1',36,43,100,'2019-07-28 09:26:15'),(106,'1',36,40,100,'2019-07-28 09:28:54'),(108,'1',36,43,100,'2019-07-28 09:28:54'),(109,'1',36,40,100,'2019-07-28 09:31:19'),(111,'1',36,43,100,'2019-07-28 09:31:19'),(113,'1',38,40,100,'2019-07-28 09:33:49'),(114,'1',38,43,100,'2019-07-28 09:33:49'),(116,'1',38,40,100,'2019-07-28 09:42:11'),(117,'1',38,43,100,'2019-07-28 09:42:11'),(119,'1',38,40,100,'2019-07-28 09:42:32'),(120,'1',38,43,100,'2019-07-28 09:42:32'),(122,'1',38,40,100,'2019-07-28 09:42:35'),(123,'1',38,43,100,'2019-07-28 09:42:35'),(125,'1',38,40,100,'2019-07-28 09:44:28'),(126,'1',38,43,100,'2019-07-28 09:44:28'),(128,'1',38,40,100,'2019-07-28 09:45:21'),(129,'1',38,43,100,'2019-07-28 09:45:21'),(131,'1',38,40,100,'2019-07-28 09:45:53'),(132,'1',38,43,100,'2019-07-28 09:45:53'),(133,'1',36,40,100,'2019-07-28 09:46:24'),(135,'1',36,43,100,'2019-07-28 09:46:24'),(136,'1',36,40,100,'2019-07-28 09:49:17'),(138,'1',36,43,100,'2019-07-28 09:49:17'),(139,'1',36,40,100,'2019-07-28 09:51:49'),(141,'1',36,43,100,'2019-07-28 09:51:49'),(142,'1',36,40,100,'2019-07-28 09:54:39'),(144,'1',36,43,100,'2019-07-28 09:54:39'),(145,'1',36,40,100,'2019-07-28 09:57:52'),(147,'1',36,43,100,'2019-07-28 09:57:53'),(148,'1',36,40,100,'2019-07-28 09:58:59'),(150,'1',36,43,100,'2019-07-28 09:58:59'),(151,'1',36,40,100,'2019-07-28 09:59:07'),(153,'1',36,43,100,'2019-07-28 09:59:07'),(155,'1',38,40,100,'2019-07-28 10:03:13'),(156,'1',38,43,100,'2019-07-28 10:03:13'),(157,'1',36,40,100,'2019-07-28 10:03:26'),(159,'1',36,43,100,'2019-07-28 10:03:27'),(160,'1',36,40,100,'2019-07-28 10:04:27'),(162,'1',36,43,100,'2019-07-28 10:04:27'),(163,'1',36,40,100,'2019-07-28 10:05:15'),(165,'1',36,43,100,'2019-07-28 10:05:15'),(166,'1',36,40,100,'2019-07-28 10:06:36'),(168,'1',36,43,100,'2019-07-28 10:06:36'),(169,'1',36,40,100,'2019-07-28 10:06:56'),(171,'1',36,43,100,'2019-07-28 10:06:56'),(173,'1',38,40,100,'2019-07-28 10:07:16'),(174,'1',38,43,100,'2019-07-28 10:07:16'),(176,'1',38,40,100,'2019-07-28 10:08:23'),(177,'1',38,43,100,'2019-07-28 10:08:23'),(178,'1',36,40,100,'2019-07-28 10:12:12'),(180,'1',36,43,100,'2019-07-28 10:12:12'),(182,'1',38,40,100,'2019-07-28 10:12:41'),(183,'1',38,43,100,'2019-07-28 10:12:41'),(184,'1',36,40,100,'2019-07-28 10:15:05'),(186,'1',36,43,100,'2019-07-28 10:15:05'),(188,'1',38,40,100,'2019-07-28 12:39:31'),(189,'1',38,43,100,'2019-07-28 12:39:31'),(190,'1',36,40,100,'2019-07-28 12:40:35'),(192,'1',36,43,100,'2019-07-28 12:40:35'),(193,'1',36,40,100,'2019-07-28 12:44:39'),(195,'1',36,43,100,'2019-07-28 12:44:39'),(196,'1',36,40,100,'2019-07-28 12:45:49'),(198,'1',36,43,100,'2019-07-28 12:45:49'),(200,'1',38,40,100,'2019-07-28 12:49:29'),(201,'1',38,43,100,'2019-07-28 12:49:29'),(202,'1',36,40,100,'2019-07-28 13:11:53'),(204,'1',36,43,100,'2019-07-28 13:11:53'),(205,'1',36,40,100,'2019-07-28 13:12:32'),(207,'1',36,43,100,'2019-07-28 13:12:32'),(208,'1',36,40,100,'2019-07-28 13:13:30'),(210,'1',36,43,100,'2019-07-28 13:13:30'),(211,'1',36,40,100,'2019-07-28 13:13:57'),(213,'1',36,43,100,'2019-07-28 13:13:57'),(215,'1',38,40,100,'2019-07-28 13:14:43'),(216,'1',38,43,100,'2019-07-28 13:14:43'),(218,'1',38,40,100,'2019-07-28 13:17:30'),(219,'1',38,43,100,'2019-07-28 13:17:30'),(220,'1',36,40,100,'2019-07-28 13:18:17'),(222,'1',36,43,100,'2019-07-28 13:18:17'),(224,'1',38,40,100,'2019-07-28 13:22:42'),(225,'1',38,43,100,'2019-07-28 13:22:42'),(226,'1',36,40,100,'2019-07-28 13:23:06'),(228,'1',36,43,100,'2019-07-28 13:23:06'),(231,'1',38,40,100,'2019-07-28 13:39:25'),(232,'1',38,43,100,'2019-07-28 13:39:25'),(233,'1',38,40,100,'2019-07-28 13:39:25'),(234,'1',38,43,100,'2019-07-28 13:39:25'),(237,'1',38,40,100,'2019-07-28 13:40:08'),(238,'1',38,43,100,'2019-07-28 13:40:08'),(239,'1',38,40,100,'2019-07-28 13:40:08'),(240,'1',38,43,100,'2019-07-28 13:40:08'),(242,'1',38,40,100,'2019-07-28 13:40:42'),(243,'1',38,43,100,'2019-07-28 13:40:42'),(245,'1',38,40,100,'2019-07-28 13:40:43'),(246,'1',38,43,100,'2019-07-28 13:40:43'),(247,'1',36,40,100,'2019-07-28 13:41:24'),(249,'1',36,43,100,'2019-07-28 13:41:24'),(252,'1',38,40,100,'2019-07-28 13:43:08'),(253,'1',38,43,100,'2019-07-28 13:43:08'),(254,'1',38,40,100,'2019-07-28 13:43:08'),(255,'1',38,43,100,'2019-07-28 13:43:08'),(257,'1',38,40,100,'2019-07-28 13:43:30'),(258,'1',38,43,100,'2019-07-28 13:43:30'),(259,'1',36,40,100,'2019-07-28 13:43:50'),(261,'1',36,43,100,'2019-07-28 13:43:50'),(263,'1',38,40,100,'2019-07-28 13:43:58'),(264,'1',38,43,100,'2019-07-28 13:43:58'),(266,'1',38,40,100,'2019-07-28 13:57:19'),(267,'1',38,43,100,'2019-07-28 13:57:19'),(269,'1',38,40,100,'2019-07-28 14:01:08'),(270,'1',38,43,100,'2019-07-28 14:01:08'),(272,'1',38,40,100,'2019-07-28 14:15:07'),(273,'1',38,43,100,'2019-07-28 14:15:07'),(275,'1',38,40,100,'2019-07-28 14:15:29'),(276,'1',38,43,100,'2019-07-28 14:15:29'),(278,'1',38,40,100,'2019-07-28 14:17:25'),(279,'1',38,43,100,'2019-07-28 14:17:25'),(281,'1',38,40,100,'2019-07-28 14:19:15'),(282,'1',38,43,100,'2019-07-28 14:19:15'),(284,'1',38,40,100,'2019-07-28 14:21:05'),(285,'1',38,43,100,'2019-07-28 14:21:06'),(287,'1',38,40,100,'2019-07-28 14:21:06'),(288,'1',38,43,100,'2019-07-28 14:21:06'),(290,'1',38,40,100,'2019-07-28 14:25:01'),(291,'1',38,43,100,'2019-07-28 14:25:01'),(293,'2',36,49,101,'2019-07-30 00:10:54'),(294,'2',36,48,101,'2019-07-30 00:10:54'),(295,'2',38,40,100,'2019-07-31 00:43:00'),(296,'2',38,43,100,'2019-07-31 00:43:00'),(299,'1',38,40,100,'2019-08-02 12:56:48'),(300,'1',38,43,100,'2019-08-02 12:56:48'),(301,'2',36,40,100,'2019-08-02 22:39:04'),(302,'2',36,43,100,'2019-08-02 22:39:04'),(303,'1',36,40,100,'2019-08-02 22:39:13'),(305,'1',36,43,100,'2019-08-02 22:39:13'),(306,'1',36,40,100,'2019-08-02 22:39:43'),(308,'1',36,43,100,'2019-08-02 22:39:43'),(309,'2',36,40,100,'2019-08-02 23:10:41'),(310,'2',36,43,100,'2019-08-02 23:10:41'),(311,'1',36,43,93,'2019-08-03 00:22:59'),(350,'1',38,40,100,'2019-08-07 12:36:57'),(351,'1',38,43,100,'2019-08-07 12:36:57'),(361,'2',36,36,194,'2019-08-08 18:56:17'),(362,'2',38,36,195,'2019-08-08 18:57:46'),(371,'3',38,36,288,'2019-09-04 14:24:18'),(448,'2',54,55,296,'2019-10-03 19:37:17'),(458,'1',54,56,305,'2019-10-10 14:32:24'),(459,'1',54,56,305,'2019-10-10 15:12:16');
/*!40000 ALTER TABLE `feeds_updates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeds_views`
--

DROP TABLE IF EXISTS `feeds_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feeds_views` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_id` int(11) NOT NULL,
  `viewer_id` int(11) NOT NULL,
  `date_viewed` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `viewer_id` (`viewer_id`),
  KEY `feed_id` (`feed_id`),
  CONSTRAINT `feeds_views_ibfk_1` FOREIGN KEY (`viewer_id`) REFERENCES `fed_user` (`msg_user_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `feeds_views_ibfk_2` FOREIGN KEY (`feed_id`) REFERENCES `feeds_table` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeds_views`
--

LOCK TABLES `feeds_views` WRITE;
/*!40000 ALTER TABLE `feeds_views` DISABLE KEYS */;
INSERT INTO `feeds_views` VALUES (1,77,36,'2019-07-05 12:37:57'),(2,73,36,'2019-07-05 12:41:40'),(3,78,36,'2019-07-05 12:59:27'),(4,78,38,'2019-07-05 13:00:00'),(5,76,36,'2019-07-05 15:34:29'),(6,74,36,'2019-07-05 16:38:18'),(7,75,36,'2019-07-05 16:38:51'),(8,66,36,'2019-07-06 14:46:34'),(9,100,38,'2019-07-07 08:17:52'),(10,100,36,'2019-07-07 09:39:33'),(11,100,43,'2019-07-16 16:31:37'),(12,48,36,'2019-07-17 22:06:20'),(13,74,38,'2019-07-21 22:28:50'),(14,76,38,'2019-07-22 17:45:34'),(15,57,36,'2019-07-24 10:30:40'),(16,58,36,'2019-07-24 10:30:54'),(17,277,54,'2019-08-20 09:33:25'),(18,278,54,'2019-08-20 13:25:35'),(19,283,54,'2019-08-20 14:18:34'),(20,284,54,'2019-08-20 19:37:31'),(21,281,54,'2019-08-23 08:50:28'),(22,287,55,'2019-08-29 10:11:40'),(23,277,55,'2019-08-30 08:54:57'),(24,266,55,'2019-08-31 09:55:57'),(25,274,55,'2019-08-31 14:49:48'),(26,286,55,'2019-09-01 17:57:34'),(27,284,55,'2019-09-03 22:00:27'),(28,266,38,'2019-09-04 19:09:17'),(29,284,38,'2019-09-04 20:29:25'),(30,60,38,'2019-09-04 20:36:44'),(31,282,38,'2019-09-04 20:37:44'),(32,296,55,'2019-09-07 11:34:55'),(33,284,56,'2019-09-12 21:26:37'),(34,266,56,'2019-09-12 21:36:32'),(35,283,55,'2019-09-21 09:12:49'),(36,280,55,'2019-09-21 09:12:56'),(37,283,38,'2019-09-21 22:43:11'),(38,271,38,'2019-09-21 22:43:30'),(39,287,54,'2019-10-11 11:07:56'),(40,310,65,'2019-11-21 17:56:26');
/*!40000 ALTER TABLE `feeds_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account_confirmations`
--

DROP TABLE IF EXISTS `user_account_confirmations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_account_confirmations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(150) COLLATE utf8mb4_bin NOT NULL,
  `date_time` datetime NOT NULL,
  `one_time_pin` int(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account_confirmations`
--

LOCK TABLES `user_account_confirmations` WRITE;
/*!40000 ALTER TABLE `user_account_confirmations` DISABLE KEYS */;
INSERT INTO `user_account_confirmations` VALUES (18,'heyhey@heyhey.heyhey','2019-11-20 07:55:18',643390),(25,'hum@ddd.com','2019-11-21 09:17:52',124640),(26,'siyandaplaatyi@gmail.com','2019-11-21 12:06:54',275314),(27,'siphokaziplaatyi@gmail.com','2019-11-21 12:07:39',261966),(28,'peshyuku@gmail.com','2019-11-21 17:33:04',533708),(29,'syuku@gmail.com','2019-11-22 05:22:42',798765);
/*!40000 ALTER TABLE `user_account_confirmations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_checkin_up`
--

DROP TABLE IF EXISTS `user_checkin_up`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_checkin_up` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id_checking` int(11) NOT NULL,
  `user_id_checked` int(11) NOT NULL,
  `date_checked` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_checking` (`user_id_checking`),
  KEY `user_id_checked` (`user_id_checked`),
  CONSTRAINT `user_checkin_up_ibfk_1` FOREIGN KEY (`user_id_checking`) REFERENCES `fed_user` (`msg_user_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `user_checkin_up_ibfk_2` FOREIGN KEY (`user_id_checked`) REFERENCES `fed_user` (`msg_user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_checkin_up`
--

LOCK TABLES `user_checkin_up` WRITE;
/*!40000 ALTER TABLE `user_checkin_up` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_checkin_up` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-27  1:42:49
