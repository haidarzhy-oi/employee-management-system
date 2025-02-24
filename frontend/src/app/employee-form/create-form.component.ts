import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { EmployeeService } from "../shared/employee.service";
import { MessageService } from "primeng/api";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "empl-create-form",
  templateUrl: "./create-form.component.html",
  imports: [CommonModule, TableModule, ButtonModule, ConfirmDialogModule, ToastModule, InputTextModule, InputGroupModule, InputGroupAddonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [MessageService]
})
export class CreateFormComponent implements OnInit {

  protected formGroup!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      jobTitle: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-Z ]+$'),
        ],
      ],
      salary: [
        undefined,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(1000000),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  createEmployee(): void {
    if (this.formGroup.controls['firstName'].invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'First name must be between 2 and 20 characters and only letters',
        life: 3000,
      });
      return;
    }

    if (this.formGroup.controls['lastName'].invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Last name must be between 2 and 20 characters and only letters',
        life: 3000,
      });
      return;
    }

    if (this.formGroup.controls['jobTitle'].invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Job title must be between 2 and 20 characters and only letters',
        life: 3000,
      });
      return;
    }

    if (this.formGroup.controls['salary'].invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Salary must be between 0 and 1,000,000 and a numbe',
        life: 3000,
      });
      return;
    }

    this.employeeService.createEmployee(this.formGroup.value).subscribe(
      () => {
        console.log('Employee created');
        this.messageService.add({ severity: 'info', summary: 'Confirmed', sticky: true, detail: `You have created employee ${this.formGroup.value.firstName} ${this.formGroup.value.lastName}` });
        this.formGroup.reset();
        this.router.navigate(['/list']);
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error creating employee',
          life: 3000,
        });
      }
    );
  }
}
