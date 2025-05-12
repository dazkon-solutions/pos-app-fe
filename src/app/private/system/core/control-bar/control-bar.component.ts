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
  inject,
  input,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngxs/store';
import { MenuState } from 'src/app/store/menu-config';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { 
  Action, 
  Resource
} from 'src/app/common/enums';
import { ActionService } from 'src/app/common/services';
import { LocaleKeys } from 'src/app/common/constants';
import { MainSearchComponent } from '../main-search/main-search.component';
import { ControlBarConfigHelper } from './control-bar-config.helper';
import { ButtonComponent } from '../../common/button/button.component';
import { 
  ButtonConfig, 
  ButtonType 
} from '../../common/button';
import { MainSearchState } from 'src/app/store/main-search';


@Component({
  selector: 'daz-control-bar',
  imports: [
    CORE_IMPORTS,
    MatToolbarModule,
    MainSearchComponent,
    ButtonComponent
  ],
  templateUrl: './control-bar.component.html',
  styleUrl: './control-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlBarComponent {
  private actionSvc = inject(ActionService);
  private store = inject(Store);

  resource = input.required<Resource | null>();

  mainSearchConfig = this.store.selectSignal(MainSearchState.getConfig);
  currentMenuItem = this.store.selectSignal(MenuState.getCurrent);
  btnToAddNew = computed(() => 
    this.createButtonByResource(this.resource() ?? Resource.DASHBOARD));

  private createButtonByResource(resource: Resource): ButtonConfig {
    const permission = 
      ControlBarConfigHelper.getResourcePermissionForAddNewBtn(resource);

    if (!permission) return { type: ButtonType.FLAT };

    return {
      type: ButtonType.FLAT,
      permission: permission,
      label: LocaleKeys.labels.buttons.addNew,
      icon: 'add'
    };
  }

  addNewButtonClickHandle(): void {
    this.actionSvc.emitAction({ 
      action: Action.OPEN_FORM_DIALOG,
      payload: { }
    });
  }
}