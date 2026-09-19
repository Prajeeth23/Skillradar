import { apiClient } from './client';
import { Employee } from '../types/employee';
import { MOCK_EMPLOYEES } from '../mock/employees';

export async function getEmployeesApi(department?: string): Promise<Employee[]> {
  try {
    const params = department ? { department } : {};
    const response = await apiClient.get<Employee[]>('/hr/employees', { params });
    return response.data;
  } catch (err) {
    console.warn('Backend unavailable, using mock employees');
    if (department) {
      return MOCK_EMPLOYEES.filter((e) => e.department.toLowerCase() === department.toLowerCase());
    }
    return MOCK_EMPLOYEES;
  }
}

export async function getEmployeeDetailApi(employeeId: string): Promise<Employee> {
  try {
    const response = await apiClient.get<Employee>(`/hr/employees/${employeeId}`);
    return response.data;
  } catch (err) {
    console.warn('Backend unavailable, using mock employee detail for:', employeeId);
    const found = MOCK_EMPLOYEES.find((e) => e.id === employeeId);
    if (found) return found;
    return MOCK_EMPLOYEES[0];
  }
}

export async function getMyProfileApi(): Promise<Employee> {
  try {
    const response = await apiClient.get<Employee>('/employees/me');
    return response.data;
  } catch (err) {
    return MOCK_EMPLOYEES[0]; // Marcus Vance
  }
}
