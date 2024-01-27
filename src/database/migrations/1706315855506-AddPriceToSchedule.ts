import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPriceToSchedule1706315855506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'schedules',
            new TableColumn({
                name: 'price',
                type: 'varchar',
                isNullable: true
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('schedules', 'price');
    }

}
