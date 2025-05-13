/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

export enum Endpoint {
  SERVER_URL = 'serverUrl',

  BRANDS_FETCH_ALL = 'brands.fetchAll',
  BRANDS_FETCH_BY_ID = 'brands.fetchById',
  BRANDS_CREATE = 'brands.create',
  BRANDS_UPDATE = 'brands.update',
  BRANDS_DELETE = 'brands.delete',
  BRANDS_CHECK_DELETABLE = 'brands.checkDeletable',


  // TODO: MODIFI
  CATEGORIES_GET_PAGINATED = 'categories.getPaginated',
  CATEGORIES_VIEW = 'categories.view',
  CATEGORIES_CREATE = 'categories.create',
  CATEGORIES_UPDATE = 'categories.update',
  CATEGORIES_IS_DELETABLE = 'categories.isDeletable',
  CATEGORIES_DELETE = 'categories.delete',
}