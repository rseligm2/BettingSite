const url = 'http://localhost:3001'

const register = (username, password) => {
    const fetchPromise = fetch(url + '/api/register', {
        crossDomain:true,
        method: 'POST',
        body: JSON.stringify({username: username, password: password}),
        headers: {
          'Content-Type': 'application/json'
        }
    });
    console.log(fetchPromise)
    return fetchPromise
  };
  
  const login = (username, password) => {
    const fetchPromise = fetch(url + '/api/authenticate', {
            crossDomain:true,
            method: 'POST',
            body: JSON.stringify({username: username, password: password}),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        console.log(fetchPromise)
        return fetchPromise
  };
  
  const logout = () => {
    localStorage.removeItem("user");
  };
  
  export default {
    register,
    login,
    logout,
  };