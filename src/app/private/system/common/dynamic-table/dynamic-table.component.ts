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
  Input, 
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
import { ThemeService } from 'src/app/common/services';
import { DynamicTableColumnConfig } from './dynamic-table.interface';

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
  OnChanges
{
  @Input('data')
  data: any[] = [];

  @Input('tableColumnConfigs')
  tableColumnConfigs: DynamicTableColumnConfig[] = [];

  dataSource: any[] = [];
  displayedColumns: DynamicTableColumnConfig[] = [];
  columnsToDisplay: string[] = [];
  headerColor = '';

  constructor(
    private themeSvc: ThemeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.themeSvc.isLightTheme$().subscribe(isLightTheme => 
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
}