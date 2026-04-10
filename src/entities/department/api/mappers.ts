import { Department, Departments } from '../model/types';
import { DepartmentResponse, DepartmentsResponse } from './types';

const mapDepartment = (resource: DepartmentResponse): Department => ({
  id: resource.data.id,
  ...resource.data.attributes
});

const mapDepartments = (collection: DepartmentsResponse): Departments =>
  collection.data.map((data) => ({
    id: data.id,
    ...data.attributes
  }));

export {
  mapDepartment,
  mapDepartments,
};
