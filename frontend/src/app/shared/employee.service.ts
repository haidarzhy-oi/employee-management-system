import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  IEmployee,
  IGetEmployeesRequest,
  IGetEmployeesResponse,
} from "./interfaces";

@Injectable({ providedIn: "root" })
export class EmployeeService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getEmployees(args: IGetEmployeesRequest): Observable<IGetEmployeesResponse> {
    // const employees: IEmployee[] = [
    //   {
    //     firstName: "John",
    //     id: 1,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jane",
    //     id: 2,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jim",
    //     id: 3,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jill",
    //     id: 4,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jack",
    //     id: 5,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jenny",
    //     id: 6,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Joe",
    //     id: 7,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jen",
    //     id: 8,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jerry",
    //     id: 9,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jasmine",
    //     id: 10,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jasper",
    //     id: 11,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jared",
    //     id: 12,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jesse",
    //     id: 13,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jenny",
    //     id: 14,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jen",
    //     id: 15,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jerry",
    //     id: 16,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jasmine",
    //     id: 17,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jasper",
    //     id: 18,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jared",
    //     id: 19,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jesse",
    //     id: 20,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jenny",
    //     id: 21,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jen",
    //     id: 22,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jerry",
    //     id: 23,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jasmine",
    //     id: 24,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jasper",
    //     id: 25,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jared",
    //     id: 26,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jesse",
    //     id: 27,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jenny",
    //     id: 28,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jen",
    //     id: 29,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jerry",
    //     id: 30,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jasmine",
    //     id: 31,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jasper",
    //     id: 32,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    //   {
    //     firstName: "Jared",
    //     id: 33,
    //     jobTitle: "Software Developer",
    //     lastName: "Doe",
    //     salary: 120000,
    //   },
    // ];

    const employees = new BehaviorSubject<IGetEmployeesResponse>({
      list: [],
      total: 0,
      _embedded: {employeeList:[]}
    });

    this.http.get<IGetEmployeesResponse>("http://localhost:8080/employees").subscribe({
      next: (response: IGetEmployeesResponse) => {
        employees.next({
          list: response['_embedded']['employeeList'].slice(args.skip, args.skip + args.limit),
          total: response['_embedded']['employeeList'].length,
          _embedded: {
            employeeList: response['_embedded']['employeeList']
          }
        });
      },
      error: (error) => {
        employees.error(error);
      },
    });
    return employees
  }

  editEmployee(employee: IEmployee): Observable<Object> {
    console.log("Edit employee: ", employee);
     return this.http.put(`http://localhost:8080/employees/${employee.id}`, employee);
  }

  deleteEmployee(employee: IEmployee): Observable<Object> {
    console.log("Delete employee: ", employee);
    return this.http.delete(`http://localhost:8080/employees/${employee.id}`);
  }

  createEmployee(employee: IEmployee): Observable<Object> {
    console.log("Create employee: ", employee);
    return this.http.post("http://localhost:8080/employees", employee);
  }
}
