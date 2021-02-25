import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { surveyTableName } from '../../models'
import { idColumn, timestampColumns } from './utils'

export class CreateSurveys1614211158517 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: surveyTableName,
        columns: [
          idColumn,
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isUnique: true,
          },
          ...timestampColumns,
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(surveyTableName)
  }
}
