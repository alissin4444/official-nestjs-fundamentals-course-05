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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coffee_entity_1 = require("./entities/coffee.entity");
const flavor_entity_1 = require("./entities/flavor.entity");
const event_entity_1 = require("../events/entities/event.entity");
const config_1 = require("@nestjs/config");
const coffees_config_1 = require("./config/coffees.config");
let CoffeesService = class CoffeesService {
    constructor(coffeeRepository, flavorRepository, dataSource, configService, coffeesConfiguration) {
        this.coffeeRepository = coffeeRepository;
        this.flavorRepository = flavorRepository;
        this.dataSource = dataSource;
        this.configService = configService;
        this.coffeesConfiguration = coffeesConfiguration;
        const databaseHost = this.configService.get('coffees');
        console.log(databaseHost);
    }
    findAll(paginationQuery) {
        const { limit, offset } = paginationQuery;
        return this.coffeeRepository.find({
            relations: {
                flavors: true,
            },
            take: limit,
            skip: offset,
        });
    }
    async findOne(id) {
        const coffee = await this.coffeeRepository.findOne({
            where: {
                id: +id,
            },
            relations: {
                flavors: true,
            },
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }
    async create(createCoffeeDto) {
        const flavors = await Promise.all(createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)));
        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors,
        });
        return this.coffeeRepository.save(coffee);
    }
    async recommendCoffee(coffee) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            coffee.recomendations++;
            const recommendEvent = new event_entity_1.Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async update(id, updateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors &&
            (await Promise.all(updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name))));
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors,
        });
        if (!coffee) {
            throw new common_1.NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }
    async remove(id) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }
    async preloadFlavorByName(name) {
        const existingFlavor = await this.flavorRepository.findOne({
            where: { name },
        });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
};
exports.CoffeesService = CoffeesService;
exports.CoffeesService = CoffeesService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, typeorm_1.InjectRepository)(coffee_entity_1.Coffee)),
    __param(1, (0, typeorm_1.InjectRepository)(flavor_entity_1.Flavor)),
    __param(4, (0, common_1.Inject)(coffees_config_1.default.KEY)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _c : Object, typeof (_d = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _d : Object, typeof (_e = typeof config_1.ConfigType !== "undefined" && config_1.ConfigType) === "function" ? _e : Object])
], CoffeesService);
//# sourceMappingURL=coffes.service.js.map