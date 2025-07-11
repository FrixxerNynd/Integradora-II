import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { EmailController } from "./email.controller";

@Module({
    imports: [HttpModule],
    controllers: [EmailController],
})

export class EmailModule {}
