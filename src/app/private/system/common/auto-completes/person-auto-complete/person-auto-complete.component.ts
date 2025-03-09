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
  forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { FORM_MAT_IMPORTS } from 'src/app/common/imports/form-imports';
import { BaseAutoCompleteComponent } from '../base-auto-complete-component';


@Component({
  selector: 'daz-person-auto-complete',
  imports: [
    CORE_IMPORTS,
    FORM_MAT_IMPORTS
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersonAutoCompleteComponent),
      multi: true
    }
  ],
  templateUrl: './person-auto-complete.component.html',
  styleUrl: './person-auto-complete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonAutoCompleteComponent extends BaseAutoCompleteComponent {
  override displayFn = (option: any): string => {
    return option 
      ? `${option.title}. ${option[this.ctrlDisplayProperty]}` 
      : '';
  };
}