/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

export enum Action {
  NONE = 'NONE',
  
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  VIEW_PRODUCT = 'VIEW_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',

  CREATE_CATEGORY = 'CREATE_CATEGORY',
  VIEW_CATEGORY = 'VIEW_CATEGORY',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  DELETE_CATEGORY = 'DELETE_CATEGORY',

  CREATE_BRAND = 'CREATE_BRAND',
  VIEW_BRAND = 'VIEW_BRAND',
  UPDATE_BRAND = 'UPDATE_BRAND',
  DELETE_BRAND = 'DELETE_BRAND',


  CREATE = 'CREATE',
  VIEW = 'VIEW',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LIST_VIEW = 'LIST_VIEW',
  PRINT = 'PRINT',
  DOWNLOAD = 'DOWNLOAD',
}