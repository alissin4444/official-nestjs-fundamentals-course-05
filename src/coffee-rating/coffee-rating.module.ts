import { CoffeesModule } from 'src/coffes/coffees.module';
import { CoffeesService } from 'src/coffes/coffes.service';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';

class MockCoffeesService {}

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
    }),
    CoffeesModule,
  ],
  providers: [
    {
      provide: CoffeesService,
      useValue: new MockCoffeesService(),
    },
  ],
})
export class CoffeeRatingModule {}
