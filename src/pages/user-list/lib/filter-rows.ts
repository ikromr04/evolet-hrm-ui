import { Filter } from '../model/types';
import { Row } from '../ui/columns';

const filterRows = (rows: Row[], filter: Filter): Row[] => {
  rows = rows.filter((user) => {
    const roleIds = user.roles.map((role) => role.id);
    const positionIds = user.positions.map((position) => position.id);
    const departmentIds = user.departments.map((department) => department.id);

    return (filter.keyword ? Object.values(user).join(' ').toLowerCase().includes(filter.keyword.toLowerCase()) : true)
      && `${user.surname} ${user.name} ${user.patronymic ?? ''}`.toLowerCase().includes((filter.name || '').toLowerCase())
      && (filter.email ? (user.email?.includes(filter.email || '')) : true)
      && (filter.sex ? (user.profile?.sex === filter.sex) : true)
      && (filter.nationality ? (user.profile?.nationality?.toLowerCase().includes(filter.nationality.toLowerCase())) : true)
      && (filter.citizenship ? (user.profile?.citizenship?.toLowerCase().includes(filter.citizenship.toLowerCase())) : true)
      && (filter.address ? (user.profile?.address?.toLowerCase().includes(filter.address.toLowerCase())) : true)
      && (filter.tel ? (`${user.profile?.tel1 || ''}${user.profile?.tel2 || ''}`.toLowerCase().includes(filter.tel.toLowerCase())) : true)
      && (filter.familyStatus ? (user.profile?.familyStatus === filter.familyStatus) : true)
      && (filter.roles.length ? (filter.roles.some((id) => roleIds.includes(id))) : true)
      && (filter.positions.length ? (filter.positions.some((id) => positionIds.includes(id))) : true)
      && (filter.departments.length ? (filter.departments.some((id) => departmentIds.includes(id))) : true);
  });

  return rows;
};

export { filterRows };
