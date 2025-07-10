import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { DataController } from "./data.controller";

@Module({
    imports: [HttpModule],
    controllers: [DataController],
})
export class DataModule {}