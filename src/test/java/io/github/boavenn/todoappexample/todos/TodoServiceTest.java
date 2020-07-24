package io.github.boavenn.todoappexample.todos;

import io.github.boavenn.todoappexample.todos.model.Todo;
import io.github.boavenn.todoappexample.todos.model.TodoReadDTO;
import io.github.boavenn.todoappexample.todos.model.TodoRepository;
import io.github.boavenn.todoappexample.todos.model.TodoUpdateDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest
{
    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService service;

    @Test
    public void shouldReturnListOfDTOsCorrectly() {
        // given
        Date deadline = Date.from(Instant.now());
        Todo todo = new Todo();
        todo.setDescription("text");
        todo.setDeadline(deadline);
        given(todoRepository.findAll()).willReturn(Collections.singletonList(todo));

        // when
        List<TodoReadDTO> dtos = service.getAll();

        // then
        assertThat(dtos).isNotEmpty();
        assertThat(dtos).hasSize(1);
        TodoReadDTO dto = dtos.get(0);
        assertThat(dto.getDescription()).isEqualTo("text");
        assertThat(dto.getDeadline()).isEqualTo(deadline);
    }

    @Test
    public void shouldAddTodo_WhenOnlyDescriptionIsPresent() {
        // given
        Todo todo = new Todo();
        todo.setDescription("text");
        given(todoRepository.save(any(Todo.class))).will(returnsFirstArg());

        // when
        TodoReadDTO dto = service.addTodo(todo);

        // then
        assertThat(dto).isNotNull();
        assertThat(dto.getDescription()).isEqualTo("text");
        assertThat(dto.getDeadline()).isNull();
    }

    @Test
    public void shouldAddTodo_WhenDescriptionAndDeadlineArePresent() {
        // given
        Date deadline = Date.from(Instant.now());
        Todo todo = new Todo();
        todo.setDescription("text");
        todo.setDeadline(deadline);
        given(todoRepository.save(any(Todo.class))).will(returnsFirstArg());

        // when
        TodoReadDTO dto = service.addTodo(todo);

        // then
        assertThat(dto).isNotNull();
        assertThat(dto.getDescription()).isEqualTo("text");
        assertThat(dto.getDeadline()).isEqualTo(deadline);
    }

    @Test
    public void shouldUpdateTodo_WhenTodoToUpdateExists() {
        // given
        Date deadlineToUpdate = Date.from(Instant.now());
        Todo todoToUpdate = new Todo();
        todoToUpdate.setDescription("text");
        todoToUpdate.setDeadline(deadlineToUpdate);
        todoToUpdate.setId(1L);

        Date updatedDeadline = Date.from(Instant.now());
        TodoUpdateDTO updateDTO = new TodoUpdateDTO();
        updateDTO.setDescription("updated");
        updateDTO.setDone(true);
        updateDTO.setDeadline(updatedDeadline);

        given(todoRepository.findById(anyLong())).willReturn(Optional.of(todoToUpdate));

        // when
        TodoReadDTO dto = service.updateTodo(updateDTO, 1L);

        // then
        assertThat(dto).isNotNull();
        assertThat(dto.getDescription()).isEqualTo("updated");
        assertThat(dto.getDeadline()).isEqualTo(updatedDeadline);
        assertThat(dto.isDone()).isTrue();
        assertThat(dto.getId()).isEqualTo(1L);
    }

    @Test
    public void shouldThrowException_WhenTodoToUpdateDoesNotExists() {
        // given
        TodoUpdateDTO updateDTO = new TodoUpdateDTO();
        given(todoRepository.findById(anyLong())).willReturn(Optional.empty());

        // when + then
        assertThatExceptionOfType(Exception.class)
                .isThrownBy(() -> service.updateTodo(updateDTO, 1L))
                .withMessageContaining("does not exist");
    }
}