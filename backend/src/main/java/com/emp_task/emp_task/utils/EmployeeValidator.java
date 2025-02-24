package com.emp_task.emp_task.utils;

import com.emp_task.emp_task.dto.EmployeeDTO;
import com.emp_task.emp_task.models.Employee;
import com.emp_task.emp_task.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class EmployeeValidator implements Validator {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeValidator(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return Employee.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        EmployeeDTO employee = (EmployeeDTO) target;
        if (employee.getId()!=null) {
            if (employeeService.existById(employee.getId())) {
                errors.rejectValue("id", "id", "Employee with this id already exists");
            }
        }
    }
}
