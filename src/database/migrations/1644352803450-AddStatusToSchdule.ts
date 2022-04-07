import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddStatusToSchdule1644352803450 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.addColumn(
            'schedules',
            new TableColumn({
               name: 'status',
               type: 'varchar',
               isNullable: true
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('schedules', 'status');
    }

}
