import config from '../../config';

const signInService = (email, password, remember = false) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email: email, password: password})
  };
  return new Promise((resolve, reject) => {
    fetch(`${config.apiUrl}/auth/login`, requestOptions)
      .then(handleResponse)
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (!remember) {
          sessionStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.setItem('user', JSON.stringify(user));
        }
        return resolve(user);
      })
      .catch(e => {
        const error = e.toString();
        reject(error === 'TypeError: Failed to fetch' ? 'Network Error' : error);
      });
  })
};

function signOutService() {
  // remove user from local/Session storage to log user out
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        signOutService();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export const userService = {
  signInService,
  signOutService
};
