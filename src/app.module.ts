import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { HomepageModule } from './homepage/homepage.module';

@Module({
  imports: [TodoModule, HomepageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
