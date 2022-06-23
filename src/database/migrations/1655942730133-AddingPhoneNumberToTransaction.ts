import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddingPhoneNumberToTransaction1655942730133 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'transaction',
            new TableColumn({
               name: 'customer_phone',
               type: 'varchar',
               isNullable: true
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('transaction', 'customer_phone');
    }

}
