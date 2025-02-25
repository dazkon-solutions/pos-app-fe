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
  EventEmitter, 
  Input, 
  OnChanges, 
  Output,
  SimpleChanges
} from '@angular/core';
import { Observable } from 'rxjs';
import { LocaleKeys } from 'src/app/common/constants';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { Action, FormMode } from 'src/app/common/enums';
import { DIALOG_MAT_IMPORTS } from '../dialog-imports';
import { ActionButtonComponent } from '../../action-button/action-button.component';
import { ActionButtonConfig } from '../../action-button';

@Component({
  selector: 'daz-dialog-actions',
  imports: [
    CORE_IMPORTS,
    DIALOG_MAT_IMPORTS,
    ActionButtonComponent
  ],
  templateUrl: './dialog-actions.component.html',
  styleUrl: './dialog-actions.component.scss'
})
export class DialogActionsComponent implements OnChanges {
  @Input('initFormMode')
  initFormMode!: FormMode;

  @Input('createButton$')
  createButton$!: Observable<ActionButtonConfig>;

  @Input('updateButton$')
  updateButton$!: Observable<ActionButtonConfig>;

  @Input('editButton$')
  editButton$!: Observable<ActionButtonConfig>;

  @Output('actionClicked')
  actionClicked = new EventEmitter<Action>(true);

  selectedFormMode!: FormMode;
  LocaleKeys = LocaleKeys;
  FormMode = FormMode;

  ngOnChanges(changes: SimpleChanges): void {
    if('initFormMode' in changes) {
      this.selectedFormMode = this.initFormMode;
    }
  }

  onChangeMode(formMode: FormMode): void {
    this.selectedFormMode = formMode;
  }

  actionButtonClicked(action: Action): void {
    this.actionClicked.next(action);
  }
}