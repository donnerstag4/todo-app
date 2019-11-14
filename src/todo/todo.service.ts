import { Injectable, HttpException } from '@nestjs/common';
import { TODO } from '../mocks/todo.mock';
import { TodoDTO } from './dto/todo.dto';

@Injectable()
export class TodoService {
    todos = TODO;

    getTodos(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.todos);
        });
    }

    getTodo(todoID): Promise<any> {
        let id = Number(todoID);
        return new Promise(resolve => {
            const todo = this.todos.find(todo => todo.id === id);
            if (!todo) {
                throw new HttpException('Todo does not exist!', 404);
            }
            resolve(todo);
        });
    }

    addTodo(todo): Promise<any> {
        return new Promise(resolve => {
            this.todos.push(todo);
            resolve(this.todos);
        });
    }

    updateTodo(todo): Promise<any> {
        return new Promise(resolve => {
            const todoData = this.todos.find(t => t.id === todo.id);
            if (!todoData) {
                throw new HttpException('Todo does not exist!', 404);
            }
            todoData.title = todo.title;
            todoData.description = todo.description;
            resolve(this.todos);
        });
    }

    deleteTodo(todoID): Promise<any> {
        let id = Number(todoID);
        return new Promise(resolve => {
            let index = this.todos.findIndex(todo => todo.id === id);
            if (index === -1) {
                throw new HttpException('Todo does not exist!', 404);
            }
            this.todos.splice(index, 1);
            resolve(this.todos);
        });
    }
}
