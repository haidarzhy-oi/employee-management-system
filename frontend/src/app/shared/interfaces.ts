export interface IEmployee {
  id?: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  salary: number;
}

export interface IGetEmployeesRequest {
  skip: number;
  limit: number;
}

export interface IGetEmployeesResponse {
  list: IEmployee[];
  total: number;
  _embedded: { employeeList: Array<IEmployee>};
}
