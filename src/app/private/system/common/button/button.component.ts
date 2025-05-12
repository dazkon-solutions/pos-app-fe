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
  Output
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { Permission } from 'src/app/common/enums';
import { PermissionService } from 'src/app/common/services';
import { ButtonStyleClass, ButtonType } from './button-type.enum';


@Component({
  selector: 'daz-button',
  imports: [
    CORE_IMPORTS,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ButtonComponent {
  private permissionSvc = inject(PermissionService);

  type = input.required<ButtonType>();
  label = input<string | undefined>();
  icon = input<string | undefined>();
  tooltip = input<string | undefined>();
  styleClass = input<ButtonStyleClass | undefined>();
  permission = input<Permission | undefined>();
  isLoading = input<boolean | undefined>();
  isDisabled = input<boolean | undefined>();

  isButtonDisabled = computed(() => {
    const permission = this.permission() ?? Permission.DEFAULT;
    return (!this.permissionSvc.hasPermission(permission)) || 
      this.isLoading() || 
      this.isDisabled();
  });

  @Output('buttonClicked')
  buttonClicked = new EventEmitter<Permission>(true);

  ButtonType = ButtonType;

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if(this.isLoading()) return;

    this.buttonClicked.emit(this.permission());
  }
}