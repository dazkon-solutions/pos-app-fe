/**
 * Copyright (c) 2025 DAZKON SOLUTIONS (DAZKON PVT LTD)
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
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { SetNavigationRoutePath } from "src/app/store/navigation-config";
import { NAVIGATION_CONFIG } from "./navigation.config";

@Injectable({ 
  providedIn: 'root'
})
export class NavigationService {
  private router = inject(Router);
  private store = inject(Store);

  navigateTo(routePath: string | undefined): void {
    // TODO: CHECK PERMISSION BEFORE NAVIGATE
    const navigation = NAVIGATION_CONFIG.find(config => 
      config.path === routePath);

    if (!navigation) {
      console.error(`No route configured for path: ${routePath}`);
      return;
    };

    this.store.dispatch(new SetNavigationRoutePath(navigation.path));

    this.router.navigate([ routePath ]);
  }
}