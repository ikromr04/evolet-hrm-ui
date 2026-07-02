import { Filter, Row } from '../model/types';

const filterRows = (rows: Row[], filter: Filter): Row[] => {
  rows = rows.filter((row) => {
    const roleIds = row.roles.map((role) => role.id);
    const positionIds = row.positions.map((position) => position.id);
    const departmentIds = row.departments.map((department) => department.id);

    return (filter.keyword ? Object.values(row).join(' ').toLowerCase().includes(filter.keyword.toLowerCase()) : true)
      && `${row.surname} ${row.name} ${row.patronymic ?? ''}`.toLowerCase().includes((filter.name || '').toLowerCase())
      && (filter.email ? (row.email?.includes(filter.email || '')) : true)
      && (filter.sex ? (row.profile?.sex === filter.sex) : true)
      && (filter.nationality ? (row.profile?.nationality?.toLowerCase().includes(filter.nationality.toLowerCase())) : true)
      && (filter.citizenship ? (row.profile?.citizenship?.toLowerCase().includes(filter.citizenship.toLowerCase())) : true)
      && (filter.address ? (row.profile?.address?.toLowerCase().includes(filter.address.toLowerCase())) : true)
      && (filter.tel ? (`${row.profile?.tel1 || ''}${row.profile?.tel2 || ''}`.toLowerCase().includes(filter.tel.toLowerCase())) : true)
      && (filter.familyStatus ? (row.profile?.familyStatus === filter.familyStatus) : true)
      && (filter.roles.length ? (filter.roles.some((id) => roleIds.includes(id))) : true)
      && (filter.positions.length ? (filter.positions.some((id) => positionIds.includes(id))) : true)
      && (filter.departments.length ? (filter.departments.some((id) => departmentIds.includes(id))) : true);
  });

  return rows;
};

export { filterRows };
