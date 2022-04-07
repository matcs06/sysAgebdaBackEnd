import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSchedules1643162716377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
            new Table(
                {
                    name:"schedules",
                    columns:[
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "customer_name",
                            type:"varchar",
                        },
                        {
                            name: "service",
                            type:"varchar"
                        },
                        {
                            name: "date",
                            type:"varchar"
                        },
                        {
                            name: "start_time",
                            type:"varchar"
                        },
                        {
                            name: "service_duration",
                            type:"varchar"
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("schedules")
    }

}
