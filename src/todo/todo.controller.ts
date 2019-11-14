import { Controller, Get, Param, Post, Body, Delete, Query, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDTO } from './dto/todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) { }

    @Get()
    async getTodos() {
        const todos = await this.todoService.getTodos();
        return todos;
    }

    @Get(':todoID')
    async getTodo(@Param('todoID') todoID) {
        const todo = await this.todoService.getTodo(todoID)
        return todo;
    }

    @Post()
    async addBook(@Body() todoDTO: TodoDTO) {
        const todo = await this.todoService.addTodo(todoDTO);
        return todo;
    }

    @Put()
    async updateBook(@Body() todoDTO: TodoDTO) {
        const todo = await this.todoService.updateTodo(todoDTO);
        return todo;
    }

    @Delete()
    async deleteBook(@Query() query) {
        const todos = await this.todoService.deleteTodo(query.todoID);
        return todos;
    }
}
