import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class PaymentStatusToSchedules1651109445028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'schedules',
            new TableColumn({
               name: 'payment_status',
               type: 'varchar',
               isNullable: true
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('schedules', 'payment_status');
    }

}
