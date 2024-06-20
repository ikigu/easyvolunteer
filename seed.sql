-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: easy_volunteer_dev_db
-- ------------------------------------------------------
-- Server version	8.3.0
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!50503 SET NAMES utf8mb4 */
;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;

/*!40103 SET TIME_ZONE='+00:00' */
;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `_prisma_migrations`
--
DROP TABLE IF EXISTS `_prisma_migrations`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `_prisma_migrations`
--
LOCK TABLES `_prisma_migrations` WRITE;

/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */
;

INSERT INTO
  `_prisma_migrations`
VALUES
  (
    '18bc97f5-63c4-4740-8646-11f7b40a2a87',
    'c40967ae8bc462468e2612c673fdde9b4f8da6354d2ff995c5ee6f288a2c9b6e',
    '2024-06-18 11:58:08.640',
    '20240618115808_init',
    NULL,
    NULL,
    '2024-06-18 11:58:08.617',
    1
  ),
(
    '498feba6-ce7f-4895-bfa1-ee5651a36c92',
    '8501857fcbe004c4d8881d0309a58e66b05abaef0d9955e71d48c9d7295e127b',
    '2024-06-17 19:16:37.293',
    '20240617191637_init',
    NULL,
    NULL,
    '2024-06-17 19:16:37.189',
    1
  ),
(
    'a870fc2e-43d0-4c02-bf7b-01ee724fa9a0',
    '9274ffc6d89505d886a457c8ad72c65478891351dd446e5905d2ab0230b26fa8',
    '2024-06-17 19:53:05.603',
    '20240617195305_init',
    NULL,
    NULL,
    '2024-06-17 19:53:05.593',
    1
  );

