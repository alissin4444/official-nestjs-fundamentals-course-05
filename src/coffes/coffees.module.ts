import { Module, Scope } from '@nestjs/common';

import { COFFEE_BRANDS } from './coffees.constants';
import { Coffee } from './entities/coffee.entity';
import { CoffeesController } from 'src/coffes/coffes.controller';
import { CoffeesService } from 'src/coffes/coffes.service';
import { ConfigModule } from '@nestjs/config';
import { Event } from '../events/entities/event.entity';
import { Flavor } from './entities/flavor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import coffeesConfig from './config/coffees.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ['buddy brew', 'nescafe'],
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
