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
  DestroyRef,
  OnInit
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { Store } from '@ngxs/store';
import { FormHelper } from 'src/app/common/helpers';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { 
  MainSearchConfig,
  MainSearchState, 
  DeactivateMainSearchFilter,
  SetMainSearchTerm,
  SetMainSearchByResource
} from 'src/app/store/main-search';
import { LocaleKeys } from 'src/app/common/constants';
import { MenuState } from 'src/app/store/menu-config';
import { 
  Action, 
  Resource 
} from 'src/app/common/enums';
import { ActionService } from 'src/app/common/services';
import { MAIN_SEARCH_MAT_IMPORTS } from './main-search-imports';


@Component({
  selector: 'daz-main-search',
  imports: [
    CORE_IMPORTS,
    MAIN_SEARCH_MAT_IMPORTS
  ],
  templateUrl: './main-search.component.html',
  styleUrl: './main-search.component.scss'
})
export class MainSearchComponent implements OnInit {
  config!: MainSearchConfig;
  form: FormGroup;
  LocaleKeys = LocaleKeys;
  isFilterActivated = false;

  constructor(
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
    private store: Store,
    private actionSvc: ActionService
  ) {
    this.form = this.createForm(this.formBuilder);
    this.onSearchValue();
  }

  ngOnInit(): void {
    this.syncState();
    this.syncFilterChanges();
  }

  private syncState(): void {
    this.store.select(MenuState.getCurrent)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(current => {
        if(current) { 
          this.store.dispatch(new SetMainSearchByResource(current.resource));
          this.store.dispatch(new DeactivateMainSearchFilter()); // Reset for new page
        }
      });

    this.store.select(MainSearchState.getConfig)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(config => {
        this.config = config;

        // Disable filter form-field if not available filter for the page
        config.resource === Resource.NONE
          ? this.form.disable()
          : this.form.enable();
      });
  }

  private syncFilterChanges(): void {
    this.store.select(MainSearchState.isFilterActivated)
      .pipe(
        takeUntilDestroyed(this.destroyRef), 
        distinctUntilChanged())
      .subscribe(isFilterActivated => {
        this.isFilterActivated = isFilterActivated;
        this.handleFormActivation(isFilterActivated);
        this.clearForm();
      });
  }

  private handleFormActivation(isFilterd: boolean): void {
    if(!this.config.resource) return;
    
    if(this.config.resource === Resource.NONE) return;

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
      this.destroyRef
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
    this.actionSvc.emitAction({
      action: Action.OPEN_ADVANCED_FILTER,
      payload: null
    });
  }
}