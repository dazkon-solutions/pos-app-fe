/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ActionResponse } from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private actionSubject = new Subject<ActionResponse>();
  action$ = this.actionSubject.asObservable();

  emitAction(actionResponse: ActionResponse) {
    this.actionSubject.next(actionResponse);
  }
}