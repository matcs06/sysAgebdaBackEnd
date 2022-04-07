import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1641656444798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name:"products",
                    columns:[
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "name",
                            type: "varchar",
                        },
                        {
                            name: "description",
                            type: "varchar",
                        },
                        {
                            name: "duration",
                            type: "varchar",
                        },
                        {
                            name: "price",
                            type: "varchar",
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        },

                    ]
                }

            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products")
    }

}
