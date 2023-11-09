import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBaseTable1699389006928 implements MigrationInterface {
  name = 'CreateBaseTable1699389006928';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "request_response" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "request" character varying NOT NULL, "response" character varying NOT NULL, CONSTRAINT "PK_ec398d38410e4a9d113a88150b2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "request_response"`);
  }
}
