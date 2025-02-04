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
  EventEmitter, 
  Input, 
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { 
  firstValueFrom,
  Observable, 
  of 
} from 'rxjs';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { LocaleKeys } from 'src/app/common/constants';
import { 
  Action, 
  Resource 
} from 'src/app/common/enums';
import { ActionResponse } from 'src/app/common/interfaces';
import { DialogService } from 'src/app/common/services';
import { DynamicGridItemConfig } from '../dynamic-grid.interface';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from '../../action-button';
import { ActionButtonComponent } from '../../action-button/action-button.component';
import { DynamicGridItemOptionsComponent } from '../dynamic-grid-item-options/dynamic-grid-item-options.component';
import { DYNAMIC_GRID_MAT_IMPORTS } from '../dynamic-grid-imports';

@Component({
  selector: 'daz-dynamic-grid-item',
  imports: [
    CORE_IMPORTS,
    DYNAMIC_GRID_MAT_IMPORTS,
    ActionButtonComponent
  ],
  templateUrl: './dynamic-grid-item.component.html',
  styleUrl: './dynamic-grid-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicGridItemComponent implements OnChanges {
  @Input({ 
    alias: 'gridItemConfig', 
    required: true
  })
  gridItemConfig!: DynamicGridItemConfig | null;

  @Input({ 
    alias: 'item', 
    required: true
  })
  item: any;

  @Output('buttonClicked')
  buttonClicked = new EventEmitter<ActionResponse>(true);

  config: DynamicGridItemConfig = { 
    titleKey: '',
    primaryActionButtonConfig: {
      resource: Resource.NONE,
      type: ActionButtonType.VIEW
    }
  };
  LocaleKeys = LocaleKeys;

  constructor(
    private cdr: ChangeDetectorRef,
    private dialogSvc: DialogService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if('gridItemConfig' in changes) {
      if(this.gridItemConfig) {
        this.config = this.gridItemConfig;
      }
      this.cdr.detectChanges();
    }

    if('item' in changes) {
      this.cdr.detectChanges();
    }
  }

  onClick(
    action: Action, 
    data: any
  ): void {
    this.buttonClicked.emit({ action, data });
  }

  async onClickOptions(
    event: MouseEvent,
    config: DynamicGridItemConfig | null,
    element: any
  ): Promise<void> {
    event.stopPropagation();
    event.preventDefault();

    if(!config || !config.optionActionButtonConfigs) return;

    const buttonConfigs = config.optionActionButtonConfigs.map(config => 
      this.checkButtonDisable(config, 
                              element));

    const dialogRef = await this.dialogSvc.open(DynamicGridItemOptionsComponent, {
      data: buttonConfigs,
      autoFocus: true
    });

    const action = await firstValueFrom(dialogRef.afterClosed());
    this.onClick(action, 
                 element);
  }

  private checkButtonDisable(
    config: ActionButtonConfig,
    element: any
  ): ActionButtonConfig {
    const isDisabled = config.disableCondition 
      ? config.disableCondition(element)
      : false;

    config.isDisabled = isDisabled;

    return config;
  }

  getButtonConfigObservable(
    config: ActionButtonConfig,
    element: any
  ): Observable<ActionButtonConfig> {
    const buttonConfig = this.checkButtonDisable(config, 
                                                 element);
    return of(buttonConfig);
  }
}