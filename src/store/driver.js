const moduleDriver = {
    state: {
      code: '',
      name: '',
    },
    mutations: {
      setDriver: (state, driver) => {
        state.code = driver.code;
        state.name = driver.name;
      }
    }
};

export default moduleDriver;

