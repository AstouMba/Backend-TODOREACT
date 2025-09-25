-- CreateTable
CREATE TABLE `Taches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `etat` ENUM('Termine', 'En_Cours') NOT NULL DEFAULT 'En_Cours',
    `image` VARCHAR(191) NULL,
    `audio` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Taches_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PermissionUserTache` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `permission` ENUM('GET', 'PATCH', 'DELETE') NOT NULL,
    `userId` INTEGER NOT NULL,
    `tacheId` INTEGER NOT NULL,

    INDEX `PermissionUserTache_tacheId_fkey`(`tacheId`),
    INDEX `PermissionUserTache_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoriqueModifTache` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modifiedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `action` ENUM('GET', 'PATCH', 'DELETE') NOT NULL,
    `userId` INTEGER NOT NULL,
    `tacheId` INTEGER NOT NULL,

    INDEX `HistoriqueModifTache_tacheId_fkey`(`tacheId`),
    INDEX `HistoriqueModifTache_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Taches` ADD CONSTRAINT `Taches_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermissionUserTache` ADD CONSTRAINT `PermissionUserTache_tacheId_fkey` FOREIGN KEY (`tacheId`) REFERENCES `Taches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermissionUserTache` ADD CONSTRAINT `PermissionUserTache_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoriqueModifTache` ADD CONSTRAINT `HistoriqueModifTache_tacheId_fkey` FOREIGN KEY (`tacheId`) REFERENCES `Taches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoriqueModifTache` ADD CONSTRAINT `HistoriqueModifTache_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
