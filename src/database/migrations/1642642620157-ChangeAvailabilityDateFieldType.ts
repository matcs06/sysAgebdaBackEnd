import {Column, MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class ChangeAvailabilityDateFieldType1642642620157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         
         await queryRunner.dropColumn(
             'availability',
             'date'
         ),
         
         await queryRunner.addColumn(
            'availability',
            new TableColumn({
               name: 'date',
               type: 'varchar',
            }),
        );
    }

    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('availability', 'date');
    }

}
