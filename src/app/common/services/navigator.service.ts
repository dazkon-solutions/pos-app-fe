/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { 
  firstValueFrom,
  Observable, 
  Subject 
} from "rxjs";
import { Store } from "@ngxs/store";
import { Resource } from "../enums";
import { 
  MenuState, 
  SelectMenuItem 
} from "src/app/store/menu-config";

@Injectable({
  providedIn: 'root'
})
export class Navigator {
  private navigatorSubject = new Subject<Resource>;

  navigator$: Observable<Resource> = this.navigatorSubject.asObservable();

  constructor(
    private router: Router,
    private store: Store
  ) { }

  navigateTo(resource: Resource): void {
    this.navigatorSubject.next(resource);
  }

  async navigateToDashboardWithUpdatingMenu(): Promise<void> {
    const list = await firstValueFrom(this.store.select(MenuState.getTree));
    const dashboard = list.find(item => item.resource === Resource.DASHBOARD);

    if(!dashboard) return;

    this.store.dispatch(new SelectMenuItem(dashboard));
    this.router.navigate([ '' ]);
  }
}