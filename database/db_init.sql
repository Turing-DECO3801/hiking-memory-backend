CREATE DATABASE IF NOT EXISTS Deco3801;

USE Deco3801;

CREATE TABLE IF NOT EXISTS users(
    `email` VARCHAR(255),
    `password` VARCHAR(32),
    `insertion_time` TIMESTAMP,
    PRIMARY KEY (`email`)
);

CREATE TABLE IF NOT EXISTS hikes(
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255),
    `gps_logs` VARCHAR(100) NOT NULL,
    `distance` FLOAT,
    `start_time` DATETIME,
    `end_time` DATETIME,
    `path_name` VARCHAR(30),
    `favourite` BOOLEAN,
    `insertion_time` TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`email`) REFERENCES users(`email`)
);

CREATE TABLE IF NOT EXISTS memos(
    `id` INT NOT NULL AUTO_INCREMENT,
    `hike_id` INT NOT NULL,
    `audio` VARCHAR(100) NOT NULL,
    `longitude` FLOAT NOT NULL,
    `latitude` FLOAT NOT NULL,
    `image` VARCHAR(100),
    `notes` VARCHAR(100),
    `transcription` VARCHAR(200),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`hike_id`) REFERENCES hikes(`id`)
);


INSERT INTO users(`email`,`password`,`insertion_time`)
VALUES ('test1@gmail.com', 'test', NOW());

INSERT INTO hikes(`email`,`gps_logs`,`distance`,`start_time`,`end_time`,`path_name`,`favourite`,`insertion_time`)
VALUES ('test1@gmail.com', 'fakeGPS.txt', 10, NOW(), NOW(), 'fakePathName', 1, NOW());