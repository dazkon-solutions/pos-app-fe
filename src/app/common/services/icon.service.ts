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
import { MatIconRegistry } from "@angular/material/icon";
import { 
  DomSanitizer, 
  SafeResourceUrl 
} from "@angular/platform-browser";


@Injectable({ 
  providedIn: 'root'
})
export class IconService {
  private matIconReg = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  private path = 'icons';

  registerSvgIcons(): void {
    this.registerIcons();
  }

  private registerIcons(): void {
    this.matIconReg
      .addSvgIcon('bell', this.setPath(`${this.path}/bell-outlined.svg`))
      .addSvgIcon('close', this.setPath(`${this.path}/close-outlined.svg`))
      .addSvgIcon('search', this.setPath(`${this.path}/search-outlined.svg`))
      .addSvgIcon('menu', this.setPath(`${this.path}/menu-outlined.svg`))
      .addSvgIcon('expand-more', this.setPath(`${this.path}/expand-more-outlined.svg`))
      .addSvgIcon('expand-less', this.setPath(`${this.path}/expand-less-outlined.svg`))
      .addSvgIcon('expand-less-right', this.setPath(`${this.path}/expand-less-right-outlined.svg`))
      .addSvgIcon('fullscreen', this.setPath(`${this.path}/fullscreen-outlined.svg`))
      .addSvgIcon('fullscreen-exit', this.setPath(`${this.path}/fullscreen-exit-outlined.svg`))
      .addSvgIcon('signout', this.setPath(`${this.path}/signout-outlined.svg`))
      .addSvgIcon('info', this.setPath(`${this.path}/info-outlined.svg`))
      .addSvgIcon('account', this.setPath(`${this.path}/account-outlined.svg`))
      .addSvgIcon('light-mode', this.setPath(`${this.path}/light-mode-outlined.svg`))
      .addSvgIcon('dark-mode', this.setPath(`${this.path}/dark-mode-outlined.svg`))
      .addSvgIcon('dashboard', this.setPath(`${this.path}/dashboard-outlined.svg`))
      .addSvgIcon('dashboard-filled', this.setPath(`${this.path}/dashboard-filled.svg`))
      .addSvgIcon('product', this.setPath(`${this.path}/product-outlined.svg`))
      .addSvgIcon('product-filled', this.setPath(`${this.path}/product-filled.svg`))
      .addSvgIcon('settings', this.setPath(`${this.path}/settings-outlined.svg`))
      .addSvgIcon('help', this.setPath(`${this.path}/help-outlined.svg`))
      .addSvgIcon('add', this.setPath(`${this.path}/add-outlined.svg`))
      .addSvgIcon('save', this.setPath(`${this.path}/save-outlined.svg`))
      .addSvgIcon('update', this.setPath(`${this.path}/update-outlined.svg`))
      .addSvgIcon('delete', this.setPath(`${this.path}/delete-outlined.svg`))
      .addSvgIcon('view', this.setPath(`${this.path}/view-outlined.svg`))
      .addSvgIcon('grid-view', this.setPath(`${this.path}/grid-view-outlined.svg`))
      .addSvgIcon('grid-view-filled', this.setPath(`${this.path}/grid-view-filled.svg`))
      .addSvgIcon('list-view', this.setPath(`${this.path}/list-view-outlined.svg`))
      .addSvgIcon('list-view-filled', this.setPath(`${this.path}/list-view-filled.svg`))
      .addSvgIcon('refresh', this.setPath(`${this.path}/refresh-outlined.svg`))
      .addSvgIcon('edit', this.setPath(`${this.path}/edit-outlined.svg`))
      .addSvgIcon('done', this.setPath(`${this.path}/done-outlined.svg`))
      .addSvgIcon('error', this.setPath(`${this.path}/error-outlined.svg`))
      .addSvgIcon('pos', this.setPath(`${this.path}/pos-outlined.svg`))
      .addSvgIcon('calculator', this.setPath(`${this.path}/calculator-outlined.svg`))
      .addSvgIcon('backspace', this.setPath(`${this.path}/backspace-outlined.svg`))
      .addSvgIcon('person-add', this.setPath(`${this.path}/person-add-outlined.svg`))
      .addSvgIcon('advanced-filter', this.setPath(`${this.path}/advanced-filter-outlined.svg`))
      .addSvgIcon('advanced-filter-filled', this.setPath(`${this.path}/advanced-filter-filled.svg`))
      .addSvgIcon('configuration', this.setPath(`${this.path}/configuration-outlined.svg`))
      .addSvgIcon('configuration-filled', this.setPath(`${this.path}/configuration-filled.svg`))
      .addSvgIcon('expense', this.setPath(`${this.path}/expense-outlined.svg`))
      .addSvgIcon('expense-filled', this.setPath(`${this.path}/expense-filled.svg`))
  }                

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}