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
  SAMPLES_GET_PAGINATED = 'samples.getPaginated',
  SAMPLES_VIEW = 'samples.view',
  SAMPLES_CREATE = 'samples.create',
  SAMPLES_UPDATE = 'samples.update',
  SAMPLES_IS_DELETABLE = 'samples.isDeletable',
  SAMPLES_DELETE = 'samples.delete',
}