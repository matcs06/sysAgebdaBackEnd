import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserFKeyToProduct1649020638286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
           'products',
           new TableColumn({
              name: 'user_id',
              type: 'uuid',
              isNullable: true
           }),
       );

       await queryRunner.createForeignKey(
        'products',
        new TableForeignKey({
          name: 'ProductUser',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
   }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'ProductUser');
        await queryRunner.dropColumn('products', 'user_id');
    }

}
