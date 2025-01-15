/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  AbstractControl, 
  FormGroup 
} from "@angular/forms";
import { 
  Subject, 
  debounceTime, 
  takeUntil 
} from "rxjs";


export class FormHelper {
  static setupDebouncedFilter(
    control: AbstractControl | null,
    dispatchActions: () => void,
    destroy$: Subject<void>
  ): void {
    if (!control) {
      return;
    }

    control.valueChanges.pipe(
      debounceTime(1000),
      takeUntil(destroy$)
    ).subscribe(() => {
      dispatchActions();
    });
  }

  static clearIfNotSelected(
    form: FormGroup, 
    controlName: string
  ): void {
    const ctrlValue = form.get(`${controlName}`)?.value;

    if(!ctrlValue) {
      return
    };

    if(!Object.keys(ctrlValue).includes('id')){
      form.get(`${controlName}`)?.setValue('');

    } else {
      return;
    }
  }

  static isSelectedItem(
    form: FormGroup, 
    controlName: string
  ): boolean {
    const ctrlValue = form.get(`${controlName}`)?.value;

    if(!ctrlValue) {
      return false;
    };

    return (Object.keys(ctrlValue).includes('id'));
  }
}