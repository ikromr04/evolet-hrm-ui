const getEquipmentsStatus = (state: RootState) => state.equipment.equipments.status;

const getEquipments = (state: RootState) => state.equipment.equipments.data;

export {
  getEquipmentsStatus,
  getEquipments,
};
