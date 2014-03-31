-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 10, 2014 at 06:08 AM
-- Server version: 5.1.44
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `healthdatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `action`
--

CREATE TABLE IF NOT EXISTS `action` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patientid` int(11) NOT NULL,
  `name` varchar(512) DEFAULT NULL,
  `type` varchar(512) DEFAULT NULL,
  `fromdate` date DEFAULT NULL,
  `todate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `action`
--


-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE IF NOT EXISTS `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `name` varchar(512) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `activity`
--


-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE IF NOT EXISTS `appointment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patientid` int(11) NOT NULL,
  `doctorId` varchar(500) NOT NULL,
  `specialtyid` varchar(500) NOT NULL,
  `apptdate` varchar(300) NOT NULL,
  `confirmed` varchar(500) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `frequency` varchar(100) NOT NULL,
  `occurences` varchar(100) NOT NULL,
  `reminder1` varchar(200) NOT NULL,
  `reminder2` varchar(200) NOT NULL,
  `status` varchar(200) NOT NULL,
  `createdby` varchar(100) NOT NULL,
  `creationdate` varchar(500) NOT NULL,
  `lastupdatedby` varchar(100) NOT NULL,
  `lastupdationdate` varchar(500) NOT NULL,
  `isdeleted` varchar(100) NOT NULL,
  `ismissed` varchar(100) NOT NULL,
  `isencrypted` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `patientid`, `doctorId`, `specialtyid`, `apptdate`, `confirmed`, `description`, `frequency`, `occurences`, `reminder1`, `reminder2`, `status`, `createdby`, `creationdate`, `lastupdatedby`, `lastupdationdate`, `isdeleted`, `ismissed`, `isencrypted`) VALUES
