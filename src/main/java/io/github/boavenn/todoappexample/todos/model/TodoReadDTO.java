package io.github.boavenn.todoappexample.todos.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.Date;

@Getter
public class TodoReadDTO
{
    private long id;
    private String description;
    private boolean isDone;
    private Date deadline;

    public static TodoReadDTO from(Todo todo) {
        return new TodoReadDTO(todo);
    }

    private TodoReadDTO(Todo source) {
        id = source.getId();
        description = source.getDescription();
        isDone = source.isDone();
        deadline = source.getDeadline();
    }

    @JsonProperty("isDone")
    public boolean isDone() {
        return isDone;
    }
}
