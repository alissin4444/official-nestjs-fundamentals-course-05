import { CoffeesService } from './coffes.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
export declare class CoffeesController {
    private readonly coffeesService;
    private readonly request;
    constructor(coffeesService: CoffeesService, request: Request);
    findAll(protocol: string, paginationQuery: any): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createCoffeeDto: CreateCoffeeDto): Promise<any>;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<any>;
    remove(id: string): Promise<any>;
}
