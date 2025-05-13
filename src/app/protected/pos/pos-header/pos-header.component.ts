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
  inject, 
  OnDestroy, 
  OnInit 
} from '@angular/core';
import { LocaleKeys } from 'src/app/common/constants';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { 
  NavigationService, 
  RoutePaths 
} from 'src/app/common/navigation';
import { POS_MAT_IMPORTS } from '../pos-imports';
import { CalculatorService } from '../../calculator/calculator.service';

@Component({
  selector: 'daz-pos-header',
  imports: [
    CORE_IMPORTS,
    POS_MAT_IMPORTS
  ],
  templateUrl: './pos-header.component.html',
  styleUrl: './pos-header.component.scss'
})
export class PosHeaderComponent implements 
  OnInit,
  OnDestroy 
{
  private navigationSvc = inject(NavigationService);
  private calSvc = inject(CalculatorService);
  
  hour = 0;
  minute = 0;
  second = 0;
  period = 'AM';
  intervalId: any;
  date = '';

  LocaleKeys = LocaleKeys;

  ngOnInit(): void {
    this.updateDate();
    
    this.updateTime();
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  private updateDate(): void {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    this.date = `${day}/${month}/${year}`;
  }

  private updateTime() {
    const now = new Date();
    this.hour = now.getHours();
    this.period = this.hour >= 12 ? 'PM' : 'AM';
    this.minute = now.getMinutes();
    this.second = now.getSeconds();
  }

  navigateToDashboard(): void {
    this.navigationSvc.navigateTo(RoutePaths.DASHBOARD);
  }

  openCalculator(): void {
    this.calSvc.open();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}