package com.emp_task.emp_task.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeErrorResponse {
    private String message;
    private long timestamp;

    public EmployeeErrorResponse(String message, long timestamp) {
        this.message = message;
        this.timestamp = timestamp;
    }

}
