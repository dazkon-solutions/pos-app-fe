/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

export enum ActionButtonType {
  ADD = 'add',
  CREATE = 'create',
  UPDATE = 'update',
  VIEW = 'view',
  DELETE = 'delete',
  DELETE_FAB = 'deleteFab'
}

export enum ActionButtonShape {
  FAB_EXTENDED = 'FAB_EXTENDED',
  MINI_FAB = 'MINI_FAB'
}

export enum ActionButtonStyleClass {
  NONE = '',
  BTN_FAB_PRIMARY = 'btn-fab-primary',
  BTN_FAB_WARN = 'btn-fab-warn',
  BTN_MINI_FAB_WARN = 'btn-mini-fab-warn',
}