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
  EventEmitter, 
  Input, 
  OnChanges, 
  Output, 
  SimpleChanges
} from '@angular/core';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
import { Resource } from 'src/app/common/enums';
import { 
  ActionButton, 
  ActionButtonConfig 
} from './action-button.interface';
import { ActionButtonConfigHelper } from './action-button-config.helper';
import { ActionButtonShape } from './action-button-type.enum';

@Component({
  selector: 'daz-action-button',
  imports: [
    StandaloneCommonModule,
    MaterialModule
  ],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonComponent implements OnChanges {
  @Input('config')
  config!: ActionButtonConfig;

  @Output('buttonClicked')
  buttonClicked = new EventEmitter<Resource>(true);

  button!: ActionButton;
  ActionButtonShape = ActionButtonShape;
  isLoading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if('config' in changes) {
      this.button = this.createButton();
    }
  }

  private createButton(): ActionButton {
    const button = ActionButtonConfigHelper.createButton(this.config.type);
    // check permissions and update button configs.
    button.isDisabled = this.config.isDisabled;
    return button;
  }

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if(this.isLoading) return;

    this.isLoading = true;
    this.button.isDisabled = true;

    this.buttonClicked.emit(this.config.resource);
  }
}