import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

const usersKey = 'contacts-app';
const usersJSON = localStorage.getItem(usersKey);
let users: any[] = usersJSON ? JSON.parse(usersJSON) : [{
  id: 1,
  firstName: 'Juan Camilo',
  lastName: 'Vargas',
  telephone: '555-555-444',
  address: 'Fake address 45',
  email: 'jcamilo@gmail.com',
  birthDate: '11/05/1980',
  age: 42
}];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users') && method === 'GET':
            return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
            return getUserById();
        case url.endsWith('/users') && method === 'POST':
            return createUser();
        case url.match(/\/users\/\d+$/) && method === 'PUT':
            return updateUser();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
            return deleteUser();
        default:
            return next.handle(request);
      }    
    }

    function getUsers() {
      return ok(users.map(x => basicDetails(x)));
    }

    function getUserById() {
      const user = users.find(x => x.id === idFromUrl());
      return ok(basicDetails(user));
    }

    function createUser() {
      const user = body;

      if (users.find(x => x.email === user.email)) {
          return error(`El usuario con el correo electrónico ${user.email} ya existe`);
      }

      user.id = newUserId();
      users.push(user);
      localStorage.setItem(usersKey, JSON.stringify(users));

      return ok();
    }

    function updateUser() {
      let params = body;
      let user = users.find(x => x.id === idFromUrl());

      if (params.email !== user.email && users.find(x => x.email === params.email)) {
          return error(`El usuario con el correo electrónico ${params.email} ya existe`);
      }

      Object.assign(user, params);
      localStorage.setItem(usersKey, JSON.stringify(users));

      return ok();
    }

    function deleteUser() {
      users = users.filter(x => x.id !== idFromUrl());
      localStorage.setItem(usersKey, JSON.stringify(users));
      return ok();
    }

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
        .pipe(delay(500));
    }

    function error(message: any) {
      return throwError({ error: { message } })
        .pipe(materialize(), delay(500), dematerialize()); 
    }

    function basicDetails(user: any) {
      const { id, firstName, lastName, telephone, address, email, birthDate, age } = user;
      return { id, firstName, lastName, telephone, address, email, birthDate, age };
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function newUserId() {
      return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
    }
  }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};