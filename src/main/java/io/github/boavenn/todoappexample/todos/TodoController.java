package io.github.boavenn.todoappexample.todos;

import io.github.boavenn.todoappexample.todos.model.Todo;
import io.github.boavenn.todoappexample.todos.model.TodoReadDTO;
import io.github.boavenn.todoappexample.todos.model.TodoUpdateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController
{
    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(todoService.getAll());
    }

    @PostMapping
    public ResponseEntity<?> add(@Valid @RequestBody Todo todoToAdd) {
        TodoReadDTO addedTodo = todoService.addTodo(todoToAdd);
        return new ResponseEntity<>(addedTodo, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody TodoUpdateDTO dto, @PathVariable long id) {
        TodoReadDTO updatedTodo = todoService.updateTodo(dto, id);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok(true);
    }
}
