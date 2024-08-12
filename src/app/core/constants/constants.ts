export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiurl = 'http://localhost:3000';

export const apiEndpoint = {
  AuthEndpoint: {
    create: `${apiurl}/users/create`,
    login: `${apiurl}/users/login`,
    logout: `${apiurl}/logout`,
    loggedUser: `${apiurl}/user`,
  },
  TodoEndpoint: {
    getAllTodo: `${apiurl}/tasks`,
    addTodo: `${apiurl}/tasks/create`,
    updateTodo: `${apiurl}/tasks/update`,
    deleteTodo: `${apiurl}/tasks/delete`,
  },
};
