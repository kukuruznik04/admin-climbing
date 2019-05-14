import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import StaticPage from '../classes/static-page';

@Injectable()
export class NewsService {

    constructor(private http: HttpClient) { }

    get(slug: string) {
      return this.http.get('http://192.241.156.153:8000/api/v1/news/' + slug + '/');
    }

    list() {
      return this.http.get('http://192.241.156.153:8000/api/v1/news/');
    }

    post(body) {
        return this.http.post('http://192.241.156.153:8000/api/v1/news/', body);
    }

    update(slug: string, body) {
        return this.http.put('http://192.241.156.153:8000/api/v1/news/' + slug + '/', body);
    }

    delete(id: string) {
        return this.http.delete('http://192.241.156.153:8000/api/v1/news/' + id + '/');
    }
}
