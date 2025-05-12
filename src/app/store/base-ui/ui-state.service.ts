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
  SetLoadingStatus, 
  SetProcessingStatus 
} from "./base-ui.state";
import { StateKey } from "../state-key.token";

@Injectable({
  providedIn: 'root'
})
export class UIStateService {
  private store = inject(Store);

  setLoading(
    stateKey: StateKey,
    status: boolean
  ): void {
    this.store.dispatch(new SetLoadingStatus(stateKey,
                                             status));
  }

  setProcessing(
    stateKey: StateKey,
    status: boolean
  ): void {
    this.store.dispatch(new SetProcessingStatus(stateKey,
                                                status));
  }
}