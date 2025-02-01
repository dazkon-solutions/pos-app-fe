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
import { 
  Observable,
  of
} from 'rxjs';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
import { 
  Action, 
  CustomAction 
} from 'src/app/common/enums';
import { ThemeService } from 'src/app/common/services';
import { ActionResponse } from 'src/app/common/interfaces';
import { DynamicTableColumnConfig } from './dynamic-table.interface';
import { DynamicTableColumnType } from './dynamic-table.enum';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { ActionButtonConfig } from '../action-button';
import { TableSkeletonWithImageComponent } from '../skeletons/table-skeleton-with-image/table-skeleton-with-image.component';

@Component({
  selector: 'daz-dynamic-table',
  imports: [
    StandaloneCommonModule,
    MaterialModule,
    ActionButtonComponent,
    TableSkeletonWithImageComponent
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent implements OnInit {
  @Input('tableColumnConfigs$')
  tableColumnConfigs$!: Observable<DynamicTableColumnConfig[]>;

  @Input('dataSource$')
  dataSource$!: Observable<any[]>;

  @Input('isLoading$')
  isLoading$!: Observable<boolean>;

  @Output('buttonClicked')
  buttonClicked = new EventEmitter<ActionResponse>(true);

  displayedColumns: DynamicTableColumnConfig[] = [];
  columnsToDisplay: string[] = [];
  headerColor = '';
  DynamicTableColumnType = DynamicTableColumnType;
  Action = Action;

  constructor(
    private destroyRef: DestroyRef,
    private themeSvc: ThemeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.themeSvc.isLightTheme$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(isLightTheme => this.setHeaderColor(isLightTheme));

    this.tableColumnConfigs$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(configs => {
        this.displayedColumns = configs;
        this.columnsToDisplay = configs.flatMap(column => column.name).slice();
        this.cdr.detectChanges();
      });
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
    action: Action | CustomAction, 
    data: any
  ): void {
    this.buttonClicked.emit({ action, data });
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