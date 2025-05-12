/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  Injectable, 
  signal 
} from "@angular/core";
import { ActionResponse } from "../interfaces";
import { Action } from "../enums";


@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private defaultActionResponse: ActionResponse = {
    action: Action.DEFAULT,
    payload: { }
  };

  action = signal<ActionResponse>(this.defaultActionResponse);

  emitAction(actionResponse: ActionResponse): void {
    this.action.set(actionResponse);
  }
  
  // Call this from the component after action response triggerd
  resetAction(): void {
    this.action.set(this.defaultActionResponse);
  }
}