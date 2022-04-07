import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddIsMoringToSchedule1643591321022 implements MigrationInterface {

     public async up(queryRunner: QueryRunner): Promise<void> {

         await queryRunner.addColumn(
            'schedules',
            new TableColumn({
               name: 'isMorning',
               type: 'boolean',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('schedules', 'isMorning');
    }
}
