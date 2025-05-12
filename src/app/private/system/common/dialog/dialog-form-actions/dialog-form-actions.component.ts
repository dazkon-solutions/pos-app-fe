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
  computed, 
  EventEmitter, 
  inject, 
  input, 
  Output,
  signal
} from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { LocaleKeys } from 'src/app/common/constants';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { Permission } from 'src/app/common/enums';
import { ButtonComponent } from '../../button/button.component';
import { 
  ButtonConfig, 
  ButtonType 
} from '../../button';

@Component({
  selector: 'daz-dialog-form-actions',
  imports: [
    CORE_IMPORTS,
    MatDialogModule,
    ButtonComponent
  ],
  templateUrl: './dialog-form-actions.component.html',
  styleUrl: './dialog-form-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogFormActionsComponent {
  private dialogRef = inject(DialogRef);
  
  isEditable = input.required<boolean>();
  isCreateMode = input.required<boolean>();
  createPermission = input.required<Permission>();
  updatePermission = input.required<Permission>();

  @Output('actionClicked')
  actionClicked = new EventEmitter<void>();

  @Output('editablilityToggled')
  editablilityToggled = new EventEmitter<void>(true);

  createBtn = computed<ButtonConfig>(() => ({
    type: ButtonType.FLAT,
    icon: 'save',
    label: LocaleKeys.labels.buttons.save,
    permission: this.createPermission()
  }));
  updateBtn = computed<ButtonConfig>(() => ({
    type: ButtonType.FLAT,
    icon: 'update',
    label: LocaleKeys.labels.buttons.update,
    permission: this.updatePermission()
  }));
  editBtn = computed<ButtonConfig>(() => ({
    type: ButtonType.BASIC,
    icon: 'edit',
    label: LocaleKeys.labels.buttons.edit,
    permission: this.updatePermission()
  }));
  okBtn = signal<ButtonConfig>({
    type: ButtonType.FLAT,
    label: LocaleKeys.labels.buttons.ok
  });
  cancelBtn = signal<ButtonConfig>({
    type: ButtonType.BASIC,
    label: LocaleKeys.labels.buttons.cancel
  });

  closeDialog(): void {
    this.dialogRef.close();
  }

  actionBtnClicked(): void {
    this.actionClicked.emit();
  }

  toggleEditablility(): void {
    this.editablilityToggled.emit();
  }
}