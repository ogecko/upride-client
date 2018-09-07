const moduleDriver = {
    state: {
      code: '',
      name: '',
      mobile: '',
      email: '',
    },
    mutations: {
      setDriver: (state, driver) => {
        state.code = driver.code;
        state.name = driver.name;
        state.mobile = driver.mobile;
        state.email = driver.email;
      }
    }
};

export default moduleDriver;

