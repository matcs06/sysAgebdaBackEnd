import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddingPaymentInfoToUser1657659290173 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns(
            'users',
            [
              new TableColumn({
                name: 'payment_day',
                type: 'varchar',
                isNullable: true
             }),
             new TableColumn({
                name: 'payment_status',
                type: 'varchar',
                isNullable: true
             }),
             new TableColumn({
                name: 'user_level',
                type: 'varchar',
                isNullable: true
             })
            ]
        );
   
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'user_level');
        await queryRunner.dropColumn('users', 'payment_status');
        await queryRunner.dropColumn('users', 'payment_day');
    }

}
