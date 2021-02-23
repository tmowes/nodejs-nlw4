import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { userTableName } from '../../models/User'
import { idColumn, timestampColumns } from './utils'

export class CreateUsers1614119857591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: userTableName,
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          ...timestampColumns,
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(userTableName)
  }
}
