import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*-------------*/
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomImageService {
  private apiUrl = 'https://api.api-ninjas.com/v1/randomimage?category=';
  private apiKey = 'pM8TlOj4uBzb5L7pQyhpDg==Q8GxVXPrwDh03Nh3';

  constructor(private http: HttpClient) {}

  fetchImage(category: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey,
      Accept: 'image/jpg',
    });

    return this.http.get(this.apiUrl + category, {
      headers,
      responseType: 'blob',
    });
  }
}
