import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1750921338964 implements MigrationInterface {
    name = 'Migration1750921338964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "accountStatus" character varying NOT NULL DEFAULT 'unverified', "profileImg" character varying, "refreshToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driver-profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "liscenseNumber" character varying NOT NULL, "aadhaarNumber" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_f8c6d9b78eb5d1e814b0ba9135" UNIQUE ("userId"), CONSTRAINT "PK_12b91920c313da9be393e6ff388" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "address" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."payments_paymentmethod_enum" AS ENUM('cash', 'upi', 'card')`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric NOT NULL, "paymentMethod" "public"."payments_paymentmethod_enum" NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "rideId" uuid, CONSTRAINT "REL_e979c43b9a5f2bcfb69ee795a6" UNIQUE ("rideId"), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ratings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stars" character varying NOT NULL, "note" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "rideId" uuid, "raterId" uuid, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."rides_ridestatus_enum" AS ENUM('pending', 'accepted', 'in-progress', 'completed')`);
        await queryRunner.query(`CREATE TABLE "rides" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rideStatus" "public"."rides_ridestatus_enum" NOT NULL, "startTime" TIMESTAMP, "endTime" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "riderId" uuid, "driverId" uuid, "pickupLocationId" uuid, "dropLocationId" uuid, CONSTRAINT "PK_ca6f62fc1e999b139c7f28f07fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "model" character varying NOT NULL, "registrationNumber" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "driverProfileId" uuid, "userId" uuid, CONSTRAINT "REL_d76765c2229477864ea8a84028" UNIQUE ("driverProfileId"), CONSTRAINT "REL_86aea53f0b2b4f046e25e8315d" UNIQUE ("userId"), CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "type" "public"."otp_type_enum" NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountStatus"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileImg"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accountStatus" character varying NOT NULL DEFAULT 'unverified'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profileImg" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('rider', 'driver', 'admin')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "driver-profile" ADD CONSTRAINT "FK_f8c6d9b78eb5d1e814b0ba91351" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_e979c43b9a5f2bcfb69ee795a6a" FOREIGN KEY ("rideId") REFERENCES "rides"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_5ea4e6b760b74bd49b9cdc58ca0" FOREIGN KEY ("rideId") REFERENCES "rides"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_e5d0a61e726410a860f23f39de7" FOREIGN KEY ("raterId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rides" ADD CONSTRAINT "FK_3c581fc8082dc803233ec676ef9" FOREIGN KEY ("riderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rides" ADD CONSTRAINT "FK_0adda088d567495e71d21b6c691" FOREIGN KEY ("driverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rides" ADD CONSTRAINT "FK_721bd5fdaa0f37a35e972d1fc7c" FOREIGN KEY ("pickupLocationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rides" ADD CONSTRAINT "FK_57d7614117a59c75dd920c76612" FOREIGN KEY ("dropLocationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_d76765c2229477864ea8a84028a" FOREIGN KEY ("driverProfileId") REFERENCES "driver-profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_86aea53f0b2b4f046e25e8315d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "FK_db724db1bc3d94ad5ba38518433" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "FK_db724db1bc3d94ad5ba38518433"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_86aea53f0b2b4f046e25e8315d1"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_d76765c2229477864ea8a84028a"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "rides" DROP CONSTRAINT "FK_57d7614117a59c75dd920c76612"`);
        await queryRunner.query(`ALTER TABLE "rides" DROP CONSTRAINT "FK_721bd5fdaa0f37a35e972d1fc7c"`);
        await queryRunner.query(`ALTER TABLE "rides" DROP CONSTRAINT "FK_0adda088d567495e71d21b6c691"`);
        await queryRunner.query(`ALTER TABLE "rides" DROP CONSTRAINT "FK_3c581fc8082dc803233ec676ef9"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_e5d0a61e726410a860f23f39de7"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_5ea4e6b760b74bd49b9cdc58ca0"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_e979c43b9a5f2bcfb69ee795a6a"`);
        await queryRunner.query(`ALTER TABLE "driver-profile" DROP CONSTRAINT "FK_f8c6d9b78eb5d1e814b0ba91351"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileImg"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountStatus"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profileImg" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accountStatus" character varying NOT NULL DEFAULT 'unverified'`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "rides"`);
        await queryRunner.query(`DROP TYPE "public"."rides_ridestatus_enum"`);
        await queryRunner.query(`DROP TABLE "ratings"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "public"."payments_paymentmethod_enum"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "driver-profile"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
