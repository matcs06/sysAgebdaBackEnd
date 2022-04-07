import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserFKeyToSchedule1649021371621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'schedules',
            new TableColumn({
               name: 'user_id',
               type: 'uuid',
               isNullable: true
            }),
        );
 
        await queryRunner.createForeignKey(
         'schedules',
         new TableForeignKey({
           name: 'ScheduleUser',
           columnNames: ['user_id'],
           referencedColumnNames: ['id'],
           referencedTableName: 'users',
           onDelete: 'SET NULL',
           onUpdate: 'CASCADE',
         }),
       );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('schedules', 'ScheduleUser');
        await queryRunner.dropColumn('schedules', 'user_id');
    }

}
