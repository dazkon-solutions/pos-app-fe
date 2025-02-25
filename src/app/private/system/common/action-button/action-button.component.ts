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
  ChangeDetectorRef,
  Component, 
  DestroyRef, 
  EventEmitter, 
  Input, 
  OnInit,
  Output
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { 
  firstValueFrom, 
  Observable 
} from 'rxjs';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { Action } from 'src/app/common/enums';
import { PermissionService } from 'src/app/common/services';
import { ACTION_BUTTON_MAT_IMPORTS } from './action-button-imports';
import { 
  ActionButton, 
  ActionButtonConfig 
} from './action-button.interface';
import { ActionButtonConfigHelper } from './action-button-config.helper';
import { ActionButtonShape } from './action-button-type.enum';


@Component({
  selector: 'daz-action-button',
  imports: [
    CORE_IMPORTS,
    ACTION_BUTTON_MAT_IMPORTS
  ],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ActionButtonComponent implements OnInit {
  @Input({ 
    alias: 'config$',
    required: true
  })
  config$!: Observable<ActionButtonConfig>;

  @Output('buttonClicked')
  buttonClicked = new EventEmitter<Action>(true);

  button!: ActionButton;
  isAllowed = false;
  action = Action.DEFAULT;
  isLoading = false;
  isDisabled = true;
  ActionButtonShape = ActionButtonShape;

  constructor(
    private destroyRef: DestroyRef,
    private permissionSvc: PermissionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.config$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async config => {
        this.button = await this.createButton(config);
        this.cdr.detectChanges();
      });
  }

  private async createButton(config: ActionButtonConfig): Promise<ActionButton> {
    this.action = config.action;
    const button = ActionButtonConfigHelper.createButton(config);

    // Check permission
    this.isAllowed = await firstValueFrom(
      this.permissionSvc.hasPermission(config.action));

    this.isDisabled = !this.isAllowed;
      
    // Manually disable
    if(this.isAllowed === config.isDisabled) {
      this.isDisabled = config.isDisabled ?? false;
    }

    // Loading buttons should disabled
    if(config.isLoading) {
      this.isLoading = true;
      this.isDisabled = true;
    } else {
      this.isLoading = false;
    }
    
    return button;
  }

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if(this.isLoading) return;

    this.buttonClicked.emit(this.action);
  }
}