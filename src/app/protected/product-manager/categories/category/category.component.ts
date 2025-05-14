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
  CreateProductCategory, 
  ProductCategoryState, 
  ProductCategoryUIState, 
  ResetSelectedProductCategory, 
  UpdateProductCategory 
} from 'src/app/store/product-category';
import { ProductCategory } from 'src/app/common/interfaces';
import { CategoryFormConfigHelper } from './category-form-config';


@Component({
  selector: 'daz-category',
  imports: [
    CORE_IMPORTS,
    FORM_MAT_IMPORTS,
    MatDialogModule,
    DialogHeaderComponent,
    DialogFormActionsComponent,
    WaitingOverlayComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnDestroy {
  private store = inject(Store);
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(DialogRef);
  
  isProcessing = this.store.selectSignal(ProductCategoryUIState.isProcessing);
  currentItem = this.store.selectSignal(ProductCategoryState.getCurrent);
  
  dialogHeaderConfig = signal<DialogHeaderConfig>({ 
    title: LocaleKeys.titles.category.createCategory 
  });
  createPermission = signal<Permission>(Permission.CAN_CREATE_CATEGORY);
  updatePermission = signal<Permission>(Permission.CAN_UPDATE_CATEGORY);
  isFormEditable = signal<boolean>(true);
  isCreateMode = signal<boolean>(true);

  form: FormGroup;
  matcher = new CustomErrorStateMatcher();
  formTouched = false;
  LocaleKeys = LocaleKeys;

  constructor() {
    this.form = CategoryFormConfigHelper.createForm(this.formBuilder);

    effect(() => {
      const currentItem = this.currentItem();
      const isProcessing = this.isProcessing();
      
      if (currentItem) {
        this.isCreateMode.set(false);
        this.isFormEditable.set(false);
        this.setFormData(currentItem);
      }

      if (isProcessing) { 
        this.dialogHeaderConfig.set({title: LocaleKeys.titles.category.category}); 
      }
    });
  }

  private setFormData(category: ProductCategory): void {
    if (!category) return;
    if (this.form.value.id === category.id) return;

    this.dialogHeaderConfig.set({
      title: LocaleKeys.titles.category.category
    });
    
    this.form.patchValue({
      id: category.id,
      name: category.name,
      nameLocal: category.nameLocal,
      description: category.description,
      descriptionLocal: category.descriptionLocal
    }, { emitEvent: false });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.formTouched = true;
      return;
    }

    const stateAction = (this.form.value.id > 0)
      ? new UpdateProductCategory(this.form.value)
      : new CreateProductCategory(this.form.value);

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
    this.store.dispatch(new ResetSelectedProductCategory());
  }
}