package com.giannijin.TalentForce.controller;

import com.giannijin.TalentForce.model.Employee;
import com.giannijin.TalentForce.dto.DepartmentDTO;
import com.giannijin.TalentForce.model.Department;
import com.giannijin.TalentForce.service.DepartmentService;
import com.giannijin.TalentForce.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/departments")
public class DepartmentApiController {

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private EmployeeService employeeService;

    private DepartmentDTO mapToDTO(Department department) {
        DepartmentDTO dto = new DepartmentDTO();
        dto.setDepartmentId(department.getDepartmentId());
        dto.setName(department.getName());
        dto.setEmployeeIds(department.getEmployees().stream().map(Employee::getEmployeeId).collect(Collectors.toList()));
        return dto;
    }

    @GetMapping
    public List<DepartmentDTO> getDepartments(){
        List<Department> departments = departmentService.getDepartments();
        return departments.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public DepartmentDTO getDepartment (@PathVariable Long id) {
        Department department = departmentService.getSingleDepartment(id);
        return mapToDTO(department);
    }

    @DeleteMapping("/{id}")
    public void deleteDepartment (@PathVariable Long id){
        Department department = departmentService.getSingleDepartment(id);
        List<Employee> employees = department.getEmployees();

        for (Employee employee : employees) {
            employeeService.deleteEmployee(employee.getEmployeeId());
        }

        departmentService.deleteDepartment(id);
    }

    @PostMapping
    public ResponseEntity<Department> saveDepartment (@RequestBody DepartmentDTO departmentDTO){
        Department department = new Department();
        department.setName(departmentDTO.getName());

        List<Employee> employees = departmentDTO.getEmployeeIds().stream()
                .map(employeeService::getSingleEmployee)
                .toList();

        employees.forEach(department::addEmployee);

        department = departmentService.saveDepartment(department);

        return new ResponseEntity<Department>(department, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public DepartmentDTO updateDepartment (@PathVariable Long id, @RequestBody DepartmentDTO departmentDTO){
        Department existingDepartment = departmentService.getSingleDepartment(id);

        existingDepartment.setName(departmentDTO.getName());

        List<Employee> employees = departmentDTO.getEmployeeIds().stream()
                .map(employeeService::getSingleEmployee)
                .toList();

        employees.forEach(existingDepartment::addEmployee);

        Department updatedDepartment = departmentService.updateDepartment(existingDepartment);

        return mapToDTO(updatedDepartment);
    }

    @GetMapping("/{departmentId}/employees")
    public List<Employee> getEmployeesByDepartment(@PathVariable Long departmentId) {
        return employeeService.findEmployeesByDepartmentId(departmentId);
    }
}