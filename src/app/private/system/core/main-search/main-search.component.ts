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
  DestroyRef,
  inject,
  input,
  OnInit,
  signal
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { Store } from '@ngxs/store';
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormHelper } from 'src/app/common/helpers';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { 
  MainSearchConfig,
  MainSearchState
} from 'src/app/store/main-search';
import { LocaleKeys } from 'src/app/common/constants';
import { Action } from 'src/app/common/enums';
import { ActionService } from 'src/app/common/services';


@Component({
  selector: 'daz-main-search',
  imports: [
    CORE_IMPORTS,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatButtonModule
  ],
  templateUrl: './main-search.component.html',
  styleUrl: './main-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSearchComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(FormBuilder);
  private store = inject(Store);
  private actionSvc = inject(ActionService);

  config = input.required<MainSearchConfig | null>();

  isFilterActivated = signal<boolean>(false);
  form: FormGroup;
  LocaleKeys = LocaleKeys;

  constructor() {
    this.form = this.createForm(this.formBuilder);
    this.onSearchValue();
  }

  ngOnInit(): void {
    this.syncFilterChanges();
  }

  private syncFilterChanges(): void {
    this.store.select(MainSearchState.isFilterActivated)
      .pipe(
        takeUntilDestroyed(this.destroyRef), 
        distinctUntilChanged())
      .subscribe(isFilterActivated => {
        this.isFilterActivated.set(isFilterActivated);
        this.handleFormActivation(isFilterActivated);
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
    this.form.patchValue({ search: null }, { emitEvent: false });
  }

  onSearchValue(): void {
    FormHelper.setupDebouncedFilter(
      this.form.get('search'), 
      () => {
        if (this.form.invalid) return;

        const searchTerm = this.form.get('search')?.value;

        if (searchTerm === null) return; // only check nulls. empty strings should accept

        this.actionSvc.emitAction({
          action: Action.PERFORM_MAIN_SEARCH,
          payload: searchTerm.trim()
        });
      },
      this.destroyRef
    );
  }

  hasSearchValue(): boolean {
    return !!this.form.get('search')?.value;
  }

  onClickClearForm(): void {
    this.clearForm();
    this.actionSvc.emitAction({
      action: Action.PERFORM_MAIN_SEARCH,
      payload: ''
    });
  }

  onClickAdvancedFilter(): void {
    this.actionSvc.emitAction({
      action: Action.OPEN_ADVANCED_FILTER,
      payload: null
    });
  }
}