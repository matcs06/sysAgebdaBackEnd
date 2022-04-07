import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserFKeyToAvailability1649021149979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'availability',
            new TableColumn({
               name: 'user_id',
               type: 'uuid',
               isNullable: true
            }),
        );
 
        await queryRunner.createForeignKey(
         'availability',
         new TableForeignKey({
           name: 'AvailabilityUser',
           columnNames: ['user_id'],
           referencedColumnNames: ['id'],
           referencedTableName: 'users',
           onDelete: 'SET NULL',
           onUpdate: 'CASCADE',
         }),
       );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('availability', 'AvailabilityUser');
        await queryRunner.dropColumn('availability', 'user_id');
    }

}
