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
  OnDestroy,
  OnInit
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators
} from '@angular/forms';
import { 
  distinctUntilChanged,
  Subject, 
  takeUntil
} from 'rxjs';
import { Store } from '@ngxs/store';
import { 
  FormHelper, 
  SubscriptionHelper 
} from 'src/app/common/helpers';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';
import { 
  MainSearchConfig,
  MainSearchState, 
  DeactivateMainSearchFilter,
  SetMainSearchTerm,
  SetMainSearchByResource,
  MainSearchStateConfigHelper
} from 'src/app/store';
import { LocaleKeys } from 'src/app/common/constants';
import { 
  Navigator, 
  SearchPanelService 
} from 'src/app/common/services';


@Component({
  selector: 'daz-main-search',
  imports: [
    StandaloneCommonModule,
    MaterialModule
  ],
  templateUrl: './main-search.component.html',
  styleUrl: './main-search.component.scss'
})
export class MainSearchComponent implements 
  OnInit, 
  OnDestroy 
{
  config: MainSearchConfig = MainSearchStateConfigHelper.defaultConfig();
  form: FormGroup;
  LocaleKeys = LocaleKeys;
  isFiltered = false;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private searchPanelSvc: SearchPanelService,
    private navigateSvc: Navigator
  ) {
    this.form = this.createForm(this.formBuilder);
    this.onSearchValue();
  }

  ngOnInit(): void {
    this.init();
    this.syncState();
    this.syncFilterChanges();
  }

  private init(): void {
    this.navigateSvc.navigator$
      .pipe(takeUntil(this.destroy$))
      .subscribe(resource => 
        this.store.dispatch(new SetMainSearchByResource(resource)));
  }

  private syncState(): void {
    this.store.select(MainSearchState.getConfig)
      .pipe(takeUntil(this.destroy$))
      .subscribe(config => {
        this.config = config;
        this.handleFormActivation(!config.isFilterAvailable);
      });
  }

  private syncFilterChanges(): void {
    this.store.select(MainSearchState.isFiltered)
      .pipe(
        takeUntil(this.destroy$), 
        distinctUntilChanged())
      .subscribe(filtered => {
        this.isFiltered = filtered;
        this.handleFormActivation(filtered);
        this.clearForm();
      });
  }

  private handleFormActivation(isFilterd: boolean): void {
    isFilterd 
      ? this.form.disable() 
      : this.form.enable();
  }

  private createForm(formBuilder: FormBuilder): any {
    return formBuilder.group({
      search: [
        { 
          value: '',
          disabled: false,
        },
        [Validators.maxLength(255)]
      ]
    });
  }

  private clearForm(): void {
    this.form.patchValue({ search: '' });
  }

  onSearchValue(): void {
    FormHelper.setupDebouncedFilter(
      this.form.get('search'), 
      () => {
        if(this.form.invalid) return;

        const searchTerm = this.form.get('search')?.value.trim();
        this.store.dispatch(new SetMainSearchTerm(searchTerm));
      },
      this.destroy$
    );
  }

  hasSearchValue(): boolean {
    return !!this.form.get('search')?.value;
  }

  onClickClearForm(): void {
    this.clearForm();
    this.store.dispatch(new DeactivateMainSearchFilter());
  }

  onClickAdvancedFilter(): void {
    // this.searchPanelSvc.onClickOpen(this.config.resource);
  }

  ngOnDestroy(): void {
    SubscriptionHelper.destroy(this.destroy$);
  }
}