package com.emp_task.emp_task.components;

import com.emp_task.emp_task.controllers.EmployeeController;
import com.emp_task.emp_task.exceptions.NotFoundException;
import com.emp_task.emp_task.models.Employee;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class EmployeeModelAssembler implements RepresentationModelAssembler<Employee, EntityModel<Employee>> {

    @Override
    public EntityModel<Employee> toModel(Employee employee) {
        try {
            return EntityModel.of(employee,
                    linkTo(methodOn(EmployeeController.class).employeeDetails(employee.getId())).withSelfRel(),
                    linkTo(methodOn(EmployeeController.class).findEmployees()).withRel("employees"));
        } catch ( NotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
