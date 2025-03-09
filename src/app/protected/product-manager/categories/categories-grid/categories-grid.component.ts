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
  Component 
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Action } from 'src/app/common/enums';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { GRID_VIEW_MAT_IMPORTS } from 'src/app/common/imports/grid-view-imports';
import { 
  ActionButtonConfig, 
  ActionButtonType 
} from 'src/app/private/system/common/action-button';
import { ActionButtonComponent } from 'src/app/private/system/common/action-button/action-button.component';
import { AnimationPlayerComponent } from 'src/app/private/system/common/animation-player/animation-player.component';
import { BaseGridViewComponent } from 'src/app/private/system/common/base-grid-view-component';
import { GridItemSkeletonComponent } from 'src/app/private/system/common/skeletons/grid-item-skeleton/grid-item-skeleton.component';

@Component({
  selector: 'daz-categories-grid',
  imports: [
    CORE_IMPORTS,
    GRID_VIEW_MAT_IMPORTS,
    ActionButtonComponent,
    GridItemSkeletonComponent,
    AnimationPlayerComponent
  ],
  templateUrl: './categories-grid.component.html',
  styleUrl: './categories-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesGridComponent extends BaseGridViewComponent<any> {
  protected initializeButtons(): void {
    this.viewButton$ = new BehaviorSubject<ActionButtonConfig>({
      action: Action.VIEW_CATEGORY,
      type: ActionButtonType.VIEW
    });
  
    this.deleteButton$ = new BehaviorSubject<ActionButtonConfig>({
      action: Action.DELETE_CATEGORY,
      type: ActionButtonType.DELETE_MENU_ITEM
    });
  }
}