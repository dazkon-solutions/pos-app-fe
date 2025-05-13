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
import { DialogRef } from '@angular/cdk/dialog';
import { 
  MAT_DIALOG_DATA, 
  MatDialogModule 
} from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngxs/store';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { LocaleKeys } from 'src/app/common/constants';
import { 
  DeleteHandleState, 
  ResetDeleteHandleState 
} from 'src/app/store/delete-handle';
import { DeletableResponse } from 'src/app/common/interfaces';
import { DeleteHandlerConfig } from './delete-handler.interface';
import { AnimationPlayerComponent } from '../animation-player/animation-player.component';
import { AnimationType } from '../animation-player';
import { DeleteHandleSkeletonComponent } from '../skeletons/delete-handler-skeleton/delete-handler-skeleton.component';
import { ButtonComponent } from '../button/button.component';
import { 
  ButtonConfig, 
  ButtonStyleClass, 
  ButtonType 
} from '../button';

enum DeleteHandlerStatus {
  INIT,
  DELETABLE,
  NOT_DELETABLE
};

@Component({
  selector: 'daz-delete-handler',
  imports: [
    CORE_IMPORTS,
    MatDialogModule,
    ButtonComponent,
    AnimationPlayerComponent,
    DeleteHandleSkeletonComponent,
  ],
  templateUrl: './delete-handler.component.html',
  styleUrl: './delete-handler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class DeleteHandlerComponent implements OnDestroy {
  public data: DeleteHandlerConfig = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(DialogRef);
  private store = inject(Store);

  isProcessing = this.store.selectSignal(DeleteHandleState.isProcessing);
  private deleteResponse = this.store.selectSignal(DeleteHandleState.getResponse);
  
  messages = signal<string[]>([]);
  deleteHandlerStatus = signal<DeleteHandlerStatus>(DeleteHandlerStatus.INIT);
  protected deleteButton = signal<ButtonConfig>({
    type: ButtonType.FLAT,
    icon: 'delete',
    label: LocaleKeys.labels.buttons.yesDeleteIt,
    styleClass: ButtonStyleClass.BTN_WARN
  });
  protected cancelButton = signal<ButtonConfig>({
    type: ButtonType.BASIC,
    label: LocaleKeys.labels.buttons.cancel
  });
  protected okButton = signal<ButtonConfig>({
    type: ButtonType.FLAT,
    label: LocaleKeys.labels.buttons.ok
  });
  
  LocaleKeys = LocaleKeys;
  AnimationType = AnimationType;
  DeleteHandlerStatus = DeleteHandlerStatus;

  constructor() {
    effect(() => {
      this.setDeleteHandlerStatus(this.deleteResponse());
    });
  }

  private setDeleteHandlerStatus(
    response: DeletableResponse | null
  ): void {
    if (!response) {
      this.deleteHandlerStatus.set(DeleteHandlerStatus.INIT);
      return;
    }

    if (response.isDeletable) {
      this.deleteHandlerStatus.set(DeleteHandlerStatus.DELETABLE);
      return;
    }

    this.messages.set(response.blockers);
    this.deleteHandlerStatus.set(DeleteHandlerStatus.NOT_DELETABLE);
  }

  async deleteClicked(): Promise<void> {
    try {
      await firstValueFrom(this.store.dispatch(this.data.deleteActionInstance));
      this.dialogRef.close();
    } catch (error) { 
      console.error('Error on deletion', error);
    }
  }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetDeleteHandleState());
  }
}