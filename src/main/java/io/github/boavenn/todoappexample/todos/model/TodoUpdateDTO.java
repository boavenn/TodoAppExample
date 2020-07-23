package io.github.boavenn.todoappexample.todos.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.Date;

@Setter
@NoArgsConstructor
public class TodoUpdateDTO
{
    @Length(min = 1, max = 80, message = "Description length must be between {min} and {max} characters long")
    private String description;
    private boolean isDone;
    private Date deadline;

    public void applyChangesTo(Todo todo) {
        if (description != null) {
            todo.setDescription(description);
        }
        todo.setDone(isDone);
        if (deadline != null) {
            todo.setDeadline(deadline);
        }
    }

    @JsonProperty("isDone")
    public void setDone(boolean done) {
        isDone = done;
    }

    public void setDescription(String description) {
        this.description = description.trim();
    }
}
