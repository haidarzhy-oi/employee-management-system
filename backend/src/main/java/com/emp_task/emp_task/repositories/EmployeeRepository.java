package com.emp_task.emp_task.repositories;

import com.emp_task.emp_task.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Optional<Employee>> findByFirstName(String firstName);

    List<Employee> findByJobTitle(String jobTitle);
}
