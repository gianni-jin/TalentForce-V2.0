package com.giannijin.TalentForce.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {
    private Long employeeId;
    private String firstName;
    private String lastName;
    private Long age;
    private String gender;
    private String location;
    private String email;
    private Integer leaveDaysLeft;
    private String contractType;
    private BigDecimal salary;
    private String hireDate;
    private String employmentStatus;
    private String phoneNumber;
    private DepartmentDTO department;
}
