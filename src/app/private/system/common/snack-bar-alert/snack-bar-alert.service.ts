/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Alert } from "src/app/store/alerts";
import { SnackBarAlertComponent } from "./snack-bar-alert.component";
import { SnackBarAlertConfigHelper } from "./snack-bar-alert-config.helper";

@Injectable({
  providedIn: 'root'
})
export class SnackBarAlertService {
  constructor(private snackbar: MatSnackBar) { }

  open(alert: Alert): void {
    const config = SnackBarAlertConfigHelper.createAlert(alert);
    this.snackbar.openFromComponent(SnackBarAlertComponent, config);
  }
}