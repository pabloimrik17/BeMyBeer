-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.1.19-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla bemybeer.beer
CREATE TABLE IF NOT EXISTS `beer` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT '',
  `IdCategory` int(11) DEFAULT '1',
  `Graduation` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`Id`),
  KEY `Category` (`IdCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla bemybeer.beer: ~10 rows (aproximadamente)
DELETE FROM `beer`;
/*!40000 ALTER TABLE `beer` DISABLE KEYS */;
INSERT INTO `beer` (`Id`, `Name`, `IdCategory`, `Graduation`) VALUES
	(1, 'Guinness', 4, 8.50),
	(2, 'Guinness', 4, 8.50),
	(3, 'Guinness', 4, 8.50),
	(4, 'Guinness', 4, 8.50),
	(5, 'Guinness', 4, 8.50),
	(6, 'Guinness', 4, 8.50),
	(7, 'Guinness', 4, 8.50),
	(8, 'Guinness', 4, 8.50),
	(9, 'Guinness', 4, 8.50),
	(10, 'Guinness', 4, 8.50);
/*!40000 ALTER TABLE `beer` ENABLE KEYS */;


-- Volcando estructura para tabla bemybeer.category
CREATE TABLE IF NOT EXISTS `category` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL DEFAULT '',
  `idParent` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `idParent` (`idParent`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla bemybeer.category: ~6 rows (aproximadamente)
DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`Id`, `Name`, `idParent`) VALUES
	(1, 'Root', 0),
	(2, 'Lager', 1),
	(3, 'Pilsner', 1),
	(4, 'Stout', 1),
	(5, 'IPA', 1),
	(6, 'Ale', 1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;


-- Volcando estructura para tabla bemybeer.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla bemybeer.user: ~0 rows (aproximadamente)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
