package com.emp_task.emp_task.controllers;

import com.emp_task.emp_task.components.EmployeeModelAssembler;
import com.emp_task.emp_task.dto.EmployeeDTO;
import com.emp_task.emp_task.models.Employee;
import com.emp_task.emp_task.exceptions.EmployeeErrorResponse;
import com.emp_task.emp_task.services.EmployeeService;
import com.emp_task.emp_task.utils.EmployeeValidator;
import com.emp_task.emp_task.exceptions.NotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/employees")
@ControllerAdvice
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeModelAssembler assembler;
    @Autowired
    private EmployeeValidator employeeValidator;

    @GetMapping
    public CollectionModel<EntityModel<Employee>> findEmployees() {
        List<EntityModel<Employee>> employees = employeeService.findAllEmployees().stream().map(employee -> assembler.toModel(employee)).collect(Collectors.toList());
        return CollectionModel.of(employees, linkTo(methodOn(EmployeeController.class).findEmployees()).withSelfRel());
    }

    @GetMapping("{id}")
    public EntityModel<Employee> employeeDetails(@PathVariable(value = "id") long id) throws NotFoundException {
        Employee employee = employeeService.findById(id);
        return assembler.toModel(employee);
    }

    @GetMapping("/search/first_name/{name}")
    public CollectionModel<EntityModel<Employee>> searchByFirstName(@PathVariable String name) {
        employeeService.findByFirstName(name);
        List<EntityModel<Employee>> employees = employeeService.findByFirstName(name).stream().map(employee -> assembler.toModel(employee.get())).collect(Collectors.toList());
        return CollectionModel.of(employees, linkTo(methodOn(EmployeeController.class).findEmployees()).withSelfRel());
    }

    @PostMapping
    public ResponseEntity<EntityModel<Employee>> createEmployee(@RequestBody @Valid EmployeeDTO employeeDTO, BindingResult bindingResult) {
        employeeValidator.validate(employeeDTO, bindingResult);
        EntityModel<Employee> entityModel = assembler.toModel(employeeService.saveEmployee(employeeDTO));

        return ResponseEntity.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(entityModel);
    }

    @PutMapping("{id}")
    public ResponseEntity<EntityModel<Employee>> updateEmployee(@PathVariable long id, @RequestBody EmployeeDTO updatedEmployee, BindingResult bindingResult) throws NotFoundException {
        employeeValidator.validate(updatedEmployee, bindingResult);

        employeeService.editEmployee(id, updatedEmployee);
        Employee employee = employeeService.findById(id);
        EntityModel<Employee> entityModel = assembler.toModel(employee);
        return ResponseEntity.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(entityModel);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<EntityModel<Employee>> deleteEmployee(@PathVariable long id) throws NotFoundException {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler
    public ResponseEntity<EmployeeErrorResponse> handleException(NotFoundException notFoundException) {
        EmployeeErrorResponse employeeErrorResponse = new EmployeeErrorResponse(
                "No employee was found",
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(employeeErrorResponse, HttpStatus.NOT_FOUND);

    }
}
