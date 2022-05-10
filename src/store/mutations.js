const setMockData = (state, mockData) => {
  state.staff = mockData;
};

const setPopupActivity = (state, setActivity) => {
  state.popup.isActive = setActivity;
};

const handleAddingNewEmployee = (state, newEmployee) => {
  state.staff.push(newEmployee);
};

export default {
  setMockData,
  setPopupActivity,
  handleAddingNewEmployee,
};
