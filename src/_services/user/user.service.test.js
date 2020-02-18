import faker from 'faker';
import {mockErrorResponse, mockSuccesfulResponse} from '../../_utils';
import {userService} from './user.service';

const id = faker.random.uuid();
const name = faker.name.firstName();
const email = faker.internet.email();
const password = faker.internet.password();
const successResponse = JSON.stringify({
  "user": {
    "id": id,
    "email": email,
    "name": name,
    "role": "admin"
  },
  "tokens": {
    "access": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNlNzk3NGYxZTIzZDI2ZmM2YTM1MzQiLCJpYXQiOjE1ODE5MjUyMTUsImV4cCI6MTU4MTkyNzAxNX0.gfAlQxGUPIS5ORdAzmgPiRamjd80Sa4kUMISSlkijxs",
      "expires": "2020-02-17T08:10:15.636Z"
    },
    "refresh": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNlNzk3NGYxZTIzZDI2ZmM2YTM1MzQiLCJpYXQiOjE1ODE5MjUyMTUsImV4cCI6MTU4NDUxNzIxNX0.amE9XfZEgUTDriSVxNtlIIb4spwaTHbT-v0CosGQR8Y",
      "expires": "2020-03-18T07:40:15.641Z"
    }
  }
});

const response401 = JSON.stringify({
  "code": 401,
  "message": "Incorrect email or password",
  "stack": "Error: Incorrect email or password"
});


describe('User Service', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    global.fetch.mockClear();
  });


  it('should return user when signInService is called with valid credentials', async () => {
    mockSuccesfulResponse(200, 'POST', successResponse);
    const response = await userService.signInService(email, password, false);
    expect(response).toBeInstanceOf(Object);
    expect(response).toEqual(JSON.parse(successResponse));
  });

  it('should save user in localStorage when remember is true', async () => {
    mockSuccesfulResponse(200, 'POST', successResponse);
    await userService.signInService(email, password, true);
    expect(localStorage.setItem).toHaveBeenLastCalledWith('user', successResponse);
    expect(localStorage.__STORE__['user']).toBe(successResponse);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  it('should save user in sessionStorage when remember is false', async () => {
    mockSuccesfulResponse(200, 'POST', successResponse);
    await userService.signInService(email, password, false);
    expect(sessionStorage.setItem).toHaveBeenLastCalledWith('user', successResponse);
    expect(sessionStorage.__STORE__['user']).toBe(successResponse);
    expect(Object.keys(sessionStorage.__STORE__).length).toBe(1);
  });

  it('should not authenticate when signInService is called with invalid credentials', () => {
    mockErrorResponse(401, 'POST', response401);
    userService.signInService(email, password, false)
      .then(res => {
        expect(res).toBeUndefined();
      })
      .catch(e => {
        expect(e).toEqual(JSON.parse(response401).message);
        expect(localStorage.removeItem).toHaveBeenLastCalledWith('user');
        expect(sessionStorage.removeItem).toHaveBeenLastCalledWith('user');
        expect(sessionStorage.__STORE__['user']).toBeUndefined();
      })
  });

});
