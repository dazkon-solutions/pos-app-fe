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
import { Observable } from 'rxjs';
import { LocaleKeys } from 'src/app/common/constants';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { DIALOG_MAT_IMPORTS } from '../dialog-imports';
import { DialogHeaderConfig } from './dialog-header.interface';

@Component({
  selector: 'daz-dialog-header',
  imports: [
    CORE_IMPORTS,
    DIALOG_MAT_IMPORTS
  ],
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.scss'
})
export class DialogHeaderComponent {
  @Input('config$')
  config$!: Observable<DialogHeaderConfig>;

  @Input('isProcessing$')
  isProcessing$!: Observable<boolean>;

  LocaleKeys = LocaleKeys;
}