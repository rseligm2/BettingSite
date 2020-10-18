const url = 'http://localhost:3001'

const register = (username, password) => {
    return fetch(url + '/api/register', {
        crossDomain:true,
        method: 'POST',
        body: JSON.stringify({username: username, password: password}),
        headers: {
          'Content-Type': 'application/json'
        }
    });
  };
  
  const login = (username, password) => {
    return fetch(url + '/api/authenticate', {
            crossDomain:true,
            method: 'POST',
            body: JSON.stringify({username: username, password: password}),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(res => res.json())
        .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
      });
  };
  
  const logout = () => {
    localStorage.removeItem("user");
  };
  
  export default {
    register,
    login,
    logout,
  };