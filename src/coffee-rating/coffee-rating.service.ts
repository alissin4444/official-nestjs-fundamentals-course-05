import { CoffeesService } from 'src/coffes/coffes.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffeeService: CoffeesService) {}
}
