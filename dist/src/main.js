"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const core_1 = require("@nestjs/core");
const timeout_interceptor_1 = require("./common/interceptors/timeout/timeout.interceptor");
const common_1 = require("@nestjs/common");
const wrap_response_interceptor_1 = require("./common/interceptors/wrap-response/wrap-response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalInterceptors(new wrap_response_interceptor_1.WrapResponseInterceptor(), new timeout_interceptor_1.TimeoutInterceptor());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map