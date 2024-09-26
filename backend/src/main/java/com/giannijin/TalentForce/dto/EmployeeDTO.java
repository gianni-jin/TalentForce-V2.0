package com.giannijin.TalentForce.dto;

import lombok.*;

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
    private DepartmentDTO department;

}