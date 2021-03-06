import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransactions1644352520906 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
         new Table(
                {
                    name:"transactions",
                    columns:[
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "title",
                            type: "varchar",
                        },
                        {
                            name: "value",
                            type: "varchar",
                        },
                        {
                            name: "type",
                            type: "varchar",
                        },
                        {
                            name: "formatedDate",
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
        await queryRunner.dropTable("transactions")
    }

}
