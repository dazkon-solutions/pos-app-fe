/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { 
  FooterComponent, 
  HeaderComponent 
} from 'src/app/private/system/core';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from './common/modules';
import { IconService } from './common/services';

@Component({
  selector: 'daz-root',
  imports: [
    RouterOutlet,
    StandaloneCommonModule,
    MaterialModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private iconSvc: IconService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.iconSvc.registerSvgIcons();
  }
}