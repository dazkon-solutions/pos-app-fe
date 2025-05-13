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
  effect, 
  inject, 
  OnInit, 
  signal
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup 
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { LocaleKeys } from 'src/app/common/constants';
import { 
  ButtonEvent, 
  Permission
} from 'src/app/common/enums';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { DialogFormActionsComponent } from 'src/app/private/system/common/dialog/dialog-form-actions/dialog-form-actions.component';
import { DialogHeaderConfig } from 'src/app/private/system/common/dialog/dialog-header';
import { DialogHeaderComponent } from 'src/app/private/system/common/dialog/dialog-header/dialog-header.component';
import { CustomErrorStateMatcher } from 'src/app/private/system/common/error-statement-matcher';
import { FORM_MAT_IMPORTS } from 'src/app/common/imports/form-imports';
import { WaitingOverlayComponent } from 'src/app/private/system/common/waiting-overlay/waiting-overlay.component';
import { CommonAutoCompleteComponent } from 'src/app/private/system/common/auto-completes/common-auto-complete/common-auto-complete.component';
import { PersonAutoCompleteComponent } from 'src/app/private/system/common/auto-completes/person-auto-complete/person-auto-complete.component';
import { SampleFormConfigHelper } from './sample-form-config';
import { SampleUIState } from 'src/app/store/sample';
import { CreateSample, SampleState, UpdateSample } from 'src/app/store/sample/data/sample.state';


@Component({
  selector: 'daz-sample',
  imports: [
    CORE_IMPORTS,
    FORM_MAT_IMPORTS,
    MatDialogModule,
    DialogHeaderComponent,
    DialogFormActionsComponent,
    WaitingOverlayComponent,
    CommonAutoCompleteComponent,
    PersonAutoCompleteComponent
  ],
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);
  private formBuilder = inject(FormBuilder);

  dialogHeaderConfig = signal<DialogHeaderConfig>({
    title: LocaleKeys.titles.createSample
  });

  isProcessing = this.store.selectSignal(SampleUIState.isProcessing);
  currentItem = this.store.selectSignal(SampleState.getCurrent);
  isSampleLoading = this.store.selectSignal(SampleUIState.isLoading);

  createPermission = signal<Permission>(Permission.CAN_CREATE_SAMPLE);
  updatePermission = signal<Permission>(Permission.CAN_UPDATE_SAMPLE);
  isFormEditable = signal<boolean>(false);
  isCreateMode = signal<boolean>(false);

  form: FormGroup;
  matcher = new CustomErrorStateMatcher();
  formTouched = false;
  LocaleKeys = LocaleKeys;

  constructor() {
    this.form = SampleFormConfigHelper.createForm(this.formBuilder);

    effect(() => {
      const currentItem = this.currentItem();
      const hasId = !!currentItem?.id;
      
      this.isFormEditable.set(!hasId);
      this.isCreateMode.set(!hasId);
      
      if (currentItem) {
        this.setFormData(currentItem);
      }

      this.isFormEditable() ? this.form.enable() : this.form.disable();
    });
  }

  ngOnInit(): void {
    this.form.get('sample')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v:any) => console.warn('chn',v));
  }

  private setFormData(formData: any): void {
    this.dialogHeaderConfig.set({
      title: LocaleKeys.titles.sample,
      value: 'SAL-23232'
    });
    
    this.form.patchValue({
      // set form date

    }, { emitEvent: false });
  }

  onSubmit(): void {
    console.warn('formValue',this.form.value)
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.formTouched = true;
      return;
    }

    const action = (this.form.value.id > 0)
      ? new UpdateSample(this.form.value)
      : new CreateSample(this.form.value);

    this.store.dispatch(action);

    console.warn('dialog action changed')
  }

  onToggleEditability(): void {
    this.isFormEditable.set(!this.isFormEditable());
  } 

  onFilterSample(filterTerm: string): void {
    console.warn('sample filter', filterTerm);
  }

  sampleFetchClicked(buttonEvent: ButtonEvent): void {
    // this.isSampleLoading$ = of(true);
    console.warn('fetch sample', buttonEvent);
  }

  getSampleList(): any[] {
    const list = [
      {
        id: 1,
        name: "Electronics",
        year: 2023
      },
      {
        id: 2,
        name: "Furniture",
        year: 2022
      },
      {
        id: 3,
        name: "Clothing",
        year: 2024
      },
      {
        id: 4,
        name: "Automotive",
        year: 2021
      },
      {
        id: 5,
        name: "Sports & Outdoors",
        year: 2023
      }
    ];
    return list;
  }

  getCustomerList(): any[] {
    const list = [
      {
        id: 1,
        name: "Samantha rathnayake",
        title: 'MR'
      },
      {
        id: 2,
        name: "Sugath bandara",
        title: 'MR'
      },
      {
        id: 3,
        name: "Nimesha ranathunga",
        title: 'MISS'
      },
      {
        id: 4,
        name: "Sarath dassanayake",
        title: 'MR'
      },
      {
        id: 5,
        name: "Mahesh bandara",
        title: 'MR'
      }
    ];
    return list;
  }
}