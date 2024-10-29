import { UserType } from 'common-modules';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1719385606087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'userType',
            type: 'enum',
            enum: [
              UserType.GENERAL_USER,
              UserType.ADMIN,
              UserType.REVIEWER,
              UserType.INSURANCE_BROKER,
              UserType.SELLER,
              UserType.GARAGE_USER,
            ],
            default: `"${UserType.GENERAL_USER}"`,
          },
          {
            name: 'isActive',
            type: 'tinyint', // Boolean equivalent MySQL type
            default: 1,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
