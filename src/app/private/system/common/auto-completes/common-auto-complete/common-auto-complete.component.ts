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
  ElementRef, 
  EventEmitter, 
  forwardRef, 
  Input, 
  OnChanges, 
  OnInit, 
  Output, 
  SimpleChanges, 
  ViewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { 
  ControlValueAccessor, 
  FormControl, 
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { 
  debounceTime, 
  Observable, 
  Subject 
} from 'rxjs';
import { LocaleKeys } from 'src/app/common/constants';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { FORM_MAT_IMPORTS } from 'src/app/common/imports/form-imports';
import { CustomErrorStateMatcher } from '../../error-statement-matcher';


@Component({
  selector: 'daz-common-auto-complete',
  imports: [
    CORE_IMPORTS,
    FORM_MAT_IMPORTS
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonAutoCompleteComponent),
      multi: true
    }
  ],
  templateUrl: './common-auto-complete.component.html',
  styleUrl: './common-auto-complete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonAutoCompleteComponent implements 
  ControlValueAccessor,
  OnInit,
  OnChanges
{
  @ViewChild('input') 
  input!: ElementRef<HTMLInputElement>;
  
  @Input('dataSource$') 
  dataSource$!: Observable<any[]>;

  @Input('label') 
  label!: string ;
  
  @Input('displayProperty') 
  displayProperty!: string;
  
  @Input('validators') 
  validators: any;

  @Input('isParentTouched')
  isParentTouched = false;

  @Output('filterTerm') 
  filterTerm = new EventEmitter<string>(true);
  
  filterSubject$ = new Subject<string>();
  ctrlLabel = 'name';
  ctrlDisplayProperty = 'name';
  ctrlFilterProperty = 'name';
  LocaleKeys = LocaleKeys;
  myControl = new FormControl();
  matcher = new CustomErrorStateMatcher();

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this.setNullForEmptySelection();
    this.emitFilterTerm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if('label' in changes) {
      this.ctrlLabel = this.label;
    }
    if('displayProperty' in changes) {
      this.ctrlDisplayProperty = this.displayProperty;
    }
    if('validators' in changes) {
      this.setValidators(this.validators);
    }
    if('isParentTouched' in changes) {
      this.markAsTouched();
    }
  }

  private emitFilterTerm(): void {
    this.filterSubject$
      .pipe(
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => this.filterTerm.emit(value));
  }

  filter(): void {
    const filterValue = this.input?.nativeElement.value.toLowerCase();
    this.filterSubject$.next(filterValue);
  }

  private markAsTouched(): void {
    if(!this.isParentTouched) return;

    this.myControl.markAsTouched();
  }

  private setValidators(validators: any): void {
    this.myControl.addValidators(validators);
    this.myControl.updateValueAndValidity();
  }

  // Handle option selection
  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.onTouched();
    const selectedValue = event.option.value;
    this.onChange(selectedValue); // Notify the parent form of the new value
  }

  // Control how the selected value is displayed in the input field
  displayFn = (option: any): string => {
    return option ? option[this.ctrlDisplayProperty] : '';
  };

  private setNullForEmptySelection(): void {
    this.myControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        if(!value || value === '') {
          this.onChange(null);
        }
      });
  }

  // ControlValueAccessor methods
  writeValue(obj: any): void {
    this.myControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.myControl.disable() : this.myControl.enable();
  }
}