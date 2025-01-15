/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';


const modules = [
  CommonModule,
  TranslateModule,
  FormsModule,
  ReactiveFormsModule
];


@NgModule({
  imports: modules,
  exports: modules
})
export class StandaloneCommonModule { }