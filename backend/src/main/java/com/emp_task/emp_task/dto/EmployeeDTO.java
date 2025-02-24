package com.emp_task.emp_task.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import lombok.Data;


@Data
public class EmployeeDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotEmpty
    @Size(min = 2, max = 100, message = "First name should not be empty ")
    private String firstName;
    @NotEmpty
    @Size(min = 2, max = 100, message = "First name should not be empty ")
    private String lastName;
    @NotEmpty
    @Size(min = 2, max = 100, message = "First name should not be empty ")
    private String jobTitle;

    @NotNull(message = "Salary should not be empty")
    @Positive
    @Min(0)
    @Max(1000000)
    private int salary;

}