(23, 5, '124', '4', '2013-10-19 19:55', '1', 'edscsdca', 'Daily', '', '2H', '3H', '1', '5', '2013-10-19', '5', '2013-10-19', '0', '', 0),
(24, 5, '124', '4', '2013-10-21 04:52', '1', 'test', 'Daily', '', '2H', '3H', '1', '5', '2013-10-21', '5', '2013-10-21', '0', '', 0),
(25, 5, '123', '1', '2013-11-08 22:28', '1', 'You must attend the appointment', 'Daily', '', '2H', '3H', '1', '5', '2013-11-08', '5', '2013-11-08', '0', '', 0),
(26, 5, '123', '1', '2013-11-08 22:32', '1', 'You must attend the appointment', 'Daily', '', '2H', '3H', '1', '5', '2013-11-08', '5', '2013-11-08', '0', '', 0),
(27, 5, '123', '1', '2013-11-09 17:51', '1', 'You must attend this appointment', 'Daily', '', '2H', '3H', '1', '5', '2013-11-09', '5', '2013-11-09', '0', '', 0),
(28, 5, '124', '4', '2013-11-10 05:30', '1', 'You must attend this appointment ', 'Daily', '', '2H', '3H', '1', '5', '2013-11-10', '5', '2013-11-10', '0', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE IF NOT EXISTS `auth` (
  `authid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(512) NOT NULL,
  `password` varchar(512) NOT NULL,
  PRIMARY KEY (`authid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=217 ;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`authid`, `username`, `password`) VALUES
(123, 'gopals', 'password'),
(124, 'satisha', 'password'),
(126, 'anwars', 'password'),
(175, 'dhimtrii2234', '111111'),
(35, 'anandp', 'password'),
(5, 'amitb', 'password'),
(125, 'leelab', 'password'),
(174, 'dhimtrii222234', '111111'),
(173, 'dhimtrii22223', 'qwerty'),
(172, 'dhimtrii2222', 'qwerty'),
(171, 'dhimtrii1111', 'asdfgh'),
(170, 'dhimtrii1234', '123456'),
(169, 'dhimtrii123', '123456'),
(168, 'dhimtrii123', '123456'),
(167, 'dhimtrii', '123456'),
(176, 'dhimtriiq1', '1qaz'),
(177, 'dhimtriiq12', '1111'),
(178, 'dhimtriiq2', '1111'),
(179, 'dhimtriiq21', '111'),
(180, 'dhimtriiws', '111'),
(181, 'dhimtriiw', '1111'),
(182, 'dhimtriiss', '11111'),
(188, 'akki1', '12341'),
(187, 'akki', '1234'),
(189, 'akkiiii', '1234'),
(190, 'akkiiiis', '1234'),
(191, 'akkiiiissaa', '1234'),
(192, 'akkiiiisXsaa', '1234'),
(193, 'akksXsaa', '1234'),
(194, 'akksXsaawe', '1234'),
(195, 'akksXswsaawe', '1234'),
(196, 'akksaawe', '1234'),
(197, 'aasdkksaawe', '1234'),
(198, 'mine', '1234'),
(199, 'mine12a', '1234'),
(200, 'mine12as', '1234'),
(201, 'minesadas12as', '1234'),
(202, 'testuser', '1234'),
(203, 'testuser21', '1234'),
(204, 'testusder21', '1234'),
(205, 'akkisad', '12345'),
(206, 'akad', '1234'),
(207, 'akadas', '1234'),
(208, 'akadasasd', '1234'),
(209, 'akaddasdsasasd', '1234'),
(210, 'sasasd', '1234'),
(211, 'akkisd', '1234'),
(212, 'akaski', '1234'),
(213, 'akki9', '1234'),
(214, 'akki99', '1234'),
(215, 'akki98', '1234'),
(216, 'akki1232', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `childVaccination`
--

CREATE TABLE IF NOT EXISTS `childVaccination` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chldid` int(11) DEFAULT NULL,
  `scheduledDate` date DEFAULT NULL,
  `datetaken` date DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=190 ;

--
-- Dumping data for table `childVaccination`
--

INSERT INTO `childVaccination` (`id`, `chldid`, `scheduledDate`, `datetaken`, `vid`) VALUES
(168, 19, '2024-07-22', '2013-11-12', 14),
(167, 19, '2022-01-22', NULL, 13),
(166, 19, '2016-09-22', '2013-11-12', 12),
(165, 19, '2014-12-22', NULL, 11),
(164, 19, '2014-06-22', NULL, 10),
(163, 19, '2014-04-22', NULL, 9),
(162, 19, '2013-12-22', NULL, 8),
(189, 22, '2024-08-20', NULL, 14),
(188, 22, '2022-02-20', NULL, 13),
(187, 22, '2016-10-20', NULL, 12),
(186, 22, '2015-01-20', NULL, 11),
(185, 22, '2014-07-20', NULL, 10),
(184, 22, '2014-05-20', NULL, 9),
(183, 22, '2014-01-20', NULL, 8);

-- --------------------------------------------------------

--
-- Table structure for table `childVaccinationdata`
--

CREATE TABLE IF NOT EXISTS `childVaccinationdata` (
  `chldid` int(11) NOT NULL AUTO_INCREMENT,
  `patientid` int(11) DEFAULT NULL,
  `childName` varchar(100) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  PRIMARY KEY (`chldid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `childVaccinationdata`
--

INSERT INTO `childVaccinationdata` (`chldid`, `patientid`, `childName`, `dob`) VALUES
(19, 5, 'Test Child', '2013-07-22'),
(22, 5, 'wedfsdfa', '2013-10-21');

-- --------------------------------------------------------

--
-- Table structure for table `contactnumbers`
--

CREATE TABLE IF NOT EXISTS `contactnumbers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `contacttype` varchar(200) NOT NULL,
  `contactnumber` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `contactnumbers`
--


-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE IF NOT EXISTS `country` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(200) NOT NULL,
  `name` varchar(512) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`cid`, `code`, `name`) VALUES
(1, 'US', 'United States of America'),
(2, 'IN', 'India'),
(3, 'UK', 'United Kingdom');

-- --------------------------------------------------------

--
-- Table structure for table `dosagetype`
--

CREATE TABLE IF NOT EXISTS `dosagetype` (
  `dsid` int(11) NOT NULL AUTO_INCREMENT,
  `dosagename` varchar(100) NOT NULL,
  PRIMARY KEY (`dsid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `dosagetype`
--

INSERT INTO `dosagetype` (`dsid`, `dosagename`) VALUES
(1, 'Tea spoon'),
(2, 'Pills'),
(3, 'Tabs'),
(4, 'Caps'),
(5, 'Liquid'),
(6, 'Application on body (lotion/paste)'),
(7, 'Nasal (inhaler)'),
(8, 'Injection'),
(9, 'Droplets (ear/eyes)'),
(10, 'Tablet / capsule');

-- --------------------------------------------------------

--
-- Table structure for table `exercise`
--

CREATE TABLE IF NOT EXISTS `exercise` (
  `eId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`eId`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `exercise`
--

INSERT INTO `exercise` (`eId`, `name`) VALUES
(1, 'Yoga'),
(2, 'Walk'),
(3, 'Jogging');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE IF NOT EXISTS `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `filename` varchar(512) NOT NULL,
  `title` varchar(512) NOT NULL,
  `uploaddate` date DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=141 ;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `userid`, `filename`, `title`, `uploaddate`, `type`, `comment`) VALUES
(137, 0, '3a6074d7ce37217c6f7433a47fdfecf7.pdf', '', '2014-01-02', 'Image', NULL),
(136, 0, '6ab571d6327e29e7b9120a147e58ec25.pdf', '', '2014-01-02', 'Image', NULL),
(135, 0, '200d4d337c1140a88d281ca9ee9f0306.pdf', '', '2014-01-02', 'Image', NULL),
(134, 0, '9a843a212b6e4f55db07a3f10823f898.pdf', '', '2014-01-02', 'Image', NULL),
(133, 0, 'a703bc846eead29111c7007b2e26a230.png', '', '2014-01-02', 'Image', NULL),
(116, 0, 'bc3d6780ffcf970b460a319f1d5e7968.jpg', '', '2014-01-02', 'Image', NULL),
(117, 0, 'ca1bbc8d683a63a71c1748ab0ce34ab7.PDF', '', '2014-01-02', 'Image', NULL),
(118, 0, '9f8a17f352350d4d344a6c092645eda4.jpg', '', '2014-01-02', 'Image', NULL),
(119, 0, '2ee3a32e23baffd31be1dd3432d60370.PDF', '', '2014-01-02', 'Image', NULL),
(120, 0, 'a133e6597a6713d3c2c1ad2d9fd5c86a.PDF', '', '2014-01-02', 'Image', NULL),
(121, 0, '159f7443e3b8d6df252c340c0c3c57d1.PDF', '', '2014-01-02', 'Image', NULL),
(122, 0, 'e381869ceb9a7bcdd0f0791bbfa220ba.PDF', '', '2014-01-02', 'Image', NULL),
(123, 0, 'a549008a260ab9e4b923bbd33040052a.PDF', '', '2014-01-02', 'Image', NULL),
(124, 0, '7c046893a7861d189d75d34d88ff394e.jpg', '', '2014-01-02', 'Image', NULL),
(125, 0, '1175c18fc3ef8b6e43e4af288f848e01.jpg', '', '2014-01-02', 'Image', NULL),
(126, 0, 'e07b99c078c48eedbe2c7cf19d49fe60.jpg', '', '2014-01-02', 'Image', NULL),
(127, 0, 'c46a49e1d235c9bbdb541e187a94db4b.jpg', '', '2014-01-02', 'Image', NULL),
(128, 0, '157665b6327313e6cdba19c93604f97a.jpg', '', '2014-01-02', 'Image', NULL),
(129, 0, '62f6fcc876a8a0fbdd2a4330a9842ccf.jpg', '', '2014-01-02', 'Image', NULL),
(130, 0, '74e9c58fa20319b8a83262873a3ff1b7.jpg', '', '2014-01-02', 'Image', NULL),
(131, 0, 'c9a32b4f2373941d1ce04a36ee7eb485.jpg', '', '2014-01-02', 'Image', NULL),
(132, 0, 'acfc5c7f1bdcbf5148ad12e0d71ff93f.jpg', '', '2014-01-02', 'Image', NULL),
(115, 5, '637ac3ecd6e0b51a5a1be0ca189afafc.pdf', 'pdf files', '2013-12-25', 'PDF', NULL),
(114, 5, 'e2c7d249b2524a632e2de6eb175bf2f1.doc', 'doc file', '2013-12-25', 'Image', NULL),
(113, 5, '695965ac46852a1f0b0617515920ceff.jpg', 'new file', '2013-12-25', 'Image', NULL),
(140, 0, 'c679fde28249eb06e6710bf74392c2ea.pdf', '', '2014-01-02', 'Image', NULL),
(139, 0, 'b6605bdbae7103bc25d15ee530960d67.pdf', '', '2014-01-02', 'Image', NULL),
(138, 0, 'c52335db9e684593474dd0acdeacd94f.pdf', '', '2014-01-02', 'Image', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `medication`
--

CREATE TABLE IF NOT EXISTS `medication` (
  `mid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) DEFAULT NULL,
  `medpicture` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=84 ;

--
-- Dumping data for table `medication`
--

INSERT INTO `medication` (`mid`, `name`, `medpicture`) VALUES
(81, 'Glace', 'oxycotin.png');

-- --------------------------------------------------------

--
-- Table structure for table `medicationtime`
--

CREATE TABLE IF NOT EXISTS `medicationtime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `medicationtime`
--

INSERT INTO `medicationtime` (`id`, `name`) VALUES
(1, 'Times a day'),
(2, 'Times a week'),
(3, 'Times a month'),
(4, 'Before breakfast'),
(5, 'After breakfast'),
(6, 'Before lunch'),
(7, 'After lunch'),
(8, 'Before dinner'),
(9, 'After dinner');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE IF NOT EXISTS `patient` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `isactive` tinyint(1) DEFAULT NULL,
  `lockcode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=119 ;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`pid`, `userid`, `isactive`, `lockcode`) VALUES
(51, 81, 1, NULL),
(52, 52, 1, NULL),
(53, 83, 1, NULL),
(54, 84, 1, NULL),
(55, 85, 1, NULL),
(56, 86, 1, NULL),
(57, 87, 1, NULL),
(58, 88, 1, NULL),
(59, 89, 1, NULL),
(60, 90, 1, NULL),
(61, 91, 1, NULL),
(62, 92, 1, NULL),
(63, 93, 1, NULL),
(64, 94, 1, NULL),
(65, 95, 1, NULL),
(66, 96, 1, NULL),
(67, 97, 1, NULL),
(68, 98, 1, NULL),
(69, 99, 1, NULL),
(70, 100, 1, NULL),
(71, 101, 1, NULL),
(72, 102, 1, NULL),
(73, 103, 1, NULL),
(74, 104, 1, NULL),
(75, 105, 1, NULL),
(76, 106, 1, NULL),
(77, 107, 1, NULL),
(78, 108, 1, NULL),
(79, 109, 1, NULL),
(80, 110, 1, NULL),
(81, 111, 1, NULL),
(82, 112, 1, NULL),
(83, 113, 1, NULL),
(84, 114, 1, NULL),
(85, 115, 1, NULL),
(86, 116, 1, NULL),
(87, 117, 1, NULL),
(88, 118, 1, NULL),
(89, 119, 1, NULL),
(90, 120, 1, NULL),
(19, 19, 1, NULL),
(3, 3, 1, NULL),
(20, 20, 1, NULL),
(21, 21, 1, NULL),
(22, 22, 1, NULL),
(23, 23, 1, NULL),
(24, 24, 1, NULL),
(25, 25, 1, NULL),
(26, 26, 1, NULL),
(5, 5, 1, '1234'),
(8, 8, 1, NULL),
(9, 9, 1, NULL),
(10, 10, 1, NULL),
(11, 11, 1, NULL),
(12, 12, 1, NULL),
(13, 13, 1, NULL),
(15, 15, 1, NULL),
(16, 16, 1, NULL),
(17, 17, 1, NULL),
(18, 18, 1, NULL),
(14, 14, 1, '1111'),
(32, 62, 1, NULL),
(36, 66, 1, NULL),
(39, 69, 1, NULL),
(41, 71, 1, NULL),
(47, 77, 1, NULL),
(48, 78, 1, NULL),
(49, 79, 1, NULL),
(50, 80, 1, NULL),
(1, 1, 1, NULL),
(2, 2, 1, NULL),
(4, 4, 1, NULL),
(6, 6, 1, NULL),
(7, 7, 1, NULL),
(27, 27, 1, NULL),
(28, 28, 1, NULL),
(29, 29, 1, NULL),
(30, 30, 1, NULL),
(31, 61, 1, NULL),
(40, 70, 1, NULL),
(33, 63, 1, NULL),
(44, 74, 1, NULL),
(37, 67, 1, NULL),
(42, 72, 1, NULL),
(34, 64, 1, NULL),
(46, 76, 1, NULL),
(35, 35, 1, NULL),
(43, 73, 1, NULL),
(45, 75, 1, NULL),
(38, 68, 1, NULL),
(91, 121, 1, NULL),
(92, 122, 1, NULL),
(93, 123, 1, NULL),
(94, 124, 1, NULL),
(95, 125, 1, NULL),
(96, 126, 1, NULL),
(97, 127, 1, NULL),
(98, 128, 1, NULL),
(99, 129, 1, NULL),
(100, 130, 1, NULL),
(101, 184, 1, '0000'),
(103, 186, 1, '0000'),
(104, 187, 1, '0000'),
(105, 203, 1, '0000'),
(106, 204, 1, '0000'),
(107, 205, 1, '0000'),
(108, 206, 1, '0000'),
(109, 207, 1, '0000'),
(110, 208, 1, '0000'),
(111, 209, 1, '0000'),
(112, 210, 1, '0000'),
(113, 211, 1, '0000'),
(114, 212, 1, '0000'),
(115, 213, 1, '0000'),
(116, 214, 1, '0000'),
(117, 215, 1, '0000'),
(118, 216, 1, '0000');

-- --------------------------------------------------------

--
-- Table structure for table `patientactivity`
--

CREATE TABLE IF NOT EXISTS `patientactivity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patientid` int(11) NOT NULL,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `time1` varchar(512) DEFAULT NULL,
  `date` date NOT NULL,
  `createddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdby` int(11) NOT NULL,
  `lastupdatedby` int(11) NOT NULL,
  `isdeleted` tinyint(1) DEFAULT NULL,
  `lastupdateddate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `patientactivity`
--


-- --------------------------------------------------------

--
-- Table structure for table `patientdoctor`
--

CREATE TABLE IF NOT EXISTS `patientdoctor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patientid` int(11) NOT NULL,
  `doctorid` int(11) NOT NULL,
  `isactive` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `patientdoctor`
--

INSERT INTO `patientdoctor` (`id`, `patientid`, `doctorid`, `isactive`) VALUES
(2, 5, 123, 1),
(4, 5, 124, 1),
(1, 5, 125, 0),
(3, 5, 126, 0),
(5, 35, 123, 0),
(6, 35, 124, 0),
(7, 35, 125, 0);

-- --------------------------------------------------------

--
-- Table structure for table `patientexercise`
--

CREATE TABLE IF NOT EXISTS `patientexercise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patientid` int(11) NOT NULL,
  `exerciseid` int(11) NOT NULL,
  `createdby` int(11) DEFAULT NULL,
  `lastupdatedby` int(11) DEFAULT NULL,
  `createddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastupdateddate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fromdate` date NOT NULL,
  `todate` date DEFAULT NULL,
  `type` varchar(512) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `duration` varchar(512) DEFAULT NULL,
  `frequency` varchar(255) DEFAULT NULL,
  `time1` varchar(512) DEFAULT NULL,
  `time2` varchar(512) DEFAULT NULL,
  `time3` varchar(512) DEFAULT NULL,
  `time4` varchar(512) DEFAULT NULL,
  `time5` varchar(512) DEFAULT NULL,
  `reminderduration` int(11) DEFAULT NULL,
  `isdeleted` tinyint(1) NOT NULL DEFAULT '0',
  `isencrypted` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

--
-- Dumping data for table `patientexercise`
--

INSERT INTO `patientexercise` (`id`, `patientid`, `exerciseid`, `createdby`, `lastupdatedby`, `createddate`, `lastupdateddate`, `fromdate`, `todate`, `type`, `description`, `duration`, `frequency`, `time1`, `time2`, `time3`, `time4`, `time5`, `reminderduration`, `isdeleted`, `isencrypted`) VALUES
(23, 5, 2, 5, 5, '2013-10-20 16:49:03', '2013-09-28 00:00:00', '2013-09-28', '2013-10-28', 'medium', 'Test description', '20', '1', '04:11 PM', '', '', '', '', NULL, 1, 0),
(24, 5, 1, 5, 5, '2013-10-20 16:49:16', '2013-10-20 00:00:00', '2013-10-20', '2013-11-20', 'medium', 'sdfsdfs', '2', '1', '04:30 PM', '', '', '', '', NULL, 1, 0),
(25, 5, 2, 5, 5, '2013-11-10 16:23:05', '2013-10-21 00:00:00', '2013-11-10', '2013-12-10', 'medium', 'YOu must perform this regularly', '10', '2', '04:21 PM', '11:21 PM', '', '', '', NULL, 0, 0),
(26, 5, 3, 5, 5, '2013-11-09 00:00:00', '2013-11-09 00:00:00', '2013-11-09', '2013-12-09', 'medium', 'This exercises must be done regularly', '30', '2', '05:50 PM', '10:50 PM', '', '', '', NULL, 0, 0),
(27, 5, 1, 5, 5, '2013-12-15 00:00:00', '2013-12-15 00:00:00', '2013-12-15', '2013-12-17', 'medium', 'sdhdasjkh', '2', '1', '12:26 PM', '', '', '', '', NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `patientmedication`
--

CREATE TABLE IF NOT EXISTS `patientmedication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patientid` int(11) NOT NULL,
  `medicationid` int(11) NOT NULL,
  `fromdate` date DEFAULT NULL,
  `todate` date DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `dosage` varchar(512) DEFAULT NULL,
  `dosagetypeid` int(11) NOT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  `medtimeid` int(11) DEFAULT NULL,
  `refillinformation` varchar(512) DEFAULT NULL,
  `frequency` varchar(512) DEFAULT NULL,
  `reminderduration` varchar(512) DEFAULT NULL,
  `time1` varchar(512) DEFAULT NULL,
  `time2` varchar(512) DEFAULT NULL,
  `time3` varchar(512) DEFAULT NULL,
  `time4` varchar(512) DEFAULT NULL,
  `time5` varchar(512) DEFAULT NULL,
  `time6` varchar(512) DEFAULT NULL,
  `isdeleted` tinyint(1) NOT NULL DEFAULT '0',
  `issunday` tinyint(1) NOT NULL DEFAULT '0',
  `ismonday` tinyint(1) NOT NULL DEFAULT '0',
  `istuesday` tinyint(1) NOT NULL DEFAULT '0',
  `iswednesday` tinyint(1) NOT NULL DEFAULT '0',
  `isthursday` tinyint(1) NOT NULL DEFAULT '0',
  `isfriday` tinyint(1) NOT NULL DEFAULT '0',
  `issaturday` tinyint(1) NOT NULL DEFAULT '0',
  `createdby` int(11) DEFAULT NULL,
  `lastupdatedby` int(11) DEFAULT NULL,
  `createddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastupdateddate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `isencrypted` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=47 ;

--
-- Dumping data for table `patientmedication`
--

INSERT INTO `patientmedication` (`id`, `patientid`, `medicationid`, `fromdate`, `todate`, `description`, `dosage`, `dosagetypeid`, `comments`, `medtimeid`, `refillinformation`, `frequency`, `reminderduration`, `time1`, `time2`, `time3`, `time4`, `time5`, `time6`, `isdeleted`, `issunday`, `ismonday`, `istuesday`, `iswednesday`, `isthursday`, `isfriday`, `issaturday`, `createdby`, `lastupdatedby`, `createddate`, `lastupdateddate`, `isencrypted`) VALUES
(44, 5, 81, '2013-11-09', '2013-12-10', '', '3', 1, 'This medication must be taken regularly', 0, 'refill', '2', '', '04:02 PM', '09:02 PM', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, '2013-11-10 16:11:11', '2013-11-10 10:41:11', 0);

-- --------------------------------------------------------

--
-- Table structure for table `patientvaccination`
--

CREATE TABLE IF NOT EXISTS `patientvaccination` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patientid` int(11) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  `scheduledDate` date DEFAULT NULL,
  `datetaken` date DEFAULT NULL,
  `isdeleted` int(11) DEFAULT '0',
  `isencrypted` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=41 ;

--
-- Dumping data for table `patientvaccination`
--

INSERT INTO `patientvaccination` (`id`, `patientid`, `vid`, `scheduledDate`, `datetaken`, `isdeleted`, `isencrypted`) VALUES
(40, 5, 40, '2013-11-09', '2013-11-11', 0, 0),
(39, 5, 39, '2013-09-28', '2013-11-10', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `patientvital`
--

CREATE TABLE IF NOT EXISTS `patientvital` (
  `pvtid` int(11) NOT NULL AUTO_INCREMENT,
  `patientid` int(11) NOT NULL,
  `vitalid` int(11) NOT NULL,
  `createddate` date DEFAULT NULL,
  `frequency` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pvtid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=72 ;

--
-- Dumping data for table `patientvital`
--

INSERT INTO `patientvital` (`pvtid`, `patientid`, `vitalid`, `createddate`, `frequency`, `note`) VALUES
(60, 5, 4, '2013-10-20', NULL, NULL),
(59, 5, 1, '2013-10-20', NULL, NULL),
(58, 5, 1, '2013-09-29', NULL, NULL),
(57, 5, 3, '2013-09-28', NULL, NULL),
(56, 5, 2, '2013-09-28', NULL, NULL),
(55, 5, 1, '2013-09-28', NULL, NULL),
(54, 5, 4, '2013-09-26', NULL, NULL),
(61, 5, 1, '2013-11-08', NULL, NULL),
(62, 5, 2, '2013-11-08', NULL, NULL),
(63, 5, 3, '2013-11-08', NULL, NULL),
(64, 5, 1, '2013-11-09', NULL, NULL),
(65, 5, 2, '2013-11-09', NULL, NULL),
(66, 5, 3, '2013-11-09', NULL, NULL),
(67, 5, 4, '2013-11-09', NULL, NULL),
(68, 5, 1, '2013-11-10', NULL, NULL),
(69, 5, 4, '2013-11-24', NULL, NULL),
(70, 5, 1, '2013-12-15', NULL, NULL),
(71, 5, 1, '2013-12-23', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `patientvitaldata`
--

CREATE TABLE IF NOT EXISTS `patientvitaldata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pvtid` int(11) DEFAULT NULL,
  `attributename1` varchar(500) DEFAULT NULL,
  `attrvalue1` varchar(500) DEFAULT NULL,
  `attributename2` varchar(500) DEFAULT NULL,
  `attrvalue2` varchar(500) DEFAULT NULL,
  `attributename3` varchar(500) DEFAULT NULL,
  `attrvalue3` varchar(500) DEFAULT NULL,
  `attributename4` varchar(500) DEFAULT NULL,
  `attrvalue4` varchar(500) DEFAULT NULL,
  `isdeleted` int(11) DEFAULT '0',
  `isencrypted` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=72 ;

--
-- Dumping data for table `patientvitaldata`
--

INSERT INTO `patientvitaldata` (`id`, `pvtid`, `attributename1`, `attrvalue1`, `attributename2`, `attrvalue2`, `attributename3`, `attrvalue3`, `attributename4`, `attrvalue4`, `isdeleted`, `isencrypted`) VALUES
(54, 54, '', '100', '', '', '', '', '', '', 0, 0),
(55, 55, 'HDL', '100', 'LDL', '100', 'Trigly', '100', 'HDL', '100', 0, 0),
(56, 56, 'Systolic', '100', 'Diastolic', '100', '', '', 'Systolic', '', 0, 0),
(57, 57, '', '100', '', '', '', '', '', '', 0, 0),
(58, 58, 'HDL', '100', 'LDL', '100', 'Trigly', '100', 'HDL', '100', 0, 0),
(59, 59, 'HDL', '110', 'LDL', '110', 'Trigly', '110', 'Total', '110', 0, 0),
(60, 60, '', '80', '', '', '', '', '', '', 0, 0),
(61, 61, 'HDL', '100', 'LDL', '100', 'Trigly', '100', 'HDL', '100', 0, 0),
(62, 62, 'Systolic', '100', 'Diastolic', '100', '', '', 'Systolic', '', 0, 0),
(63, 63, '', '75', '', '', '', '', '', '', 0, 0),
(64, 64, 'HDL', '100', 'LDL', '100', 'Trigly', '100', 'HDL', '100', 0, 0),
(65, 65, 'Systolic', '100', 'Diastolic', '100', '', '', 'Systolic', '', 0, 0),
(66, 66, '', '75', '', '', '', '', '', '', 0, 0),
(67, 67, '', '184', '', '', '', '', '', '', 0, 0),
(68, 68, 'HDL', '110', 'LDL', '110', 'Trigly', '110', 'Total', '110', 0, 0),
(69, 69, '', '80', '', '', '', '', '', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `physician`
--

CREATE TABLE IF NOT EXISTS `physician` (
  `phId` int(11) NOT NULL AUTO_INCREMENT,
  `education` varchar(255) NOT NULL,
  `specialtyid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `registrationId` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`phId`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=43 ;

--
-- Dumping data for table `physician`
--

INSERT INTO `physician` (`phId`, `education`, `specialtyid`, `userid`, `registrationId`) VALUES
(2, 'M.D.', 2, 5, NULL),
(3, 'M.D.', 3, 35, NULL),
(4, 'M.B.B.S.', 1, 123, NULL),
(5, 'M.D.', 4, 124, NULL),
(6, 'M.D.', 9, 125, NULL),
(7, 'M.D.', 13, 126, NULL),
(8, 'B.A.M.S.', 2, 58, NULL),
(9, 'B.H.M.S.', 5, 59, NULL),
(10, 'M.B.B.S.', 6, 60, NULL),
(11, 'M.D.', 1, 50, NULL),
(12, '', 54, 0, NULL),
(13, 'pune', 59, 0, NULL),
(14, '', 54, 171, NULL),
(15, '', 54, 172, NULL),
(16, '', 54, 173, NULL),
(17, '', 54, 174, NULL),
(18, '', 54, 175, NULL),
(19, '', 54, 176, NULL),
(20, '', 54, 177, NULL),
(21, '', 54, 178, NULL),
(22, '', 54, 179, NULL),
(23, '', 54, 180, NULL),
(24, '', 54, 181, NULL),
(25, '', 54, 182, NULL),
(26, '', 54, 183, NULL),
(27, '', 0, 184, ''),
(28, '', 0, 185, ''),
(29, '', 0, 188, '1234'),
(30, '', 0, 189, '1234'),
(31, '', 0, 190, '1234'),
(32, '', 0, 191, '1234'),
(33, '', 0, 192, '1234'),
(34, '', 0, 193, '1234'),
(35, '', 0, 194, '1234'),
(36, '', 0, 196, '1234'),
(37, '', 3, 197, '1234'),
(38, '', 2, 198, '1234asdas'),
(39, '', 0, 199, '1234asdas'),
(40, '', 2, 200, '1234asdas'),
(41, '', 2, 201, '1234asdas'),
(42, '', 2, 202, '1234asdas');

-- --------------------------------------------------------

--
-- Table structure for table `promo`
--

CREATE TABLE IF NOT EXISTS `promo` (
  `prid` int(11) NOT NULL AUTO_INCREMENT,
  `promocode` varchar(50) DEFAULT NULL,
  `ispicked` int(11) DEFAULT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`prid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `promo`
--

INSERT INTO `promo` (`prid`, `promocode`, `ispicked`, `uid`) VALUES
(1, 'Asdfgh', 1, 212),
(2, 'qwerty', 1, 211),
(3, '12345', 1, 214),
(4, '23456', 1, 215),
(5, '111111', 1, 216),
(6, '222222', NULL, 0),
(7, '333333', NULL, 0),
(8, '444444', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

CREATE TABLE IF NOT EXISTS `reminders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `reminders`
--

INSERT INTO `reminders` (`id`, `name`) VALUES
(1, '1 day before'),
(2, '2 day before'),
(3, '3 day before'),
(4, '4 day before'),
(5, '5 day before'),
(6, '6 day before'),
(7, '7 day before'),
(8, '8 day before'),
(9, '9 day before'),
(10, '10 day before');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`rid`, `name`, `description`) VALUES
(1, 'Patient', 'Patient'),
(2, 'Doctor', 'Doctor');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
  `setid` int(11) NOT NULL AUTO_INCREMENT,
  `patientid` int(11) DEFAULT NULL,
  `encryptvit` int(11) DEFAULT NULL,
  `encryptvaccn` int(11) DEFAULT NULL,
  `encryptappt` int(11) DEFAULT NULL,
  `encryptmed` int(11) DEFAULT NULL,
  `encryptexe` int(11) DEFAULT NULL,
  `encryptdoc` int(11) DEFAULT NULL,
  `encryptpath` varchar(100) DEFAULT 'empty',
  PRIMARY KEY (`setid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`setid`, `patientid`, `encryptvit`, `encryptvaccn`, `encryptappt`, `encryptmed`, `encryptexe`, `encryptdoc`, `encryptpath`) VALUES
(1, 5, 1, 1, 1, 1, 1, 1, 'dadad'),
(2, 0, 0, 0, 0, 0, 0, NULL, NULL),
(3, 0, 0, 0, 0, 0, 0, NULL, NULL),
(4, 0, 0, 0, 0, 0, 0, NULL, NULL),
(5, 104, 0, 0, 0, 0, 0, NULL, NULL),
(6, 105, 0, 0, 0, 0, 0, NULL, NULL),
(7, 106, 0, 0, 0, 0, 0, NULL, NULL),
(8, 107, 0, 0, 0, 0, 0, NULL, NULL),
(9, 108, 0, 0, 0, 0, 0, NULL, NULL),
(10, 109, 0, 0, 0, 0, 0, NULL, NULL),
(11, 110, 0, 0, 0, 0, 0, NULL, NULL),
(12, 111, 0, 0, 0, 0, 0, NULL, NULL),
(13, 112, 0, 0, 0, 0, 0, NULL, NULL),
(14, 113, 0, 0, 0, 0, 0, NULL, NULL),
(15, 114, 0, 0, 0, 0, 0, NULL, NULL),
(16, 1, 1, 0, 0, 0, 0, 0, ''),
(17, 124, 1, 1, 1, 1, 1, 1, ''),
(18, 115, 0, 0, 0, 0, 0, NULL, 'empty'),
(19, 116, 0, 0, 0, 0, 0, NULL, 'empty'),
(20, 117, 0, 0, 0, 0, 0, NULL, 'empty'),
(21, 118, 0, 0, 0, 0, 0, NULL, 'empty');

-- --------------------------------------------------------

--
-- Table structure for table `sharedfiles`
--

CREATE TABLE IF NOT EXISTS `sharedfiles` (
  `sharedid` int(11) NOT NULL AUTO_INCREMENT,
  `fid` int(11) DEFAULT NULL,
  `shareduid` int(11) DEFAULT NULL,
  `isaccepted` int(11) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`sharedid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=48 ;

--
-- Dumping data for table `sharedfiles`
--


-- --------------------------------------------------------

--
-- Table structure for table `specialty`
--

CREATE TABLE IF NOT EXISTS `specialty` (
  `spId` int(11) NOT NULL AUTO_INCREMENT,
  `spname` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`spId`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=60 ;

--
-- Dumping data for table `specialty`
--

INSERT INTO `specialty` (`spId`, `spname`, `color`) VALUES
(1, 'Endocrinologist', '#A9D0F5'),
(2, 'Anesthesiologist', '#FFBF00'),
(3, 'Oncologist', '#F4E4E4'),
(4, 'Cardiologist', '#0CED39'),
(5, 'Podiatrists?', '#EE79A2'),
(6, 'Toxicologist?', '#FF00FF'),
(7, 'Leprologist?', '#B40486'),
(8, 'Parasitologist', '#B40431'),
(9, 'Dentist', '#F7819F'),
(10, 'Dermatologist', '#F6CEEC'),
(11, 'Dialectology', '#DA81F5'),
(12, 'Dietitian', '#01DF3A'),
(13, 'ENT', '#088A4B'),
(14, 'Gastroenterologist', '#2E2EFE'),
(15, 'General Medicine', '#A9F5F2'),
(16, 'Surgeon', '#FE2E64'),
(17, 'Obstetrician', '#38610B'),
(18, 'Endocrinologist', '#F3F781'),
(19, 'Homeopathy', '#CA68CC'),
(20, 'Hematologist', '#A834CE'),
(21, 'Nephrologist', '#9CA4BC'),
(22, 'Neurologist', '#053671'),
(23, 'Neurosurgeon', '#145464'),
(24, 'Obstetrician', '#1BDDA6'),
(25, 'Gynaecologist', '#D0F8ED'),
(26, 'Ophthalmologist', '#9EDF8A'),
(27, 'Orthopedist', '#6BFB05'),
(28, 'Pediatrician', '#ADFB05'),
(29, 'Physiotherapist', '#CEFB05'),
(30, 'Psychiatrist', '#FBE205'),
(31, 'Psychologist', '#FB9D05'),
(32, 'Radiologist', '#FB5B05'),
(33, 'Urologist', '#C68B85'),
(34, 'sdfsd', NULL),
(35, 'sdfsd', NULL),
(36, 'sdfsd', NULL),
(37, 'sdfsd', NULL),
(38, 'sdfsd', NULL),
(39, 'sdfsd', NULL),
(40, 'sdfsd', NULL),
(41, 'sdfsd', NULL),
(42, 'Amit nath', NULL),
(43, 'Cancer', NULL),
(44, 'Test', NULL),
(45, 'Test', NULL),
(46, 'Test', NULL),
(47, 'Test', NULL),
(48, 'Test', NULL),
(49, 'Test', NULL),
(50, 'Test', NULL),
(51, 'Test', NULL),
(52, 'Test', NULL),
(53, 'Weewfwe', NULL),
(54, '', NULL),
(55, 'RWzvhnlfQ4zQm59iUbQTC8JVljpCz2dJMqPER0CZ2AwtgUCMsHyGh8Le76fgi5P78WW+M+xZjCf+Rgmxl9K9pNJPz3k11TZP8yZQUD33KREAyUHrS6gPq3tY1GNR+V1m8A/pKIp/WFe0A4Nq6y9CXCAZqIH7H4YvlNw9KfTczMo=', NULL),
(56, 'NuX69yEY4pTy42QOXtnTXsFzNGPx3K2WSSKv/JuPaXnvQQI98osOGEueHHR2At6bVSPkGVO6QjLejnw4KB0PktP00fU1Qd/4MgBRh6QxxZlXFZ4EE5m/hSPKfQasDUiGf+z4MyxZaTJLur9p6w5K0ba1skb/ic+xdhz1ZfHUNs8=', NULL),
(57, 'FXN7YATb/P4zgQrfMlU2Xf6zN/Lg2+csICmAm1Fpfwq1A25S0XDQHYpE0Lt2RL0ABf50vBOCtVRLawyiMa/5A7MBgRLOnpnqAi9ok9vdxZNfeU8BHK+pww6kSerXf/Rcq0F3yAJQaI94R/qM2Eu92DfSJjWtC1Sf+3FBw8lK6LE=', NULL),
(58, 'OSzet/jBYxPcoRxPJ16zOnB3KposKEiGhd6fj0mkOuRJ/LYp8Ov2YFs3TaT3h0TAooEYDc8ZKoF9avVul4QCvAmIipC1YW8or1ZQjfjYjcRXPsw+JV/x6xMUccMVu5ImHhsbmMGQG3wx1OIS/svas/2yyGtCzwR3UhF72gqyXjY=', NULL),
(59, 'pune', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE IF NOT EXISTS `state` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `countryid` int(11) NOT NULL,
  `code` varchar(200) DEFAULT NULL,
  `statename` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10059 ;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`sid`, `countryid`, `code`, `statename`) VALUES
(1, 1, 'AL', ''),
(2, 1, 'AK', 'Alaska'),
(3, 1, 'AZ', 'Arizona'),
(4, 1, 'AR', 'Arkansas'),
(5, 1, 'CA', 'California'),
(6, 1, 'CO', 'Colorado'),
(7, 1, 'CT', 'Connecticut'),
(8, 1, 'DE', 'Delaware'),
(9, 1, 'DC', 'District of Columbia'),
(10, 1, 'FL', 'Florida'),
(11, 1, 'GA', 'Georgia'),
(12, 1, 'HI', 'Hawaii'),
(13, 1, 'ID', 'Idaho'),
(14, 1, 'IL', 'Illinois'),
(15, 1, 'IN', 'Indiana'),
(16, 1, 'IA', 'Iowa'),
(17, 1, 'KS', 'Kansas'),
(18, 1, 'KY', 'Kentucky'),
(19, 1, 'LA', 'Louisiana'),
(20, 1, 'ME', 'Maine'),
(21, 1, 'MD', 'Maryland'),
(22, 1, 'MA', 'Massachusetts'),
(23, 1, 'MI', 'Michigan'),
(24, 1, 'MN', 'Minnesota'),
(25, 1, 'MS', 'Mississippi'),
(26, 1, 'MO', 'Missouri'),
(27, 1, 'MT', 'Montana'),
(28, 1, 'NE', 'Nebraska'),
(29, 1, 'NV', 'Nevada'),
(30, 1, 'NH', 'New Hampshire'),
(31, 1, 'NJ', 'New Jersey'),
(32, 1, 'NM', 'New Mexico'),
(33, 1, 'NY', 'New York'),
(34, 1, 'NC', 'North Carolina'),
(35, 1, 'ND', 'North Dakota'),
(36, 1, 'OH', 'Ohio'),
(37, 1, 'OK', 'Oklahoma'),
(38, 1, 'OR', 'Oregon'),
(39, 1, 'PA', 'Pennsylvania'),
(40, 1, 'RI', 'Rhode Island'),
(41, 1, 'SC', 'South Carolina'),
(42, 1, 'SD', 'South Dakota'),
(43, 1, 'TN', 'Tennessee'),
(44, 1, 'TX', 'Texas'),
(45, 1, 'UT', 'Utah'),
(46, 1, 'VT', 'Vermont'),
(47, 1, 'VA', 'Virginia'),
(48, 1, 'WA', 'Washington'),
(49, 1, 'WV', 'West Virginia'),
(50, 1, 'WI', 'Wisconsin'),
(51, 1, 'WY', 'Wyoming'),
(9999, 1, 'NA', 'Not Applicable'),
(10000, 0, '', 'maharastra'),
(10001, 0, '', 'maharastra'),
(10002, 0, '', 'maharastra'),
(10003, 0, '', 'maharastra'),
(10004, 0, '', 'maharastra'),
(10005, 0, '', 'maharastra'),
(10006, 0, '', 'maharastra'),
(10007, 0, '', 'maharastra'),
(10008, 0, '', 'maharastra'),
(10009, 0, '', 'maharastra'),
(10010, 0, '', 'maharastra'),
(10011, 0, '', 'maharastra'),
(10012, 0, '', 'maharastra'),
(10013, 0, '', 'maharastra'),
(10014, 0, '', 'maharastra'),
(10015, 0, '', 'maharastra'),
(10016, 0, '', 'maharastra'),
(10017, 0, '', 'maharastra'),
(10018, 0, '', 'maharastra'),
(10019, 0, '', 'maharastra'),
(10020, 0, '', 'maharastra'),
(10021, 0, '', 'maharastra'),
(10022, 0, '', 'maharastra'),
(10023, 0, '', 'maharastra'),
(10024, 0, '', 'maharastra'),
(10025, 0, '', 'Maharastra'),
(10026, 0, '', 'Maharastra'),
(10027, 0, '', 'Maharastra'),
(10028, 0, '', 'Maharastra'),
(10029, 0, '', 'Maharastra'),
(10030, 0, '', 'Maharastra'),
(10031, 0, '', 'Maharastra'),
(10032, 0, '', 'Maharastra'),
(10033, 0, '', 'Maharastra'),
(10034, 0, '', 'Maharastra'),
(10035, 0, '', 'Maharastra'),
(10036, 0, '', 'Maharastra'),
(10037, 0, '', 'Maharastra'),
(10038, 0, '', 'Maharastra'),
(10039, 0, '', 'Maharastra'),
(10040, 0, '', 'Maharastra'),
(10041, 0, '', 'Maharastra'),
(10042, 0, '', 'Maharastra'),
(10043, 0, '', 'Maharastra'),
(10044, 0, '', 'Maharastra'),
(10045, 0, '', 'Maharastra'),
(10046, 0, '', 'Maharastra'),
(10047, 0, '', 'Maharastra'),
(10048, 0, '', 'Maharastra'),
(10049, 0, '', 'Maharastra'),
(10050, 0, '', 'Maharastra'),
(10051, 0, '', 'Maharastra'),
(10052, 0, '', 'Maharastra'),
(10053, 0, '', 'Maharastra'),
(10054, 0, '', 'Maharastra'),
(10055, 0, '', 'Maharastra'),
(10056, 0, '', 'Maharastra'),
(10057, 0, '', 'Maharastra'),
(10058, 0, '', 'Maharastra');

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE IF NOT EXISTS `token` (
  `authid` int(11) NOT NULL AUTO_INCREMENT,
  `roleid` int(11) NOT NULL,
  `authkey` varchar(100) NOT NULL,
  `generationtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`authid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `token`
--


-- --------------------------------------------------------

--
-- Table structure for table `tweet`
--

CREATE TABLE IF NOT EXISTS `tweet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tweet` varchar(1000) DEFAULT NULL,
  `patientid` int(11) DEFAULT NULL,
  `isencrypted` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `tweet`
--

INSERT INTO `tweet` (`id`, `tweet`, `patientid`, `isencrypted`) VALUES
(1, 'This is a sample tweet text for patient lifestyle data', 5, 0),
(2, 'This is a sample tweet  data This is a sample tweet data This is a sample tweet text for patient lifestyle data', 5, 0),
(3, 'asdas', 5, 0),
(4, 'tweet', 5, 0),
(5, 'tweet', 5, 1),
(6, '', 0, 0),
(7, 'fadadasda', 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `roleid` int(11) NOT NULL,
  `firstname` varchar(512) NOT NULL,
  `lastname` varchar(512) NOT NULL,
  `gender` varchar(512) DEFAULT NULL,
  `dateofbirth` date DEFAULT NULL,
  `address1` varchar(1000) NOT NULL,
  `address2` varchar(1000) DEFAULT NULL,
  `city` varchar(512) NOT NULL,
  `stateid` varchar(512) NOT NULL,
  `countryid` int(11) NOT NULL,
  `zipcode` varchar(512) NOT NULL,
  `phone` varchar(512) NOT NULL,
  `email` varchar(512) DEFAULT NULL,
  `alternateemail` varchar(512) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `isdeleted` tinyint(1) NOT NULL DEFAULT '0',
  `disease` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=217 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `roleid`, `firstname`, `lastname`, `gender`, `dateofbirth`, `address1`, `address2`, `city`, `stateid`, `countryid`, `zipcode`, `phone`, `email`, `alternateemail`, `status`, `isdeleted`, `disease`) VALUES
(5, 1, 'amit', 'bhosle', 'M', '1988-12-04', 'Kalyani nagar1', '', 'Pune', '1', 1, '411014', '2147483647', 'amitb@gmail.com', 'amitb@gmail.com', 4, 0, 'Kidney stone'),
(35, 1, 'Anand', 'Pandey', 'F', '1979-01-23', 'Koregaon Park', '', 'Pune', '1', 1, '411001', '2147483647', 'anand@gmail.com', 'anand@gmail.com', 2, 0, NULL),
(123, 2, 'Gopal', 'Sharma', 'F', '1978-01-23', 'Koregaon Park', '', 'Pune', '1', 1, '411001', '2147483647', 'gsharma@gmail.com', 'gsharma@gmail.com', 2, 0, NULL),
(124, 2, 'Satish', 'Agarwal', 'M', '1970-05-01', 'Koregaon Park', '', 'Pune', '1', 1, '80244', '2147483647', 'satisha@gmail.com', 'satisha@gmail.com', 2, 0, NULL),
(125, 2, 'Leela', 'Bose', 'F', '1968-01-23', 'Kalyani Nagar', '', 'Pune', '1', 1, '411014', '2147483647', 'leelab@gmail.com', 'leelab@gmail.com', 2, 0, NULL),
(126, 2, 'Anwar', 'Seikh', 'F', '1979-01-23', 'Kalyani nagar', '', 'Pune', '1', 1, '411014', '2147483647', 'aseikh@yahoo.com', 'aseikh@yahoo.com', 2, 0, NULL),
(182, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10024', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(181, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10023', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(180, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10022', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(179, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10021', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(178, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10020', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(177, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10019', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(175, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10017', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(176, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10018', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(174, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10016', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(172, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10014', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(173, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10015', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(170, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10012', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(171, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10013', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(168, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10010', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(169, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10011', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(167, 1, 'test', 'test', 'M', '0000-00-00', '', '', 'pune', '10009', 0, '234567', '123456', 'dhimtrii@gmail.com', NULL, 1, 0, NULL),
(188, 2, 'akhilesh12', 'Lakshmi', 'M', '0000-00-00', '', '', 'Pune', '10030', 0, '234567', '12345', 'asdf121@gmail.com', NULL, 1, 0, NULL),
(187, 1, 'akhilesh', 'Lakshmi', 'M', '0000-00-00', '', '', 'Pune', '10029', 0, '234567', '12345', 'asdf@gmail.com', NULL, 1, 0, NULL),
(189, 2, 'akhileshiiii', 'Lakshmi', 'M', '0000-00-00', '', '', 'Pune', '10031', 0, '234567', '12345', 'asdfjgjh@gmail.com', NULL, 1, 0, NULL),
(190, 2, 'akhileshiiii', 'Lakshmiooo', 'M', '0000-00-00', '', '', 'Pune', '10032', 0, '234567', '12345', 'asdfjgasjh@gmail.com', NULL, 1, 0, NULL),
(191, 2, 'akhileshiiii', 'Lakshmiooo', 'M', '0000-00-00', '', '', 'Pune', '10033', 0, '234567', '12345', 'tesasat@gmail.com', NULL, 1, 0, NULL),
(192, 2, 'akhileshiiii', 'Lakshmiooo', 'M', '0000-00-00', '', '', 'Pune', '10034', 0, '234567', '12345', 'tesasasat@gmail.com', NULL, 1, 0, NULL),
(193, 2, 'akhileshiiii', 'Lakshmiooo', 'M', '0000-00-00', '', '', 'Pune', '10035', 0, '234567', '12345', 'tesat@gmail.com', NULL, 1, 0, NULL),
(194, 2, 'akhileshiiii', 'Lakshmiooo', 'M', '0000-00-00', '', '', 'Pune', '10036', 0, '234567', '12345', 'tesatwqex@gmail.com', NULL, 1, 0, NULL),
(195, 2, 'akhileshiiii', 'Lakshmiooo', 'M', '0000-00-00', '', '', 'Pune', '10037', 0, '234567', '12345', 'tesawqstwqex@gmail.com', NULL, 1, 0, NULL),
(196, 2, 'akhileshiiii', 'Lakshmiooo', 'M', '0000-00-00', '', '', 'Pune', '10038', 0, '234567', '12345', 'sdtest@gmail.com', NULL, 1, 0, NULL),
(197, 2, 'akhileshiiii', 'Lakshmiooo', 'M', '0000-00-00', '', '', 'Pune', '10039', 0, '234567', '12345', 'sdtasdest@gmail.com', NULL, 1, 0, NULL),
(198, 2, 'asdfrew', 'lkjhg', 'M', '0000-00-00', '', '', 'Pune', '10040', 0, '234567', '12345', 'mine@gmail.com', NULL, 1, 0, NULL),
(199, 2, 'asdfrew', 'lkjhg', 'M', '0000-00-00', '', '', 'Pune', '10041', 0, '234567', '12345', 'mine12@gmail.com', NULL, 1, 0, NULL),
(200, 2, 'asdfrew', 'lkjhg', 'M', '0000-00-00', '', '', 'Pune', '10042', 0, '234567', '12345', 'mineas12@gmail.com', NULL, 1, 0, NULL),
(201, 2, 'asdfrew', 'lkjhg', 'M', '0000-00-00', '', '', 'Pune', '10043', 0, '234567', '12345', 'mineads12@gmail.com', NULL, 1, 0, NULL),
(202, 2, 'asdfrew', 'lkjhg', 'M', '0000-00-00', '', '', 'Pune', '10044', 0, '234567', '12345', 'user@gmail.com', NULL, 1, 0, NULL),
(203, 1, 'asdfrew', 'lkjhg', 'M', '0000-00-00', '', '', 'Pune', '10045', 0, '234567', '12345', 'use12r@gmail.com', NULL, 1, 0, NULL),
(204, 1, 'asdfrew', 'lkjhg', 'M', '0000-00-00', '', '', 'Pune', '10046', 0, '234567', '12345', 'use12asdr@gmail.com', NULL, 1, 0, NULL),
(205, 1, 'akhilesh', 'Lakshmi', 'M', '2013-12-07', '', '', 'Pune', '10047', 0, '234567', '12345', 'asasddf@gmail.com', NULL, 1, 0, NULL),
(206, 1, 'akhilesh', 'Lakshmi', 'M', '2013-12-07', '', '', 'Pune', '10048', 0, '234567', '12345', 'sddf@gmail.com', NULL, 1, 0, NULL),
(207, 1, 'akhilesh', 'Lakshmi', 'M', '2013-12-07', '', '', 'Pune', '10049', 0, '234567', '12345', 'sddfas@gmail.com', NULL, 1, 0, NULL),
(208, 1, 'akhilesh', 'Lakshmi', 'M', '2013-12-07', '', '', 'Pune', '10050', 0, '234567', '12345', 'sddfaasds@gmail.com', NULL, 1, 0, NULL),
(209, 1, 'akhilesh', 'Lakshmi', 'M', '2013-12-07', '', '', 'Pune', '10051', 0, '234567', '12345', 'aasds@gmail.com', NULL, 1, 0, NULL),
(210, 1, 'akhilesh', 'Lakshmi', 'M', '2013-12-07', '', '', 'Pune', '10052', 0, '234567', '12345', 'aassdsds@gmail.com', NULL, 1, 0, NULL),
(211, 1, 'akhilesh', 'Lakshmi', 'M', '2013-12-07', '', '', 'Pune', '10053', 0, '234567', '12345', 'asdsdf@gmail.com', NULL, 1, 0, NULL),
(212, 1, 'akhilesh', 'Lakshmi', 'M', '2013-12-07', '', '', 'Pune', '10054', 0, '234567', '12345', 'aassdf@gmail.com', NULL, 1, 0, NULL),
(213, 1, 'akhilesh', 'Lakshmi', 'M', '2013-12-07', '', '', 'Pune', '10055', 0, '234567', '12345', 'a@a.com', NULL, 1, 0, NULL),
(214, 1, 'akhilesh', 'Lakshmi', 'M', '2013-12-07', '', '', 'Pune', '10056', 0, '234567', '12345', 'as@asd.com', NULL, 1, 0, NULL),
(215, 1, 'akhilesh', 'Lakshmi', 'M', '2013-12-07', '', '', 'Pune', '10057', 0, '234567', '12345', 'asasdf@gmail.com', NULL, 1, 0, NULL),
(216, 1, 'akhilesh', 'Lakshmi', 'M', '2013-12-07', '', '', 'Pune', '10058', 0, '234567', '12345', 'as76df@gmail.com', NULL, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vaccination`
--

CREATE TABLE IF NOT EXISTS `vaccination` (
  `vid` int(11) NOT NULL AUTO_INCREMENT,
  `vaccnName` varchar(512) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `isChild` int(11) DEFAULT '0',
  `month` int(11) DEFAULT NULL,
  PRIMARY KEY (`vid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=41 ;

--
-- Dumping data for table `vaccination`
--

INSERT INTO `vaccination` (`vid`, `vaccnName`, `description`, `isChild`, `month`) VALUES
(8, 'BCG', 'Oral Polio Vaccine ', 1, 3),
(9, 'DPT', 'Oral polio vaccine', 1, 7),
(10, 'Polio', 'Oral polio vaccine', 1, 9),
(11, 'Measles', 'Measles vaccine', 1, 15),
(12, 'DPT booster', 'Oral polio vaccine', 1, 36),
(13, 'DPT', 'Oral polio vaccine', 1, 100),
(14, 'Tetanus toxoid', 'Tetanus toxoid', 1, 130),
(40, 'asdasa', 'asdasdas', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vital`
--

CREATE TABLE IF NOT EXISTS `vital` (
  `vid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) DEFAULT NULL,
  `noofvalues` smallint(6) NOT NULL,
  PRIMARY KEY (`vid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `vital`
--

INSERT INTO `vital` (`vid`, `name`, `noofvalues`) VALUES
(1, 'Cholesterol', 4),
(2, 'Blood Pressure', 3),
(3, 'Weight', 1),
(4, 'Height', 2),
(5, 'Sugar', 2),
(6, 'Heart Rate', 2),
(7, 'Respiration', 2),
(8, 'Temperature', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vitalattributes`
--

CREATE TABLE IF NOT EXISTS `vitalattributes` (
  `vitalid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `normal` varchar(512) DEFAULT NULL,
  `alert` varchar(512) DEFAULT NULL,
  `highalert` varchar(512) DEFAULT NULL,
  `displayorder` smallint(6) NOT NULL,
  PRIMARY KEY (`vitalid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `vitalattributes`
--

INSERT INTO `vitalattributes` (`vitalid`, `name`, `normal`, `alert`, `highalert`, `displayorder`) VALUES
(1, 'HDL', '40-60', '40', '60', 1),
(8, 'Temperature', '95', '102', '105', 0),
(3, 'Weight', '75', '80', '85', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vitalRange`
--

CREATE TABLE IF NOT EXISTS `vitalRange` (
  `vrid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  `vitalSubid` int(11) DEFAULT NULL,
  `lowRange` int(11) DEFAULT NULL,
  `highRange` int(11) DEFAULT NULL,
  PRIMARY KEY (`vrid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `vitalRange`
--

INSERT INTO `vitalRange` (`vrid`, `uid`, `vid`, `vitalSubid`, `lowRange`, `highRange`) VALUES
(1, 5, 1, 1, 80, 120),
(2, 5, 1, 2, 80, 120),
(3, 5, 1, 3, 80, 120),
(4, 5, 1, 4, 80, 120),
(5, 5, 2, 1, 90, 110),
(6, 5, 2, 2, 90, 110),
(7, 5, 3, 1, 170, 200),
(8, 5, 4, 1, 50, 80);
