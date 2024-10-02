import { DataSourceOptions } from 'typeorm';
import { DynamicModule } from '@nestjs/common';
export declare class DatabaseModule {
    static register(options: DataSourceOptions): DynamicModule;
}
