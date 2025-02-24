package com.emp_task.emp_task.services;

import com.emp_task.emp_task.dto.EmployeeDTO;
import com.emp_task.emp_task.exceptions.NotFoundException;
import com.emp_task.emp_task.models.Employee;
import com.emp_task.emp_task.repositories.EmployeeRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = false)
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee findById(long id) throws NotFoundException {
        return employeeRepository.findById(id).orElseThrow(
                () -> new NotFoundException("")
        );
    }

    public List<Employee> findAllEmployees() {
        return employeeRepository.findAll();
    }

    public List<Optional<Employee>> findByFirstName(String firstName) {
        return employeeRepository.findByFirstName(firstName);
    }

    public List<Employee> findByJobTitle(String firstName) {
        return employeeRepository.findByJobTitle(firstName);
    }

    public boolean existById(long id) {
        return employeeRepository.existsById(id);
    }

    @Transactional
    public void editEmployee(long id, EmployeeDTO newEmployee) throws NotFoundException {
        Employee employee = findById(id);
        employee.setFirstName(newEmployee.getFirstName());
        employee.setLastName(newEmployee.getLastName());
        employee.setJobTitle(newEmployee.getJobTitle());
        employee.setSalary(newEmployee.getSalary());
        employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(long id) throws NotFoundException {
        Employee employee = findById(id);
        employeeRepository.delete(employee);
    }

    @Transactional
    public Employee saveEmployee(@Valid EmployeeDTO employeeDTO) {
        Employee employee = new Employee(employeeDTO.getFirstName(), employeeDTO.getLastName(), employeeDTO.getJobTitle(), employeeDTO.getSalary());
        return employeeRepository.save(employee);

    }
}
