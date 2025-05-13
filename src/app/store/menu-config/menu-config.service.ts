/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
// import { PermissionService } from "src/app/common/services";
// import { Action } from "src/app/common/enums";
import { MenuTreeConfigHelper } from "./menu-tree-config.helper";
import { SetMenuTree } from "./menu.state";


@Injectable({
  providedIn: 'root'
})
export class MenuConfigService {
  private list = MenuTreeConfigHelper.createTree();

  constructor(
    private store: Store,
    // private permissionSvc: PermissionService
  ) { }
  
  async createMenuTreeByPermission(): Promise<void> {
    let menuTree = [];

    // for(const parentItem of this.list) {
    //   const parentPermission = await this.permissionSvc
    //     .hasPermission(parentItem.resource, 
    //                    Action.VIEW);

    //   if (parentPermission) {
        
    //     if (parentItem.children) {
    //       let childItems = [];
          
    //       for(const childItem of parentItem.children) {
    //         const childPermission = await this.permissionSvc
    //           .hasPermission(childItem.resource, 
    //                          Action.LIST_VIEW);

    //         if (childPermission) {
    //           childItems.push(childItem);
    //         }
    //       }
    //       menuTree.push({
    //         ...parentItem,
    //         children: childItems
    //       });

    //     } else {
    //       menuTree.push(parentItem);
    //     }

    //   }
    // }
    menuTree = this.list;

    this.store.dispatch(new SetMenuTree(menuTree));
  }
}