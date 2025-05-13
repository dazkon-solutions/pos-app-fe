/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { 
  firstValueFrom, 
  take 
} from "rxjs";
import { environment } from "src/environments/environment.prod";
import { 
  EndpointConfigState, 
  SetEndpoints 
} from "./endpoint-config.state";

@Injectable({
  providedIn: 'root'
})
export class EndpointConfigService {
  private env = 'development';
  config = { };
  isLoaded = false;

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  async loadConfig(): Promise<boolean> {
    this.store.select(EndpointConfigState.isLoaded)
      .pipe(take(1))
      .subscribe(status => this.isLoaded = status);
    
    if (this.isLoaded) {
      return true;
    }

    this.env = environment.production ? 'production' : 'development';
    
    const file = `./config/${this.env}.json`;
    // console.debug('file', file);

    this.config = await firstValueFrom(this.http.get(file));

    if (this.config) {
      this.store.dispatch(new SetEndpoints(this.config));
    }

    return true;
  }

  async createDefaultStates(): Promise<boolean> {
    if (this.isLoaded) {
      return true;
    }
    await Promise.all([
      this.store.dispatch([
        //
      ])
    ]);
    return true;  
  }
}