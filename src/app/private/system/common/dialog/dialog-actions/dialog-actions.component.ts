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
  Output
} from '@angular/core';
import { 
  BehaviorSubject, 
  Observable 
} from 'rxjs';
import { LocaleKeys } from 'src/app/common/constants';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { Action, FormMode } from 'src/app/common/enums';
import { DIALOG_MAT_IMPORTS } from '../dialog-imports';
import { ActionButtonComponent } from '../../action-button/action-button.component';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from '../../action-button';

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
export class DialogActionsComponent {
  @Input('formMode$')
  formMode$!: Observable<FormMode>;

  @Input('actionButtonConfig$')
  actionButtonConfig$!: Observable<ActionButtonConfig>;

  @Input('isProcessing$')
  isProcessing$!: Observable<boolean>;

  @Output('formModeChanged')
  formModeChanged = new EventEmitter<FormMode>(true);

  @Output('actionClicked')
  actionClicked = new EventEmitter<Action>(true);

  LocaleKeys = LocaleKeys;
  FormMode = FormMode;

  editButton$ = new BehaviorSubject<ActionButtonConfig>({
    action: Action.DEFAULT,
    type: ActionButtonType.EDIT
  });

  onChangeMode(mode: FormMode): void {
    this.formModeChanged.emit(mode);
  }

  actionButtonClicked(action: Action): void {
    this.actionClicked.next(action);
  }
}