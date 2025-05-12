/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  inject, 
  Injectable 
} from "@angular/core";
import { Store } from "@ngxs/store";
import { 
  AlertMode, 
  AlertType 
} from "./alert.enum";
import { SetAlert } from "./alert.state";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private store = inject(Store);

  setAlert(
    type: AlertType,
    messageKey: string,
    mode = AlertMode.SNACK_BAR
  ): void {
    this.store.dispatch(new SetAlert(type, 
                                     messageKey,
                                     mode));
  }
}