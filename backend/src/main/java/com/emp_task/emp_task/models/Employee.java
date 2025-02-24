package com.emp_task.emp_task.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty
    @Size(min = 2, max = 100, message = "First name should not be empty ")
    @Column(name = "first_name")
    private String firstName;

    @NotEmpty
    @Size(min = 2, max = 100, message = "Last name should not be empty ")
    @Column(name = "last_name")
    private String lastName;

    @NotEmpty
    @Size(min = 2, max = 100, message = "Job title should not be empty ")
    @Column(name = "job_title")
    private String jobTitle;

    @NotNull(message = "Salary should not be empty")
    @Positive
    @Min(0)
    @Max(1000000)
    @Column(name = "salary")
    private int salary;

public  Employee(String firstName, String lastName, String jobTitle, int salary){
    this.firstName = firstName;
    this.lastName = lastName;
    this.jobTitle = jobTitle;
    this.salary = salary;
}


}
