package com.giannijin.TalentForce.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.giannijin.TalentForce.model.enums.ContractType;
import com.giannijin.TalentForce.model.enums.EmploymentStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

/* @JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "employeeId"
) */
@Entity
@Table(name = "tbl_employee")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("employeeId")
    @Column(name = "employeeId")
    private Long employeeId;

    @NotBlank(message = "First name should not be null")
    @Column(name = "first_name")
    private String firstName;

    @NotBlank(message = "Last name should not be null")
    @Column(name = "last_name")
    private String lastName;

    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 65, message = "Age must not exceed 65")
    @Column(name = "age")
    private Long age = 0L;

    @Column(name = "gender")
    @Pattern(regexp = "^(M|F)$", message = "Invalid gender, insert 'M' for male, and 'F' for female")
    private String gender;

    @NotBlank(message = "Location should not be null")
    @Column(name = "location")
    private String location;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email should not be null")
    @Column(name = "email")
    private String email;

    @Min(value = 0, message = "Leave days left cannot be negative")
    @Column(name = "leave_days_left")
    private Integer leaveDaysLeft = 0;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Contract type should not be null")
    @Column(name = "contract_type")
    private ContractType contractType;

    @DecimalMin(value = "0.0", inclusive = false, message = "Salary must be greater than zero")
    @Digits(integer = 10, fraction = 2, message = "Salary must be a valid monetary amount")
    @Column(name = "salary")
    private BigDecimal salary = BigDecimal.ZERO;

    @NotBlank(message = "Hire date should not be null")
    @Pattern(
            regexp = "^(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
            message = "Hire date must be in the format YYYY-MM-DD"
    )
    @Column(name = "hire_date")
    private String hireDate;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Employment status should not be null")
    @Column(name = "employment_status")
    private EmploymentStatus employmentStatus;


    @Column(name = "phone_number")
    @Pattern(regexp = "^\\+?[0-9]{7,15}$", message = "Invalid phone number format")
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "department_id")
    @JsonBackReference
    private Department department;

    public void setDepartment(Department department) {
        if (department == null) {
            if (this.department != null) {
                this.department.getEmployees().remove(this);
            }
        } else {
            department.getEmployees().add(this);
        }
        this.department = department;
    }
}
