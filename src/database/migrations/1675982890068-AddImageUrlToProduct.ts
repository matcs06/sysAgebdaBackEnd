import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddImageUrlToProduct1675982890068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
                name: 'image_url',
                type: 'varchar',
                isNullable: true
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'image_url');
    }

}
