import { Body } from '@nestjs/common';
import { Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { HomepageService } from './homepage.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const dbFilePath = __dirname + '/../../db/homepage-config.json';

function writeconfigToDb(config) {
  fs.writeFileSync(dbFilePath, JSON.stringify(config), 'utf-8');
}

function readconfigFromDb() {
  const config = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
  return config;
}

function readFromDb(id: string) {
  const config = readconfigFromDb();
  return config.filter((item) => item.id === id)[0];
}

@Controller('homepage')
export class HomepageController {
  constructor(private readonly HomepageService: HomepageService) {}

  @Post('')
  async create(@Body('url') url: string) {

    const todos = readconfigFromDb();
    const newId = String(Number(todos[todos.length - 1].id) + 1);
    const newTodos = [
      ...todos,
      {
        id: newId,
        url,
      },
    ];
    writeconfigToDb(newTodos);
  }


  @Get('/all')
  async get(): Promise<any> {
    return {
      success: true,
      data: readconfigFromDb(),
    };
  }

  @Delete('/:todoId')
  async delete(@Param('todoId') todoId) {
    const todos = readconfigFromDb();

    todos.forEach((todo, index) => {
      if (todo.id === todoId) {
        todos.splice(index, 1);
      }
    });

    writeconfigToDb(todos);

    return {
      success: true,
    };
  }


  
}
