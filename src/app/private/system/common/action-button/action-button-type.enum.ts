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
  EDIT = 'edit',
  DELETE = 'delete',
  DELETE_FAB = 'deleteFab',
  DELETE_MENU_ITEM = 'deleteMenuItem'
}

export enum ActionButtonShape {
  FAB_EXTENDED = 'FAB_EXTENDED',
  MINI_FAB = 'MINI_FAB',
  MENU_ITEM = 'MENU_ITEM'
}

export enum ActionButtonStyleClass {
  DEFAULT = '',
  BTN_FAB_PRIMARY = 'btn-fab-primary',
  BTN_FAB_BASIC_PRIMARY = 'btn-fab-basic-primary',
  BTN_FAB_WARN = 'btn-fab-warn',
  BTN_MINI_FAB_WARN = 'btn-mini-fab-warn'
}