/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `Event`
--
DROP TABLE IF EXISTS `Event`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `Event` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `creatorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `organizationId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startTime` datetime(3) NOT NULL,
  `endTime` datetime(3) NOT NULL,
  `cost` int NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Event_creatorId_fkey` (`creatorId`),
  KEY `Event_organizationId_fkey` (`organizationId`),
  CONSTRAINT `Event_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Event_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `Event`
--
LOCK TABLES `Event` WRITE;

/*!40000 ALTER TABLE `Event` DISABLE KEYS */
;

INSERT INTO
  `Event`
VALUES
  (
    '',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '4b679c56-207c-49fd-a246-617cf3c7740e',
    '8b1eb7b3-0bb8-40d6-9f03-58dde5b7eb84',
    'Tree Planting',
    '2024-06-18 11:04:29.656',
    '2024-06-18 11:04:29.656',
    8493,
    NULL
  ),
(
    '01af7706-c554-428f-9db3-e11708df7438',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '699e9241-1264-41a5-a297-e70c1c0711da',
    'cd4aafc5-ffcd-4e0d-ad81-8e15dd606450',
    'Orphans Showcase',
    '2024-06-18 11:04:29.656',
    '2024-06-18 11:04:29.656',
    7890,
    NULL
  ),
(
    '2c2f462b-81ab-498b-91c2-22132aeb4a14',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '699e9241-1264-41a5-a297-e70c1c0711da',
    'cd4aafc5-ffcd-4e0d-ad81-8e15dd606450',
    'Tree Planting',
    '2024-06-18 11:04:29.656',
    '2024-06-18 11:04:29.656',
    9494,
    NULL
  ),
(
    '51820a22-f016-467d-9ba4-babf37125e85',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '699e9241-1264-41a5-a297-e70c1c0711da',
    'cd4aafc5-ffcd-4e0d-ad81-8e15dd606450',
    'Conservation Talk',
    '2024-06-18 11:04:29.656',
    '2024-06-18 11:04:29.656',
    48488,
    NULL
  ),
(
    '5e14e5f8-8a3d-458b-aa29-deba8ce8cc0c',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '035571b2-1d1d-433f-9ee5-09977cd4111a',
    'e98a5900-a675-4f6d-b992-b279a7dab938',
    'Man Enough Camp',
    '2024-06-18 11:04:29.656',
    '2024-06-18 11:04:29.656',
    12000,
    NULL
  ),
(
    '669fe24d-dd21-4b58-bd4e-02e92d972fe7',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '4b679c56-207c-49fd-a246-617cf3c7740e',
    '8b1eb7b3-0bb8-40d6-9f03-58dde5b7eb84',
    'Feed the Children',
    '2024-06-18 11:04:29.656',
    '2024-06-18 11:04:29.656',
    74982,
    NULL
  ),
(
    '82fa2f19-bdc6-44a3-8941-69f1c167ea41',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '699e9241-1264-41a5-a297-e70c1c0711da',
    'cd4aafc5-ffcd-4e0d-ad81-8e15dd606450',
    'Remembering Daphne',
    '2024-06-18 11:04:29.656',
    '2024-06-18 11:04:29.656',
    4455,
    NULL
  ),
(
    '837139f1-4a86-4281-8426-a013564fd7f6',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '4b679c56-207c-49fd-a246-617cf3c7740e',
    '8b1eb7b3-0bb8-40d6-9f03-58dde5b7eb84',
    'Soup Kitchen',
    '2024-06-18 11:04:29.656',
    '2024-06-18 11:04:29.656',
    333,
    NULL
  ),
(
    '9735c5ed-2af6-42c4-9d05-76b6c013efad',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '035571b2-1d1d-433f-9ee5-09977cd4111a',
    'e98a5900-a675-4f6d-b992-b279a7dab938',
    'Divorce Care Season 3',
    '2024-08-07 21:00:00.000',
    '2024-10-28 21:00:00.000',
    4455,
    NULL
  ),
(
    'abd40c58-fbda-4c3a-b1d5-ae8ed55a55f4',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '4b679c56-207c-49fd-a246-617cf3c7740e',
    '8b1eb7b3-0bb8-40d6-9f03-58dde5b7eb84',
    'Soup Kitchen',
    '2024-06-18 11:04:29.656',
    '2024-06-18 11:04:29.656',
    859430,
    NULL
  ),
(
    'bd18577c-158d-41f3-99de-34b76d8e108e',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '4b679c56-207c-49fd-a246-617cf3c7740e',
    '8b1eb7b3-0bb8-40d6-9f03-58dde5b7eb84',
    'Pad Drive',
    '2024-07-27 21:00:00.000',
    '2024-07-28 21:00:00.000',
    3330,
    NULL
  ),
(
    'c17b9723-4acd-471d-a806-ab1830681cad',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '035571b2-1d1d-433f-9ee5-09977cd4111a',
    'e98a5900-a675-4f6d-b992-b279a7dab938',
    'Membership Class',
    '2024-05-11 21:00:00.000',
    '2021-10-18 21:00:00.000',
    0,
    NULL
  ),
(
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '035571b2-1d1d-433f-9ee5-09977cd4111a',
    'e98a5900-a675-4f6d-b992-b279a7dab938',
    'Quest Adventure Camp',
    '2024-06-18 11:04:29.656',
    '2024-06-18 11:04:29.656',
    5000,
    NULL
  ),
(
    'e263e08b-3734-4b90-815b-74b4d8477081',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '699e9241-1264-41a5-a297-e70c1c0711da',
    'cd4aafc5-ffcd-4e0d-ad81-8e15dd606450',
    'Building Bowsers',
    '2024-06-18 11:04:29.656',
    '2024-06-18 11:04:29.656',
    94944,
    NULL
  ),
(
    'ee3cecd4-b812-42d2-9c00-f31db8122284',
    '2024-06-18 11:04:29.729',
    '2024-06-18 11:04:29.729',
    '035571b2-1d1d-433f-9ee5-09977cd4111a',
    'e98a5900-a675-4f6d-b992-b279a7dab938',
    'New Believer Class',
    '2024-06-18 11:04:29.656',
    '2024-06-18 11:04:29.656',
    555,
    NULL
  );

/*!40000 ALTER TABLE `Event` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `EventAttendee`
--
DROP TABLE IF EXISTS `EventAttendee`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `EventAttendee` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eventId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `participantRoleId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `volunteerRoleId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `EventAttendee_userId_fkey` (`userId`),
  KEY `EventAttendee_eventId_fkey` (`eventId`),
  KEY `EventAttendee_participantRoleId_fkey` (`participantRoleId`),
  KEY `EventAttendee_volunteerRoleId_fkey` (`volunteerRoleId`),
  CONSTRAINT `EventAttendee_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `EventAttendee_participantRoleId_fkey` FOREIGN KEY (`participantRoleId`) REFERENCES `ParticipantRole` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `EventAttendee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `EventAttendee_volunteerRoleId_fkey` FOREIGN KEY (`volunteerRoleId`) REFERENCES `VolunteerRole` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `EventAttendee`
--
LOCK TABLES `EventAttendee` WRITE;

/*!40000 ALTER TABLE `EventAttendee` DISABLE KEYS */
;

INSERT INTO
  `EventAttendee`
VALUES
  (
    '0910d6aa-19d7-4775-ad39-99dbe44666c4',
    '2024-06-18 11:04:29.734',
    '2024-06-18 11:04:29.734',
    'a990b081-76ec-4b7f-9e7f-09ef3947acc8',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    NULL,
    '47f58e42-3fa7-4471-b8d0-ec5e20ccad9c'
  ),
(
    '1446be17-effb-4a86-b875-e556c7b8f21b',
    '2024-06-18 11:04:29.734',
    '2024-06-18 11:04:29.734',
    '3259287c-cafb-4efa-9acd-2b4005fc066b',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    NULL,
    '47f58e42-3fa7-4471-b8d0-ec5e20ccad9c'
  ),
(
    '3aae08af-05f6-41b7-a3bc-0d46a454f99d',
    '2024-06-18 11:04:29.734',
    '2024-06-18 11:04:29.734',
    '2bb929c2-6beb-4659-9977-14e706c41afb',
    '5e14e5f8-8a3d-458b-aa29-deba8ce8cc0c',
    NULL,
    '59c8e005-14dd-4d87-8b3d-91e2317413c4'
  ),
(
    '6ae9de01-8ce6-46b4-b95f-505d63ba2401',
    '2024-06-18 11:04:29.734',
    '2024-06-18 11:04:29.734',
    '3259287c-cafb-4efa-9acd-2b4005fc066b',
    'bd18577c-158d-41f3-99de-34b76d8e108e',
    '6059a8b6-cf63-482b-b68e-50586f8d361e',
    NULL
  ),
(
    'a37e2586-dc7a-4d3b-9588-c204efc01718',
    '2024-06-18 11:04:29.734',
    '2024-06-18 11:04:29.734',
    '035571b2-1d1d-433f-9ee5-09977cd4111a',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    NULL,
    '47f58e42-3fa7-4471-b8d0-ec5e20ccad9c'
  ),
(
    'af2f1754-3bdb-47dd-8def-d7a2c7026b23',
    '2024-06-18 11:04:29.734',
    '2024-06-18 11:04:29.734',
    '4b679c56-207c-49fd-a246-617cf3c7740e',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    NULL,
    '47f58e42-3fa7-4471-b8d0-ec5e20ccad9c'
  );

/*!40000 ALTER TABLE `EventAttendee` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `Organization`
--
DROP TABLE IF EXISTS `Organization`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `Organization` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `town` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `industry` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Organization_userId_fkey` (`userId`),
  CONSTRAINT `Organization_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `Organization`
--
LOCK TABLES `Organization` WRITE;

/*!40000 ALTER TABLE `Organization` DISABLE KEYS */
;

INSERT INTO
  `Organization`
VALUES
  (
    '8b1eb7b3-0bb8-40d6-9f03-58dde5b7eb84',
    '2024-06-18 11:04:29.728',
    '2024-06-18 11:04:29.728',
    'ActionAid Internation Kenya',
    'Nairobi',
    'Gender Equality',
    '4b679c56-207c-49fd-a246-617cf3c7740e'
  ),
(
    'cd4aafc5-ffcd-4e0d-ad81-8e15dd606450',
    '2024-06-18 11:04:29.728',
    '2024-06-18 11:04:29.728',
    'Sheldrick Wildlife Trust',
    'Nairobi',
    'Conservation',
    '699e9241-1264-41a5-a297-e70c1c0711da'
  ),
(
    'e98a5900-a675-4f6d-b992-b279a7dab938',
    '2024-06-18 11:04:29.728',
    '2024-06-18 11:04:29.728',
    'Nairobi Chapel Ngong Road',
    'Jamhuri',
    'Religious',
    '035571b2-1d1d-433f-9ee5-09977cd4111a'
  );

/*!40000 ALTER TABLE `Organization` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `ParticipantRole`
--
DROP TABLE IF EXISTS `ParticipantRole`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `ParticipantRole` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `eventId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ParticipantRole_eventId_fkey` (`eventId`),
  CONSTRAINT `ParticipantRole_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `ParticipantRole`
