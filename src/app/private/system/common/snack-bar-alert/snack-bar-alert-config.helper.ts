/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  MatSnackBarConfig, 
  MatSnackBarHorizontalPosition, 
  MatSnackBarVerticalPosition 
} from "@angular/material/snack-bar";
import { Alert } from "src/app/store/alerts";


export class SnackBarAlertConfigHelper {
  private static snackBarAlert = {
    success: {
      announcementMessage: '',
      horizontalPosition: 'end' as MatSnackBarHorizontalPosition,
      verticalPosition: 'bottom' as MatSnackBarVerticalPosition,
      duration: 3000,
      panelClass: 'alert-success',
      data: {
        icon: 'done'
      }
    },
    error: {
      announcementMessage: '',
      horizontalPosition: 'end' as MatSnackBarHorizontalPosition,
      verticalPosition: 'bottom' as MatSnackBarVerticalPosition,
      duration: 3000,
      panelClass: 'alert-error',
      data: {
        icon: 'error'
      }
    }
  };

  static createAlert(alert: Alert): MatSnackBarConfig {
    const { messageKey, type } = alert;
    const created = this.snackBarAlert[type];
    created.announcementMessage = messageKey;

    return created;
  }
}