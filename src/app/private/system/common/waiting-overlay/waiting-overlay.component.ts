/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  Component, 
  Input 
} from '@angular/core';
import { LocaleKeys } from 'src/app/common/constants';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { WAITING_OVERLAY_MAT_IMPORTS } from './waiting-overlay-imports';

@Component({
  selector: 'daz-waiting-overlay',
  imports: [
    CORE_IMPORTS,
    WAITING_OVERLAY_MAT_IMPORTS
  ],
  templateUrl: './waiting-overlay.component.html',
  styleUrl: './waiting-overlay.component.scss'
})
export class WaitingOverlayComponent {
  @Input('title')
  title!: string;

  LocaleKeys = LocaleKeys;
}