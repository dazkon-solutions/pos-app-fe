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
  ElementRef, 
  EventEmitter, 
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
  FormControl
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { 
  debounceTime, 
  Observable, 
  Subject 
} from 'rxjs';
import { LocaleKeys } from 'src/app/common/constants';
import { ButtonEvent } from 'src/app/common/enums';
import { CustomErrorStateMatcher } from '../error-statement-matcher';

@Component({
  template: ''
})
export abstract class BaseAutoCompleteComponent implements 
  ControlValueAccessor,
  OnInit,
  OnChanges
{
  @ViewChild('input') 
  input!: ElementRef<HTMLInputElement>;
  
  @Input('dataSource$') 
  dataSource$!: Observable<any[]>;

  @Input('isLoading$') 
  isLoading$!: Observable<boolean>;

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

  @Output('fetchDataClicked') 
  fetchDataClicked = new EventEmitter<ButtonEvent>(true);
  
  filterSubject$ = new Subject<string>();
  clickTimeout: any;
  ctrlLabel = 'name';
  ctrlDisplayProperty = 'name';
  ctrlFilterProperty = 'name';
  LocaleKeys = LocaleKeys;
  ButtonEvent = ButtonEvent;
  myControl = new FormControl();
  matcher = new CustomErrorStateMatcher();
  isRefetchDoubleClicked = false; 

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

  onClickReset(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    this.myControl.reset(null);
  }

  // Use a method to identify single click and double click
  onClickRefetch(
    event: MouseEvent,
    buttonEvent: ButtonEvent
  ): void {
    event.stopPropagation();
    event.preventDefault();

    if(buttonEvent === ButtonEvent.DOUBLE_CLICK) {
      this.isRefetchDoubleClicked = true;
      clearTimeout(this.clickTimeout);
      this.fetchDataClicked.emit(buttonEvent);
      
      setTimeout(() => {
        this.isRefetchDoubleClicked = false;
      }, 300);
      return;
    }
  
    if(this.isRefetchDoubleClicked) return;

    this.clickTimeout = setTimeout(() => {
      if(!this.isRefetchDoubleClicked) {
        this.fetchDataClicked.emit(buttonEvent);
      }
    }, 300); 
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
    return option 
      ? option[this.ctrlDisplayProperty] 
      : '';
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