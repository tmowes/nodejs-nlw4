import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import {
  surveyUserTableName,
  userTableName,
  surveyTableName,
} from '../../models'
import { idColumn, timestampColumns } from './utils'

export class CreateSurveysUsers1614291655890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: surveyUserTableName,
        columns: [
          idColumn,
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'survey_id',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'number',
            isNullable: true,
          },
          ...timestampColumns,
        ],
        foreignKeys: [
          {
            name: 'FKUsers',
            referencedTableName: userTableName,
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKSurveys',
            referencedTableName: surveyTableName,
            referencedColumnNames: ['id'],
            columnNames: ['survey_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(surveyUserTableName)
  }
}
