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
import { Observable } from 'rxjs';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
import { ActionResponse } from 'src/app/common/interfaces';
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
export class ActionButtonComponent implements OnInit {
  @Input({ 
    alias: 'config$',
    required: true
  })
  config$!: Observable<ActionButtonConfig>;

  @Output('buttonClicked')
  buttonClicked = new EventEmitter<ActionResponse>(true);

  button!: ActionButton;
  resource = Resource.NONE;
  isLoading = false;
  isDisabled = true;
  ActionButtonShape = ActionButtonShape;

  constructor(
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.config$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(config => this.button = this.createButton(config));
  }

  private createButton(config: ActionButtonConfig): ActionButton {
    const button = ActionButtonConfigHelper.createButton(config);
    // check permissions and update button configs.
    if(this.isDisabled !== config.isDisabled) {
      this.isDisabled = config.isDisabled ?? false;
    }

    if(this.resource !== config.resource) {
      this.resource = config.resource;
    }

    console.warn('changeeeeeeeeeeeee',button)
    return button;
  }

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if(this.isLoading) return;

    this.isLoading = true;
    this.isDisabled = true;

    const actionResponse: ActionResponse = {
      action: this.button.action,
      data: { resource: this.resource }
    };
    this.buttonClicked.emit(actionResponse);

    // Simulate an async operation (replace with your actual logic)
    setTimeout(() => {
      this.isLoading = false;
      this.isDisabled = false; // Reset to the button's disabled state
      this.cdr.detectChanges();
    }, 1000); // Adjust the timeout as needed
  }
}