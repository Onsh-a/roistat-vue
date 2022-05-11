const setMockData = (state, mockData) => {
  if (mockData) {
    localStorage.setItem('mockData', JSON.stringify(mockData));
    state.staff = mockData;
  } else {
    state.staff = JSON.parse(localStorage.getItem('mockData'));
  }
};

const setPopupActivity = (state, setActivity) => {
  state.popup.isActive = setActivity;
};

const sortByName = (state, isAscending, staff = state.staff) => {
  const sortFn = (mode) => {
    if (mode) return (a, b) => a.name.localeCompare(b.name);
    return (a, b) => b.name.localeCompare(a.name);
  };
  const recursion = (data) => {
    data.sort(sortFn(isAscending));
    data.forEach((item) => {
      item.subordinates.sort(sortFn(isAscending));
      recursion(item.subordinates);
    });
  };

  return recursion(staff);
};

const handleAddingNewEmployee = (state, newEmployee) => {
  if (!newEmployee.chiefId) state.staff.push(newEmployee);

  const recursion = (data) => {
    // eslint-disable-next-line consistent-return
    data.forEach((item) => {
      if (item.id === newEmployee.chiefId) return item.subordinates.push(newEmployee);
      recursion(item.subordinates);
    });
  };

  recursion(state.staff);
  localStorage.setItem('mockData', JSON.stringify(state.staff));
};

export default {
  setMockData,
  setPopupActivity,
  handleAddingNewEmployee,
  sortByName,
};
