import { Component, OnInit } from "@angular/core";
import { NgIf } from "@angular/common";
import { Todo } from "../../interfaces/todo";

@Component({
  selector: "todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  todoId: number;
  beforeEditCache: string;
  filter: string;
  isCheckedAll: boolean;
  constructor() {}

  ngOnInit(): void {
    this.todoTitle = "";
    this.todoId = 4;
    this.beforeEditCache = "";
    this.filter = "all";
    this.isCheckedAll = false;
    this.todos = [
      {
        id: 1,
        title: "Finish Angular Screencast",
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: "Take over world",
        completed: false,
        editing: false
      },
      {
        id: 3,
        title: "One more thing",
        completed: false,
        editing: false
      }
    ];
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }
    this.todos.push({
      id: this.todoId,
      title: this.todoTitle,
      completed: false,
      editing: false
    });
    this.todoTitle = "";
    this.todoId++;
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  enterEditMode(todo: Todo): void {
    todo.editing = true;
    this.beforeEditCache = todo.title;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  completeTodo(todo: Todo): void {
    todo.completed = !todo.completed;
  }
  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  isAnyCompleted(): boolean {
    return this.todos.some(todo => todo.completed);
  }

  isAllCompleted(): boolean {
    return this.todos.every(todo => todo.completed);
  }

  checkAll(): void {
    this.todos = this.todos.map(todo => {
      return { ...todo, completed: this.isCheckedAll };
    });
  }
  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  filterTodos(): Todo[] {
    switch (this.filter) {
      case "all":
        return this.todos;
      case "completed":
        return this.todos.filter(todo => todo.completed);
      case "active":
        return this.todos.filter(todo => !todo.completed);
    }
  }
}