--
LOCK TABLES `ParticipantRole` WRITE;

/*!40000 ALTER TABLE `ParticipantRole` DISABLE KEYS */
;

INSERT INTO
  `ParticipantRole`
VALUES
  (
    '1be76250-3bba-4332-9097-e694a61bf55c',
    '2024-06-18 11:04:29.732',
    '2024-06-18 11:04:29.732',
    '82fa2f19-bdc6-44a3-8941-69f1c167ea41',
    'Security',
    NULL
  ),
(
    '236f3725-f3b7-49aa-9750-fdd7182bb003',
    '2024-06-20 19:07:20.346',
    '2024-06-20 19:07:20.346',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    '4-year-old',
    NULL
  ),
(
    '24eb727b-f04e-47f1-987c-27f11fbf311c',
    '2024-06-20 19:08:01.572',
    '2024-06-20 19:08:01.572',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    '8-year-old',
    NULL
  ),
(
    '3d9d333e-5dce-495e-9fff-36b09d9c4155',
    '2024-06-20 19:08:07.988',
    '2024-06-20 19:08:07.988',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    '10-year-old',
    NULL
  ),
(
    '40e65e3d-8877-4c95-866d-d880191ff2f0',
    '2024-06-20 19:08:10.738',
    '2024-06-20 19:08:10.738',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    '11-year-old',
    NULL
  ),
