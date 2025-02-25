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
  DestroyRef, 
  Inject, 
  OnInit 
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { 
  BehaviorSubject,
  Observable
} from 'rxjs';
import { Store } from '@ngxs/store';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { LocaleKeys } from 'src/app/common/constants';
import { DeleteHandleState } from 'src/app/store/delete-handle';
import { Action } from 'src/app/common/enums';
import { DELETE_HANDLER_MAT_IMPORTS } from './delete-handler-imports';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from '../action-button';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { AnimationPlayerComponent } from '../animation-player/animation-player.component';
import { AnimationType } from '../animation-player';
import { DeleteHandleSkeletonComponent } from '../skeletons/delete-handler-skeleton/delete-handler-skeleton.component';
import { DeleteHandlerConfig } from './delete-handler.interface';

@Component({
  selector: 'daz-delete-handler',
  imports: [
    CORE_IMPORTS,
    DELETE_HANDLER_MAT_IMPORTS,
    ActionButtonComponent,
    AnimationPlayerComponent,
    DeleteHandleSkeletonComponent
  ],
  templateUrl: './delete-handler.component.html',
  styleUrl: './delete-handler.component.scss'
})
export class DeleteHandlerComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  isProcessing$!: Observable<boolean>;
  isDeletable$!: Observable<boolean>;
  errorMessages$!: Observable<string[]>;
  deleteButton$ = new BehaviorSubject<ActionButtonConfig>({
    action: Action.DEFAULT,
    type: ActionButtonType.DELETE,
  });
  deleteAction = Action.DEFAULT;
  LocaleKeys = LocaleKeys;
  AnimationType = AnimationType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteHandlerConfig,
    private destroyRef: DestroyRef,
    private store: Store
  ) { 
    this.deleteAction = this.data.deleteAction;
    this.updateDeleteButton();
  }

  ngOnInit(): void {
    this.syncState();
  }
  
  private syncState(): void {
    this.isLoading$ = this.store.select(DeleteHandleState.isLoading);
    this.isDeletable$ = this.store.select(DeleteHandleState.isDeletable);
    this.isProcessing$ = this.store.select(DeleteHandleState.isProcessing);
    this.errorMessages$ = this.store.select(DeleteHandleState.getErrorMessages);

    this.isProcessing$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(isProcessing => this.updateDeleteButton(isProcessing));
  }

  private updateDeleteButton(isLoading?: boolean): void {
    this.deleteButton$.next({
      action: this.deleteAction,
      type: ActionButtonType.DELETE,
      isLoading
    });
  }

  deleteClicked(data: any): void {
    this.store.dispatch(this.data.deleteActionInstance);
  }
}