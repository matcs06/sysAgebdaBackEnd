import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class PaymentStatusToTransactions1651109813395 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'transaction',
            new TableColumn({
               name: 'payment_status',
               type: 'varchar',
               isNullable: true
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('transaction', 'payment_status');
    }

}
