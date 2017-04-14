var app = angular.module('todoApp',[]);

app.controller('todoListCtrl', function(){
    var todoListCtrl = this;
    todoListCtrl.todos = {};
    todoListCtrl.addTodo = function(){
        var toPush = {
            text: todoListCtrl.todoText,
            done: false
        };
        todoListCtrl.todos.push(toPush);
        todoListCtrl.todoText = '';
    };
});