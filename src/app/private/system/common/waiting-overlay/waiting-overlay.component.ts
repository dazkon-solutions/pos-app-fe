/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  ChangeDetectionStrategy,
  Component, 
  input
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LocaleKeys } from 'src/app/common/constants';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';

@Component({
  selector: 'daz-waiting-overlay',
  imports: [
    CORE_IMPORTS,
    MatProgressSpinnerModule
  ],
  templateUrl: './waiting-overlay.component.html',
  styleUrl: './waiting-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingOverlayComponent {
  title = input<any>(null);

  LocaleKeys = LocaleKeys;
}