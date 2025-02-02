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
  Observable, 
  of 
} from 'rxjs';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
import { LocaleKeys } from 'src/app/common/constants';
import { 
  Action, 
  CustomAction, 
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

@Component({
  selector: 'daz-dynamic-grid-item',
  imports: [
    StandaloneCommonModule,
    MaterialModule,
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
      // console.warn(this.item)
      this.cdr.detectChanges();
    }
  }

  onClick(
    action: Action | CustomAction, 
    data: any
  ): void {
    this.buttonClicked.emit({ action, data });
  }

  onClickOptions(
    event: MouseEvent,
    config: DynamicGridItemConfig | null
  ): void {
    event.stopPropagation();
    event.preventDefault();

    if(!config || !config.optionActionButtonConfigs) return;

    this.dialogSvc.open(DynamicGridItemOptionsComponent, {
      data: config.optionActionButtonConfigs
    });
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