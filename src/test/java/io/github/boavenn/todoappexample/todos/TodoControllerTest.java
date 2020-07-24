package io.github.boavenn.todoappexample.todos;

import io.github.boavenn.todoappexample.todos.model.Todo;
import io.github.boavenn.todoappexample.todos.model.TodoReadDTO;
import io.github.boavenn.todoappexample.todos.model.TodoUpdateDTO;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.TimeZone;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TodoController.class)
class TodoControllerTest
{
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TodoService todoService;

    @Test
    public void GET_ShouldReturnAllTodos() throws Exception {
        // given
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
        calendar.set(2020, Calendar.MARCH, 2, 13, 30);
        Date deadline = calendar.getTime();

        Todo todo = new Todo();
        todo.setId(1L);
        todo.setDescription("text");
        todo.setDeadline(deadline);

        given(todoService.getAll()).willReturn(Collections.singletonList(TodoReadDTO.from(todo)));

        // when
        RequestBuilder request = get("/api/todos");

        // then
        mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].description").value("text"))
                .andExpect(jsonPath("$[0].isDone").value(false))
                .andExpect(jsonPath("$[0].deadline").value("02-03-2020 13:30"));

        verify(todoService, times(1)).getAll();
    }

    @Test
    public void POST_ShouldReturnCorrectJson_WhenValidTodoIsGivenWithDescriptionOnly() throws Exception {
        // given
        given(todoService.addTodo(any(Todo.class))).willAnswer(invocation -> {
            Todo todo = invocation.getArgument(0);
            todo.setId(1);
            return TodoReadDTO.from(todo);
        });

        // when
        JSONObject json = new JSONObject();
        json.put("description", "test");

        RequestBuilder request = post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json.toString());

        // then
        mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.description").value("test"))
                .andExpect(jsonPath("$.isDone").value(false))
                .andExpect(jsonPath("$.deadline").doesNotExist());

        verify(todoService, times(1)).addTodo(any(Todo.class));
    }

    @Test
    public void POST_ShouldReturnCorrectJson_WhenValidTodoIsGivenWithDescriptionAndDeadline() throws Exception {
        // given
        given(todoService.addTodo(any(Todo.class))).willAnswer(invocation -> {
            Todo todo = invocation.getArgument(0);
            todo.setId(1);
            return TodoReadDTO.from(todo);
        });

        // when
        JSONObject json = new JSONObject();
        json.put("description", "test");
        json.put("deadline", "24-07-2020 23:59");

        RequestBuilder request = post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json.toString());

        // then
        mockMvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.description").value("test"))
                .andExpect(jsonPath("$.isDone").value(false))
                .andExpect(jsonPath("$.deadline").value("24-07-2020 23:59"));

        verify(todoService, times(1)).addTodo(any(Todo.class));
    }

    @Test
    public void POST_ShouldThrowMethodArgumentNotValidException_WhenInvalidDescriptionIsGiven() throws Exception {
        // when
        JSONObject json = new JSONObject();
        json.put("description", " ");

        RequestBuilder request = post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json.toString());

        // then
        mockMvc.perform(request)
                .andExpect(status().isBadRequest())
                .andExpect(result -> {
                    Exception exception = result.getResolvedException();
                    assertThat(exception).isNotNull();
                    assertThat(exception).isInstanceOf(MethodArgumentNotValidException.class);
                    var ex = (MethodArgumentNotValidException) exception;
                    var fieldError = ex.getBindingResult().getFieldError();
                    assertThat(fieldError).isNotNull();
                    assertThat(fieldError.getDefaultMessage()).contains("Description length must be");
                });
    }

    @Test
    public void POST_ShouldThrowMethodArgumentNotValidException_WhenNoDescriptionIsGiven() throws Exception {
        // when
        JSONObject json = new JSONObject();
        json.put("deadline", "02-02-2020 13:30");

        RequestBuilder request = post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json.toString());

        // then
        mockMvc.perform(request)
                .andExpect(status().isBadRequest())
                .andExpect(result -> {
                    Exception exception = result.getResolvedException();
                    assertThat(exception).isNotNull();
                    assertThat(exception).isInstanceOf(MethodArgumentNotValidException.class);
                    var ex = (MethodArgumentNotValidException) exception;
                    var fieldError = ex.getBindingResult().getFieldError();
                    assertThat(fieldError).isNotNull();
                    assertThat(fieldError.getDefaultMessage()).contains("cannot be blank");
                });
    }

    @Test
    public void POST_ShouldThrowHttpMessageNotReadableException_WhenEmptyBodyIsGiven() throws Exception {
        // when
        RequestBuilder request = post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content("");

        // then
        mockMvc.perform(request)
                .andExpect(status().isBadRequest())
                .andExpect(result -> assertThat(result.getResolvedException())
                        .isInstanceOf(HttpMessageNotReadableException.class));
    }

    @Test
    public void PATCH_ShouldReturnCorrectJson_WhenValidBodyIsGiven() throws Exception {
        // given
        Todo todo = new Todo();
        todo.setId(1L);
        todo.setDescription("beforeUpdate");

        given(todoService.updateTodo(any(TodoUpdateDTO.class), anyLong())).willAnswer(invocation -> {
            TodoUpdateDTO dto = invocation.getArgument(0);
            dto.applyChangesTo(todo);
            return TodoReadDTO.from(todo);
        });

        // when
        JSONObject json = new JSONObject();
        json.put("description", "afterUpdate");
        json.put("deadline", "02-02-2020 13:30");
        json.put("isDone", true);

        RequestBuilder request = patch("/api/todos/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json.toString());

        // then
        mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.description").value("afterUpdate"))
                .andExpect(jsonPath("$.isDone").value(true))
                .andExpect(jsonPath("$.deadline").value("02-02-2020 13:30"));
    }

    @Test
    public void PATCH_ShouldThrowMethodArgumentNotValidException_WhenInvalidDescriptionIsGiven() throws Exception {
        // when
        JSONObject json = new JSONObject();
        json.put("description", " ");

        RequestBuilder request = patch("/api/todos/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json.toString());

        // then
        mockMvc.perform(request)
                .andExpect(status().isBadRequest())
                .andExpect(result -> {
                    Exception exception = result.getResolvedException();
                    assertThat(exception).isNotNull();
                    assertThat(exception).isInstanceOf(MethodArgumentNotValidException.class);
                    var ex = (MethodArgumentNotValidException) exception;
                    var fieldError = ex.getBindingResult().getFieldError();
                    assertThat(fieldError).isNotNull();
                    assertThat(fieldError.getDefaultMessage()).contains("Description length must be");
                });
    }

    @Test
    public void PATCH_ShouldThrowHttpMessageNotReadableException_WhenEmptyBodyIsGiven() throws Exception {
        // when
        RequestBuilder request = patch("/api/todos/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("");

        // then
        mockMvc.perform(request)
                .andExpect(status().isBadRequest())
                .andExpect(result -> assertThat(result.getResolvedException())
                        .isInstanceOf(HttpMessageNotReadableException.class));
    }
}