import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPhoneNumberToSchedule1643244647198 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

         await queryRunner.addColumn(
            'schedules',
            new TableColumn({
               name: 'phone_number',
               type: 'varchar',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('schedules', 'phone_number');
    }

}
