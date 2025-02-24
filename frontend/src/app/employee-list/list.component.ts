import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, inject, OnInit, ViewChild } from "@angular/core";
import { IEmployee, IGetEmployeesRequest, IGetEmployeesResponse } from "../shared/interfaces";
import { EmployeeService } from "../shared/employee.service";
import { Table, TableFilterEvent, TableModule, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

@Component({
  selector: "empl-list",
  standalone: true,
  templateUrl: "./list.component.html",
  imports: [CommonModule, TagModule, TableModule, ButtonModule, ConfirmDialogModule, ToastModule, Dialog, InputTextModule, InputGroupModule, InputGroupAddonModule, FormsModule, ReactiveFormsModule, RouterModule, MultiSelectModule, SelectModule],
  providers: [ConfirmationService, MessageService]
})
export class ListComponent implements OnInit, AfterViewInit {

  @ViewChild("table") table!: Table;

  protected employees: IGetEmployeesResponse = { list: [], total: 0 , _embedded: {employeeList:[]}};
  protected visible: boolean = false;
  protected formGroup!: FormGroup;
  protected loading: boolean = false;
  protected first: number = 0;
  protected rows: number = 10;

  private employeeService: EmployeeService = inject(EmployeeService);
  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private messageService: MessageService = inject(MessageService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: 0,
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      jobTitle: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
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

    this.getEmployees({ skip: this.first, limit: this.rows });
  }

  ngAfterViewInit(): void {
    // this.tryUpdateTotalRecords();
  }

  editEmployee(employee: IEmployee): void {
    console.log("Edit employee: ", employee);

    this.formGroup.setValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      jobTitle: employee.jobTitle,
      salary: employee.salary,
    });
    this.visible = true;
  }

  deleteEmployee(employee: IEmployee): void {
    console.log("Delete employee: ", employee);

    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${employee.firstName} ${employee.lastName}?`,
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.employeeService.deleteEmployee(employee).subscribe(
          () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `You have deleted ${employee.firstName} ${employee.lastName}` });
            this.employees = { ...this.employees, list: this.employees!.list.filter((e: IEmployee) => e.id !== employee.id) };
          },
          (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error deleting employee',
              life: 3000,
            });
          }
        );
      }
    });
  }

  updateEmployee(): void {
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


    const updatedEmployee: IEmployee = this.formGroup.value;

    this.employeeService.editEmployee(updatedEmployee).subscribe(
      () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `You have updated ${updatedEmployee.firstName} ${updatedEmployee.lastName}` });
        this.employees.list = this.employees.list.map((e: IEmployee) => {
          if (e.id === updatedEmployee.id) {
            return updatedEmployee;
          }
          return e;
        });
        this.visible = false;
        this.formGroup.reset();
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error updating employee',
          life: 3000,
        });
      }
    );
  }

  cancelEditEmployee(): void {
    this.visible = false;
    this.formGroup.reset();
  }

  createEmployee(): void {
    this.router.navigate(["create-employee"]);
  }

  onPage(event: TablePageEvent): void {
    // this.tryUpdateTotalRecords();
    this.getEmployees({ skip: event.first, limit: event.rows });
  }

  filterCallback(event: TableFilterEvent): void {
    console.log("Filter: ", event);
  }

  onFilter(event: TableFilterEvent): void {
    console.log("Filter: ", event);
    this.employees.list = this.employees.list;
  }

  protected getEmployees(args: IGetEmployeesRequest): void {
    this.loading = true;
    this.employeeService.getEmployees(args).subscribe(
      (employees: IGetEmployeesResponse) => {
        this.employees = employees;
        // this.tryUpdateTotalRecords();
        this.loading = false;
        console.log("Employees: ", employees);
      },
      (error: any) => console.log(error)
    );
  }

  private tryUpdateTotalRecords(): void {
    if (this.table) {
      this.table.totalRecords = this.employees.total;
    }
  }
}
