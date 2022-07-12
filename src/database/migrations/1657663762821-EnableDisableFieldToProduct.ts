import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class EnableDisableFieldToProduct1657663762821 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
               name: 'enabled',
               type: 'boolean',
               isNullable: true
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'enabled');
    }

}
