-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `profilePicture` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdotanteUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `formRespondido` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `AdotanteUser_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OngUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `whatsapp` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `OngUser_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Animal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ongId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `raca` VARCHAR(191) NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `porte` VARCHAR(191) NOT NULL,
    `idade` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `images` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Formulario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adotanteUserId` INTEGER NOT NULL,
    `mediaSalarial` VARCHAR(191) NOT NULL,
    `temQuintal` BOOLEAN NOT NULL,
    `possuiOutrosAnimais` BOOLEAN NOT NULL,
    `animais` TEXT NOT NULL,
    `imovel` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Formulario_adotanteUserId_key`(`adotanteUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Adocao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `animalId` INTEGER NOT NULL,
    `adotanteId` INTEGER NOT NULL,
    `ongId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `images` TEXT NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdotanteUser` ADD CONSTRAINT `AdotanteUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OngUser` ADD CONSTRAINT `OngUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_ongId_fkey` FOREIGN KEY (`ongId`) REFERENCES `OngUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Formulario` ADD CONSTRAINT `Formulario_adotanteUserId_fkey` FOREIGN KEY (`adotanteUserId`) REFERENCES `AdotanteUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adocao` ADD CONSTRAINT `Adocao_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `Animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adocao` ADD CONSTRAINT `Adocao_adotanteId_fkey` FOREIGN KEY (`adotanteId`) REFERENCES `AdotanteUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adocao` ADD CONSTRAINT `Adocao_ongId_fkey` FOREIGN KEY (`ongId`) REFERENCES `OngUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