(
    '6059a8b6-cf63-482b-b68e-50586f8d361e',
    '2024-06-18 11:04:29.732',
    '2024-06-18 11:04:29.732',
    'bd18577c-158d-41f3-99de-34b76d8e108e',
    'Collector',
    NULL
  ),
(
    '62e6065a-ba4e-480a-b104-b0c05f4cd8f4',
    '2024-06-20 19:07:43.551',
    '2024-06-20 19:07:43.551',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    '7-year-old',
    NULL
  ),
(
    '818a270d-eb95-4a50-b9e0-d2f1429a4c14',
    '2024-06-20 19:07:25.662',
    '2024-06-20 19:07:25.662',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    '5-year-old',
    NULL
  ),
(
    'a9848c0d-c6b8-434f-92bf-06ceaff34dfb',
    '2024-06-20 19:07:37.982',
    '2024-06-20 19:07:37.982',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    '6-year-old',
    NULL
  ),
(
    'bd98f0c6-ff32-43c7-8c63-f0a1df491551',
    '2024-06-20 19:08:04.700',
    '2024-06-20 19:08:04.700',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    '9-year-old',
    NULL
  ),
(
    'cc6e0d69-3a5c-4746-a133-b412f5c99f98',
    '2024-06-18 11:04:29.732',
    '2024-06-18 11:04:29.732',
    '01af7706-c554-428f-9db3-e11708df7438',
    'Donor',
    NULL
  );

/*!40000 ALTER TABLE `ParticipantRole` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `User`
--
DROP TABLE IF EXISTS `User`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profilePhotoUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` datetime(3) DEFAULT NULL,
  `phoneNumber` int DEFAULT NULL,
  `streetName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `houseName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `houseNumber` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `town` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `User`
--
LOCK TABLES `User` WRITE;

/*!40000 ALTER TABLE `User` DISABLE KEYS */
;

INSERT INTO
  `User`
