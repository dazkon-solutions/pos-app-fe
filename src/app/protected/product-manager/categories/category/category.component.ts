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
  Observable,
  of
} from 'rxjs';
import { LocaleKeys } from 'src/app/common/constants';
import { 
  Action, 
  ButtonEvent, 
  FormMode 
} from 'src/app/common/enums';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { DIALOG_MAT_IMPORTS } from 'src/app/common/imports/dialog-imports';
import { ActionButtonConfig } from 'src/app/private/system/common/action-button';
import { DialogActionsComponent } from 'src/app/private/system/common/dialog/dialog-actions/dialog-actions.component';
import { DialogHeaderConfig } from 'src/app/private/system/common/dialog/dialog-header';
import { DialogHeaderComponent } from 'src/app/private/system/common/dialog/dialog-header/dialog-header.component';
import { ProductCategoryUIState } from 'src/app/store/product-category';
import { CustomErrorStateMatcher } from 'src/app/private/system/common/error-statement-matcher';
import { FORM_MAT_IMPORTS } from 'src/app/common/imports/form-imports';
import { WaitingOverlayComponent } from 'src/app/private/system/common/waiting-overlay/waiting-overlay.component';
import { CommonAutoCompleteComponent } from 'src/app/private/system/common/auto-completes/common-auto-complete/common-auto-complete.component';
import { CategoryFormConfigHelper } from './category-form-config';
import { PersonAutoCompleteComponent } from 'src/app/private/system/common/auto-completes/person-auto-complete/person-auto-complete.component';


@Component({
  selector: 'daz-category',
  imports: [
    CORE_IMPORTS,
    DIALOG_MAT_IMPORTS,
    FORM_MAT_IMPORTS,
    DialogHeaderComponent,
    DialogActionsComponent,
    WaitingOverlayComponent,
    CommonAutoCompleteComponent,
    PersonAutoCompleteComponent
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

  isCategoryLoading$!: Observable<boolean>;

  matcher = new CustomErrorStateMatcher();
  form: FormGroup;
  initFormMode = FormMode.NEW;
  formTouched = false;
  LocaleKeys = LocaleKeys;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
  ) { 
    this.form = CategoryFormConfigHelper.createForm(this.formBuilder);
  }

  ngOnInit(): void {
    this.syncState();

    this.form.get('category')?.valueChanges.subscribe(v => console.warn('chn',v))
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
    console.warn('formValue',this.form.value)
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.formTouched = true;
      return;
    }

    console.warn('dialog action changed', action)
  }

  onFilterCategory(filterTerm: string): void {
    console.warn('category filter', filterTerm);
  }

  categoryFetchClicked(buttonEvent: ButtonEvent): void {
    this.isCategoryLoading$ = of(true);
    console.warn('fetch category', buttonEvent);
  }

  getCategoryList(): Observable<any[]> {
    const list = [
      {
        id: 1,
        name: "Electronics",
        year: 2023
      },
      {
        id: 2,
        name: "Furniture",
        year: 2022
      },
      {
        id: 3,
        name: "Clothing",
        year: 2024
      },
      {
        id: 4,
        name: "Automotive",
        year: 2021
      },
      {
        id: 5,
        name: "Sports & Outdoors",
        year: 2023
      }
    ];
    return of(list);
  }

  getCustomerList(): Observable<any[]> {
    const list = [
      {
        id: 1,
        name: "Samantha rathnayake",
        title: 'MR'
      },
      {
        id: 2,
        name: "Sugath bandara",
        title: 'MR'
      },
      {
        id: 3,
        name: "Nimesha ranathunga",
        title: 'MISS'
      },
      {
        id: 4,
        name: "Sarath dassanayake",
        title: 'MR'
      },
      {
        id: 5,
        name: "Mahesh bandara",
        title: 'MR'
      }
    ];
    return of(list);
  }
}