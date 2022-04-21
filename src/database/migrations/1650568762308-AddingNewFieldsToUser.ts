import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddingNewFieldsToUser1650568762308 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'users',
            [
              new TableColumn({
                name: 'phone',
                type: 'varchar',
                isNullable: true
             }),
             new TableColumn({
                name: 'welcome_message',
                type: 'varchar',
                isNullable: true
             }),
             new TableColumn({
                name: 'business_name',
                type: 'varchar',
                isNullable: true
             }),
             new TableColumn({
                name: 'address',
                type: 'varchar',
                isNullable: true
             })
            ]
        );
   
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'address');
        await queryRunner.dropColumn('users', 'business_name');
        await queryRunner.dropColumn('users', 'welcome_message');
        await queryRunner.dropColumn('users', 'phone');

    }

}
