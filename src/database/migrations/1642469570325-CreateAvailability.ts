import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAvailability1642469570325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name:"availability",
                    columns:[
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "date",
                            type:"date",
                        },
                        {
                            name: "morning_start_time",
                            type:"varchar"
                        },
                        {
                            name: "morning_end_time",
                            type:"varchar"
                        },
                        {
                            name: "afternoon_start_time",
                            type:"varchar"
                        },
                        {
                            name: "afternoon_end_time",
                            type:"varchar"
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("availability")
    }

}
