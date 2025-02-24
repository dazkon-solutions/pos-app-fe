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
import { Store } from '@ngxs/store';
import { 
  BehaviorSubject, 
  firstValueFrom, 
  Observable, 
  Subject
} from 'rxjs';
import { LocaleKeys } from 'src/app/common/constants';
import { 
  Action, 
  FormMode 
} from 'src/app/common/enums';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { DIALOG_MAT_IMPORTS } from 'src/app/common/imports/dialog-imports';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from 'src/app/private/system/common/action-button';
import { DialogActionsComponent } from 'src/app/private/system/common/dialog/dialog-actions/dialog-actions.component';
import { DialogHeaderConfig } from 'src/app/private/system/common/dialog/dialog-header';
import { DialogHeaderComponent } from 'src/app/private/system/common/dialog/dialog-header/dialog-header.component';
import { ProductCategoryUIState } from 'src/app/store/product-category';


@Component({
  selector: 'daz-category',
  imports: [
    CORE_IMPORTS,
    DIALOG_MAT_IMPORTS,
    DialogHeaderComponent,
    DialogActionsComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  isProcessing$!: Observable<boolean>;

  dialogHeaderConfig$ = new BehaviorSubject<DialogHeaderConfig>({
    title: LocaleKeys.titles.createCategory,
    value: 'SAL-23232'
  });
  dialogActionsFormMode$ = new BehaviorSubject<FormMode>(FormMode.NEW);
  actionButton$ = new Subject<ActionButtonConfig>();

  LocaleKeys = LocaleKeys;
  selectedFormMode = FormMode.NEW;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.syncState();
  }

  private syncState(): void {
    this.isProcessing$ = this.store.select(ProductCategoryUIState.isProcessing);
    // Set form values from state
    // this.formModeChanged(FormMode.VIEW);
    this.createSaveButton()
  }

  formModeChanged(mode: FormMode): void {
    this.selectedFormMode = mode;

    switch (mode) {
      case FormMode.NEW:
        this.createSaveButton();
        break;

      case FormMode.EDIT:
        this.createUpdateButton();
        this.dialogActionsFormMode$.next(FormMode.EDIT);
        break;

      case FormMode.VIEW:
        this.dialogActionsFormMode$.next(FormMode.VIEW);
        break;

      default:
        return;
    }
  }

  actionClicked(action: Action): void {
    console.warn('dialog action changed', action)
  }

  private async createSaveButton(): Promise<void> {
    const isLoading = await firstValueFrom(this.isProcessing$);
    this.actionButton$.next({
      action: Action.CREATE_CATEGORY,
      type: ActionButtonType.CREATE,
      isLoading
    });
  }

  private async createUpdateButton(): Promise<void> {
    const isLoading = await firstValueFrom(this.isProcessing$);
    this.actionButton$.next({
      action: Action.UPDATE_CATEGORY,
      type: ActionButtonType.UPDATE,
      isLoading
    });
  }
}