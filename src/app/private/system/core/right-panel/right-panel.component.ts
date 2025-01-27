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
  OnDestroy, 
  OnInit
} from '@angular/core';
import { 
  Subject, 
} from 'rxjs';
import { SubscriptionHelper } from 'src/app/common/helpers';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';


@Component({
  selector: 'daz-right-panel',
  imports: [
    StandaloneCommonModule,
    MaterialModule
  ],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightPanelComponent implements 
  OnInit,
  OnDestroy
{
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    SubscriptionHelper.destroy(this.destroy$);
  }
}