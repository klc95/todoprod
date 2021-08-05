import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller';
import { HomepageService } from './homepage.service';

@Module({
  imports: [],
  controllers: [HomepageController],
  providers: [HomepageService],
})
export class HomepageModule {}
