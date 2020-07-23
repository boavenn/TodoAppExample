package io.github.boavenn.todoappexample.todos.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "todos")
@Data
@NoArgsConstructor // for jackson
public class Todo implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "Todo description cannot be blank")
    @Length(min = 1, max = 80, message = "Description length must be between {min} and {max} characters long")
    private String description;

    @JsonProperty("isDone")
    private boolean isDone;
    private Date deadline;

    public static Todo from(Todo source) {
        return new Todo(source.description, source.isDone, source.deadline);
    }

    private Todo(String description, boolean isDone, Date deadline) {
        this.description = description;
        this.isDone = isDone;
        this.deadline = deadline;
    }

    public void setDescription(String description) {
        this.description = description.trim();
    }
}
