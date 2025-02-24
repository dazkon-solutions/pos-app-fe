/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { 
  Observable,
  map, 
  switchMap
} from "rxjs";
import { Store } from "@ngxs/store";
import { 
  EndpointConfigState,
  Endpoint,
} from "src/app/store/endpoint-config";


@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {
  private httpClientOptions = { 
    withCredentials: true,
    headers: {
      'ngsw-bypass': '',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  constructor(
    private store: Store,
    private http: HttpClient
  ) { }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  }
  
  private getUrl(
    endpoint: Endpoint, 
    params: Record<string, string | number> = {}
  ): Observable<string> {
    return this.store.selectOnce(EndpointConfigState.getEndpoints).pipe(
      map((endpoints: Record<string, any>) => {
        const baseUrl = endpoints[Endpoint.SERVER_URL]; // The base URL from config
        let url = this.getNestedValue(endpoints, endpoint); // The specific endpoint path

        if(!url) {
          throw new Error(`API endpoint not found: ${endpoint}`);
        }

        // Replace path variables (e.g., {id} in the URL)
        Object.keys(params).forEach((key) => {
          if (url.includes(`{${key}}`)) {
            url = url.replace(`{${key}}`, encodeURIComponent(String(params[key])));
            delete params[key]; // Remove from query params after replacement
          }
        });

        // Append remaining params as query parameters
        const queryParams = new URLSearchParams();
        Object.keys(params).forEach((key) => {
          queryParams.append(key, String(params[key]));
        });

        return queryParams.toString() ? `${baseUrl}/${url}?${queryParams}` : `${baseUrl}/${url}`;
      })
    );
  }

  get<T>(
    endpoint: Endpoint, 
    param?:  Record<string, string | number>
  ): Observable<T> {
    return this.getUrl(endpoint, param)
      .pipe(switchMap((url: string) => 
        this.http.get<T>(url, this.httpClientOptions)));
  }

  post<T>(
    endpoint: Endpoint,
    payload: any,
    param?: Record<string, string | number>
  ): Observable<T> {
    return this.getUrl(endpoint, param)
      .pipe(switchMap((url: string) => 
        this.http.post<T>(url, payload, this.httpClientOptions)));
  }

  update<T>(
    endpoint: Endpoint,
    payload: any,
    param?: Record<string, string | number>
  ): Observable<T> {
    return this.getUrl(endpoint, param)
      .pipe(switchMap((url: string) => 
        this.http.patch<T>(url, payload, this.httpClientOptions)));
  }

  delete<T>(
    endpoint: Endpoint,
    param?: Record<string, string | number>
  ): Observable<T> {
    return this.getUrl(endpoint, param)
      .pipe(switchMap((url: string) => 
        this.http.delete<T>(url, this.httpClientOptions)));
  }

  downloadFile<T>(
    endpoint: Endpoint,
    payload?: any,
    param?: Record<string, string | number>
  ): Observable<Blob> {
    return this.getUrl(endpoint, param)
      .pipe(switchMap((url: string) => 
        this.http.post(url, payload, { 
          ...this.httpClientOptions,
          responseType: 'blob' 
        })));
  }

  uploadFile<T>(
    endpoint: Endpoint,
    payload: any,
    param?: Record<string, string | number>
  ): Observable<T> {
    const httpClientOptions = { 
      withCredentials: true,
      headers: {
        'ngsw-bypass': '',
        'Accept': 'application/json'
      }
    };

    return this.getUrl(endpoint, param)
      .pipe(switchMap((url: string) => 
        this.http.post<T>(url, payload, httpClientOptions)));
  }
}