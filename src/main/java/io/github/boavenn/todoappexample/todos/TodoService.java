package io.github.boavenn.todoappexample.todos;

import io.github.boavenn.todoappexample.todos.model.Todo;
import io.github.boavenn.todoappexample.todos.model.TodoReadDTO;
import io.github.boavenn.todoappexample.todos.model.TodoRepository;
import io.github.boavenn.todoappexample.todos.model.TodoUpdateDTO;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService
{
    private final TodoRepository todoRepository;

    public List<TodoReadDTO> getAll() {
        return todoRepository.findAll().stream()
                .map(TodoReadDTO::from)
                .collect(Collectors.toList());
    }

    public TodoReadDTO addTodo(Todo todoToAdd) {
        Todo addedTodo = todoRepository.save(Todo.from(todoToAdd));
        return TodoReadDTO.from(addedTodo);
    }

    @SneakyThrows
    public TodoReadDTO updateTodo(TodoUpdateDTO dto, long todoId) {
        Optional<Todo> opt = todoRepository.findById(todoId);
        if (opt.isEmpty()) {
            throw new Exception("Todo with given id does not exist");
        } else {
            Todo todoToUpdate = opt.get();
            dto.applyChangesTo(todoToUpdate);
            todoRepository.save(todoToUpdate);
            return TodoReadDTO.from(todoToUpdate);
        }
    }

    public void deleteTodo(long todoId) {
        todoRepository.deleteById(todoId);
    }
}
