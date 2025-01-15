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
  }                

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}