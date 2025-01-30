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
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
import { Action } from 'src/app/common/enums';
import { SubscriptionHelper } from 'src/app/common/helpers';
import { ThemeService } from 'src/app/common/services';
import { ActionResponse } from 'src/app/common/interfaces';
import { DynamicTableColumnConfig } from './dynamic-table.interface';
import { DynamicTableColumnType } from './dynamic-table.enum';

@Component({
  selector: 'daz-dynamic-table',
  imports: [
    StandaloneCommonModule,
    MaterialModule
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent implements 
  OnInit,
  OnChanges,
  OnDestroy
{
  @Input('data')
  data: any[] = [];

  @Input('tableColumnConfigs')
  tableColumnConfigs: DynamicTableColumnConfig[] = [];

  @Output('buttonClicked')
  buttonClicked = new EventEmitter<ActionResponse>(true);

  dataSource: any[] = [];
  displayedColumns: DynamicTableColumnConfig[] = [];
  columnsToDisplay: string[] = [];
  headerColor = '';
  DynamicTableColumnType = DynamicTableColumnType;
  Action = Action;

  private destroy$ = new Subject<void>();

  constructor(
    private themeSvc: ThemeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.themeSvc.isLightTheme$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLightTheme => 
      this.setHeaderColor(isLightTheme));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if('tableColumnConfigs' in changes) {
      this.displayedColumns = this.tableColumnConfigs;
      this.columnsToDisplay = 
        this.displayedColumns.flatMap(column => column.name).slice();
    }

    if('data' in changes) {
      this.dataSource = this.data;
      this.cdr.detectChanges();
    }
  }

  private setHeaderColor(isLightTheme: boolean): void {
    const DARK = '#000100';
    const LIGHT = '#F3F3F3';

    this.headerColor = isLightTheme ? LIGHT : DARK;
    this.cdr.detectChanges();
  }

  isSideHeader(
    side: 'LEFT' | 'RIGHT',
    columnName: string
  ): boolean {
    const columnNames = this.displayedColumns.flatMap(column => column.name);
    const columnCount = columnNames.length;

    if(columnCount < 1) return false;

    if(side === 'LEFT') {
      return (columnNames[0] === columnName ); 
    } else if(side === 'RIGHT') {
      return (columnNames[columnCount - 1] === columnName);
    } else {
      return false;
    }
  }

  onClick(
    action: Action, 
    data: any
  ): void {
    this.buttonClicked.emit({ action, data });
  }

  ngOnDestroy(): void {
    SubscriptionHelper.destroy(this.destroy$);
  }
}