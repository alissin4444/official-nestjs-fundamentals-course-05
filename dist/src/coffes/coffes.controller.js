"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesController = void 0;
const common_1 = require("@nestjs/common");
const coffes_service_1 = require("./coffes.service");
const create_coffee_dto_1 = require("./dto/create-coffee.dto");
const update_coffee_dto_1 = require("./dto/update-coffee.dto");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("../common/decorators/public.decorator");
const parse_int_pipe_1 = require("../common/pipes/parse-int/parse-int.pipe");
const protocol_decorator_1 = require("../common/decorators/protocol.decorator");
let CoffeesController = class CoffeesController {
    constructor(coffeesService, request) {
        this.coffeesService = coffeesService;
        this.request = request;
    }
    async findAll(protocol, paginationQuery) {
        console.log(protocol);
        return this.coffeesService.findAll(paginationQuery);
    }
    findOne(id) {
        return this.coffeesService.findOne(id);
    }
    create(createCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto);
    }
    update(id, updateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }
    remove(id) {
        return this.coffeesService.remove(id);
    }
};
exports.CoffeesController = CoffeesController;
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, protocol_decorator_1.Protocol)('https')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoffeesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coffee_dto_1.CreateCoffeeDto]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_coffee_dto_1.UpdateCoffeeDto]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "remove", null);
exports.CoffeesController = CoffeesController = __decorate([
    (0, common_1.Controller)('coffees'),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [coffes_service_1.CoffeesService,
        Request])
], CoffeesController);
//# sourceMappingURL=coffes.controller.js.map