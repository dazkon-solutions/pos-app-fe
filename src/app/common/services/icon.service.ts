/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { 
  DomSanitizer, 
  SafeResourceUrl 
} from "@angular/platform-browser";


@Injectable({ 
  providedIn: 'root'
})
export class IconService {
  private path = 'icons';

  constructor(
    private readonly matIconReg: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer
  ) { }

  registerSvgIcons(): void {
    this.registerIcons();
  }

  private registerIcons(): void {
    this.matIconReg
      .addSvgIcon('bell', this.setPath(`${this.path}/bell-outlined.svg`))
      .addSvgIcon('close', this.setPath(`${this.path}/close-outlined.svg`))
      .addSvgIcon('tune', this.setPath(`${this.path}/tune-outlined.svg`))
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
  }                

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}