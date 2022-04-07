import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserFKeyToTransaction1649021554690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'transaction',
            new TableColumn({
               name: 'user_id',
               type: 'uuid',
               isNullable: true
            }),
        );
 
        await queryRunner.createForeignKey(
         'transaction',
         new TableForeignKey({
           name: 'TransactionUser',
           columnNames: ['user_id'],
           referencedColumnNames: ['id'],
           referencedTableName: 'users',
           onDelete: 'SET NULL',
           onUpdate: 'CASCADE',
         }),
       );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transaction', 'TransactionUser');
        await queryRunner.dropColumn('transaction', 'user_id');
    }

}