VALUES
  (
    '035571b2-1d1d-433f-9ee5-09977cd4111a',
    '2024-06-18 11:04:29.724',
    '2024-06-18 11:04:29.724',
    'Nicholas',
    'Kimincha',
    'nick_kimincha@gmail.com',
    '$2b$10$/t3MzYHZ4kvbengR79sWKOYVegptqPOm/mK9uTA7Qm7BNLXI3q1XC',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
(
    '2bb929c2-6beb-4659-9977-14e706c41afb',
    '2024-06-18 11:04:29.724',
    '2024-06-18 11:04:29.724',
    'Robert',
    'Walker',
    'r_wanki@gmail.com',
    '$2b$10$mmeAZlruJFC0KnNjxShoGOAehAIY3LKRFsSsb5q9H1EYJFhTcjgBG',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
(
    '3259287c-cafb-4efa-9acd-2b4005fc066b',
    '2024-06-18 11:04:29.724',
    '2024-06-18 11:04:29.724',
    'Alfrida',
    'Aluoch',
    'alfie_aluoch@gmail.com',
    '$2b$10$.gI3.de.MpvCHb0g0WkgM.rrQpDy1e2Jm/kmRz4hC06EuCAAQbZdW',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
(
    '4b679c56-207c-49fd-a246-617cf3c7740e',
    '2024-06-18 11:04:29.724',
    '2024-06-18 11:04:29.724',
    'Susan',
    'Otieno',
    'susan@actionaid-kenya.org.com',
    '$2b$10$sC4.1STuoZZ058nvaO6KAOdLQbI96UVIy5Wz/GGlsk1OxerxLWAPG',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
(
    '699e9241-1264-41a5-a297-e70c1c0711da',
    '2024-06-18 11:04:29.724',
    '2024-06-18 11:04:29.724',
    'Angela',
    'Sheldrick',
    'angela@sheldrickwildlifetrust.org/',
    '$2b$10$/DPr8UBKMYWUN2/TvYJpMeD4IdgiXGP090zf7D.AloO5NvXx/FETW',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  ),
(
    'a990b081-76ec-4b7f-9e7f-09ef3947acc8',
    '2024-06-18 11:04:29.724',
    '2024-06-18 11:04:29.724',
    'Njoki',
    'Mbugua',
    'j_mbugua@gmail.com',
    '$2b$10$CsTj4h4cfFi8StvJ3/.lOOqtjpWAVhxXjGL7BNYl9jp.9fc.qzkpS',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );

/*!40000 ALTER TABLE `User` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `VolunteerRole`
--
DROP TABLE IF EXISTS `VolunteerRole`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `VolunteerRole` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `eventId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `VolunteerRole_eventId_fkey` (`eventId`),
  CONSTRAINT `VolunteerRole_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `VolunteerRole`
--
LOCK TABLES `VolunteerRole` WRITE;

/*!40000 ALTER TABLE `VolunteerRole` DISABLE KEYS */
;

INSERT INTO
  `VolunteerRole`
VALUES
  (
    '47f58e42-3fa7-4471-b8d0-ec5e20ccad9c',
    '2024-06-18 11:04:29.733',
    '2024-06-18 11:04:29.733',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    'Teacher',
    NULL
  ),
(
    '59c8e005-14dd-4d87-8b3d-91e2317413c4',
    '2024-06-18 11:04:29.733',
    '2024-06-18 11:04:29.733',
    '5e14e5f8-8a3d-458b-aa29-deba8ce8cc0c',
    'Facilitator',
    NULL
  ),
(
    '69f4d327-bd0a-47d3-be43-1010d11a7f66',
    '2024-06-20 19:05:58.455',
    '2024-06-20 19:05:58.455',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    'Photographer',
    NULL
  ),
(
    '702741c7-1979-442c-b728-d49b33d812bf',
    '2024-06-20 19:06:31.229',
    '2024-06-20 19:06:31.229',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    'Sound & Media',
    NULL
  ),
(
    '8c0d8fa5-2597-49c0-ba21-dcd2a439d03b',
    '2024-06-20 19:05:40.211',
    '2024-06-20 19:05:40.211',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    'Karibu Table',
    NULL
  ),
(
    'd38d6fdb-d5e1-436d-b75b-40028462a184',
    '2024-06-20 19:06:12.838',
    '2024-06-20 19:06:12.838',
    'd078b8e2-3f97-4cd5-a722-43fc430b69e9',
    'Crafts',
    NULL
  );

/*!40000 ALTER TABLE `VolunteerRole` ENABLE KEYS */
;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2024-06-20 22:12:33