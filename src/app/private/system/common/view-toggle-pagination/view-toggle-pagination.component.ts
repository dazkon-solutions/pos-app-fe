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
  EventEmitter, 
  Input, 
  Output 
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { LocaleKeys } from 'src/app/common/constants';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { VIEW_TOGGLE_PAGINATION_MAT_IMPORTS } from './view-toggle-pagination-imports';

enum ViewType {
  LIST,
  GRID
};

@Component({
  selector: 'daz-view-toggle-pagination',
  imports: [
    CORE_IMPORTS,
    VIEW_TOGGLE_PAGINATION_MAT_IMPORTS
  ],
  templateUrl: './view-toggle-pagination.component.html',
  styleUrl: './view-toggle-pagination.component.scss'
})
export class ViewTogglePaginationComponent {
  @Input('isListView$')
  isListView$!: Observable<boolean>;

  @Input('pagination$')
  pagination$!: Observable<PageEvent>;
    
  @Output('viewToggled')
  viewToggled = new EventEmitter<boolean>(true);

  @Output('refreshClicked')
  refreshClicked = new EventEmitter<boolean>(true);

  @Output('paginationChanged')
  paginationChanged = new EventEmitter<PageEvent>(true);

  LocaleKeys = LocaleKeys;
  ViewType = ViewType;

  onClickToggle(
    event: MouseEvent,
    isListView: boolean,
    viewType: ViewType
  ): void {
    event.stopPropagation();
    event.preventDefault();

    if((viewType === ViewType.LIST) && isListView) return;

    if((viewType === ViewType.GRID) && !isListView) return;

    this.viewToggled.emit(true);
  }

  onClickRefresh(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    this.refreshClicked.emit(true);
  }

  async onChangePaginations(page: PageEvent): Promise<void> {
    this.paginationChanged.emit(page);
  }
}