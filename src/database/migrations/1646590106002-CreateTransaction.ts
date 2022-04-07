import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransaction1646590106002 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                   {
                       name:"transaction",
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
        await queryRunner.dropTable("transaction")
    }

}
