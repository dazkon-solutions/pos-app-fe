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
  OnInit 
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup 
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { 
  BehaviorSubject, 
  Observable
} from 'rxjs';
import { LocaleKeys } from 'src/app/common/constants';
import { 
  Action, 
  FormMode 
} from 'src/app/common/enums';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { DIALOG_MAT_IMPORTS } from 'src/app/common/imports/dialog-imports';
import { ActionButtonConfig } from 'src/app/private/system/common/action-button';
import { DialogActionsComponent } from 'src/app/private/system/common/dialog/dialog-actions/dialog-actions.component';
import { DialogHeaderConfig } from 'src/app/private/system/common/dialog/dialog-header';
import { DialogHeaderComponent } from 'src/app/private/system/common/dialog/dialog-header/dialog-header.component';
import { ProductCategoryUIState } from 'src/app/store/product-category';
import { ErrorStatementMatcher } from 'src/app/private/system/common/error-statement-matcher';
import { FORM_MAT_IMPORTS } from 'src/app/common/imports/form-imports';
import { WaitingOverlayComponent } from 'src/app/private/system/common/waiting-overlay/waiting-overlay.component';
import { CategoryFormConfigHelper } from './category-form-config';


@Component({
  selector: 'daz-category',
  imports: [
    CORE_IMPORTS,
    DIALOG_MAT_IMPORTS,
    FORM_MAT_IMPORTS,
    DialogHeaderComponent,
    DialogActionsComponent,
    WaitingOverlayComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  isProcessing$!: Observable<boolean>;
  dialogHeaderConfig$ = new BehaviorSubject<DialogHeaderConfig>(CategoryFormConfigHelper.headerConfig);
  createBtn$ = new BehaviorSubject<ActionButtonConfig>(CategoryFormConfigHelper.createBtnConfig);
  updateBtn$ = new BehaviorSubject<ActionButtonConfig>(CategoryFormConfigHelper.updateBtnConfig);
  editBtn$ = new BehaviorSubject<ActionButtonConfig>(CategoryFormConfigHelper.editBtnConfig);
  matcher = new ErrorStatementMatcher();
  form: FormGroup;
  initFormMode = FormMode.NEW;
  LocaleKeys = LocaleKeys;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
  ) { 
    this.form = CategoryFormConfigHelper.createForm(this.formBuilder);
  }

  ngOnInit(): void {
    this.syncState();
  }

  private syncState(): void {
    this.isProcessing$ = this.store.select(ProductCategoryUIState.isProcessing);
    // Set form values from state
    this.updateFormConfigByData({id: 1});
  }

  private updateFormConfigByData(formData: any): void {
    this.initFormMode = formData.id > 0
      ? FormMode.VIEW
      : FormMode.NEW;

    if(formData.id > 0) {
      this.dialogHeaderConfig$.next({
        title: LocaleKeys.titles.createCategory,
        value: 'SAL-23232'
      });
    }
  }

  actionClicked(action: Action): void {
    console.warn('dialog action changed', action)
  }
}