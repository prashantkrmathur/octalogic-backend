import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1751719388710 implements MigrationInterface {
    name = 'InitialMigration1751719388710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`booking\` (\`id\` int NOT NULL AUTO_INCREMENT, \`startDate\` date NOT NULL, \`endDate\` date NOT NULL, \`userId\` int NULL, \`vehicleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`modelName\` varchar(255) NOT NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicle_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`wheelCount\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_336b3f4a235460dc93645fbf222\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_dc9f6a94644e45d49872c1e2f10\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vehicle\` ADD CONSTRAINT \`FK_ae98e7763672275c9265e1294e3\` FOREIGN KEY (\`categoryId\`) REFERENCES \`vehicle_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehicle\` DROP FOREIGN KEY \`FK_ae98e7763672275c9265e1294e3\``);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_dc9f6a94644e45d49872c1e2f10\``);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_336b3f4a235460dc93645fbf222\``);
        await queryRunner.query(`DROP TABLE \`vehicle_category\``);
        await queryRunner.query(`DROP TABLE \`vehicle\``);
        await queryRunner.query(`DROP TABLE \`booking\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
