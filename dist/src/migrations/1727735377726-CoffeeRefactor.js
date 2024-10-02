"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeRefactor1727735377726 = void 0;
class CoffeeRefactor1727735377726 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
    }
}
exports.CoffeeRefactor1727735377726 = CoffeeRefactor1727735377726;
//# sourceMappingURL=1727735377726-CoffeeRefactor.js.map