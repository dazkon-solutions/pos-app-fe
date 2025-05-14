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
  effect, 
  inject, 
  OnDestroy, 
  signal
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup 
} from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { LocaleKeys } from 'src/app/common/constants';
import { Permission } from 'src/app/common/enums';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { DialogFormActionsComponent } from 'src/app/private/system/common/dialog/dialog-form-actions/dialog-form-actions.component';
import { DialogHeaderConfig } from 'src/app/private/system/common/dialog/dialog-header';
import { DialogHeaderComponent } from 'src/app/private/system/common/dialog/dialog-header/dialog-header.component';
import { CustomErrorStateMatcher } from 'src/app/private/system/common/error-statement-matcher';
import { FORM_MAT_IMPORTS } from 'src/app/common/imports/form-imports';
import { WaitingOverlayComponent } from 'src/app/private/system/common/waiting-overlay/waiting-overlay.component';
import { 
  BankState, 
  BankUIState, 
  CreateBank,
  ResetSelectedBank, 
  UpdateBank 
} from 'src/app/store/bank';
import { Bank } from 'src/app/common/interfaces';
import { BankFormConfigHelper } from './bank-form-config';


@Component({
  selector: 'daz-bank',
  imports: [
    CORE_IMPORTS,
    FORM_MAT_IMPORTS,
    MatDialogModule,
    DialogHeaderComponent,
    DialogFormActionsComponent,
    WaitingOverlayComponent
  ],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankComponent implements OnDestroy {
  private store = inject(Store);
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(DialogRef);
  
  isProcessing = this.store.selectSignal(BankUIState.isProcessing);
  currentItem = this.store.selectSignal(BankState.getCurrent);
  
  dialogHeaderConfig = signal<DialogHeaderConfig>({ 
    title: LocaleKeys.titles.bank.createBank 
  });
  createPermission = signal<Permission>(Permission.CAN_CREATE_BANK);
  updatePermission = signal<Permission>(Permission.CAN_UPDATE_BANK);
  isFormEditable = signal<boolean>(true);
  isCreateMode = signal<boolean>(true);

  form: FormGroup;
  matcher = new CustomErrorStateMatcher();
  formTouched = false;
  LocaleKeys = LocaleKeys;

  constructor() {
    this.form = BankFormConfigHelper.createForm(this.formBuilder);

    effect(() => {
      const currentItem = this.currentItem();
      const isProcessing = this.isProcessing();
      
      if (currentItem) {
        this.isCreateMode.set(false);
        this.isFormEditable.set(false);
        this.setFormData(currentItem);
      }

      if (isProcessing) { 
        this.dialogHeaderConfig.set({title: LocaleKeys.titles.bank.bank}); 
      }
    });
  }

  private setFormData(bank: Bank): void {
    if (!bank) return;
    if (this.form.value.id === bank.id) return;

    this.dialogHeaderConfig.set({
      title: LocaleKeys.titles.bank.bank
    });
    
    this.form.patchValue({
      id: bank.id,
      name: bank.name
    }, { emitEvent: false });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.formTouched = true;
      return;
    }

    const stateAction = (this.form.value.id > 0)
      ? new UpdateBank(this.form.value)
      : new CreateBank(this.form.value);

    try {
      await firstValueFrom(this.store.dispatch(stateAction));
      this.dialogRef.close();
    } catch (error) { 
      console.error('Error dispatching state action:', error); 
    }
  }

  onToggleEditability(): void {
    this.isFormEditable.set(!this.isFormEditable());
  } 

  ngOnDestroy(): void {
    this.store.dispatch(new ResetSelectedBank());
  }
}