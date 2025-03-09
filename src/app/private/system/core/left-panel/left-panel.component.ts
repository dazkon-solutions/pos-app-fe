/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */


import { 
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, 
  DestroyRef, 
  OnInit, 
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { CdkTree } from '@angular/cdk/tree';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { 
  firstValueFrom,
  Observable
} from 'rxjs';
import { Store } from '@ngxs/store';
import { 
  LeftPanelState,
  ToggleLeftPanel
} from 'src/app/store/left-panel-config';
import { 
  MenuState,
  SelectMenuItem,
  MenuNode,
  SetMenuParent
} from 'src/app/store/menu-config';
import { Resource } from 'src/app/common/enums';
import { Navigator } from 'src/app/common/services';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { LEFT_PANEL_MAT_IMPORTS } from './left-panel-imports';


@Component({
  selector: 'daz-left-panel',
  imports: [
    CORE_IMPORTS,
    LEFT_PANEL_MAT_IMPORTS,
    BottomMenuComponent
  ],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftPanelComponent implements 
  OnInit,
  AfterViewInit
{
  @ViewChild(CdkTree)
  tree!: CdkTree<MenuNode>;
  
  current$!: Observable<MenuNode | null>;
  dataSource: MenuNode[] = [];
  flattened: MenuNode[] = [];
  isLeftPanelExpanded = false;
  
  childrenAccessor = (node: MenuNode) => node.children ?? [];
  hasChild = (_: number, node: MenuNode) => 
    !!node.children && node.children.length > 0;

  constructor(
    private destroyRef: DestroyRef,
    private router: Router,
    private store: Store,
    private navigateSvc: Navigator,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    await this.syncState();
    this.init();
  }

  ngAfterViewInit(): void {
    this.store.select(LeftPanelState.isExpanded)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(panel => {
        this.isLeftPanelExpanded = panel;

        if(!panel) {
          this.collapseAllNodes();
        } else {
          this.expandParent();
        }

        this.cdr.detectChanges();
      });
  }

  private setFlattenedIfNotExist(menuNodes: MenuNode[]): void {
    if(this.flattened.length > 0) return;
  
    const flattenNodes = (nodes: MenuNode[]): MenuNode[] => {
      const flattenedNodes: MenuNode[] = [];

      for(const node of nodes) {
        flattenedNodes.push({ ...node, children: undefined });
        if(node.children) {
          flattenedNodes.push(...flattenNodes(node.children));
        }
      }
      return flattenedNodes;
    };
  
    this.flattened = flattenNodes(menuNodes);
  }
  
  private async syncState(): Promise<void> {
    this.current$ = this.store.select(MenuState.getCurrent);

    this.store.select(MenuState.getTree)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(list => {
        this.dataSource = list;
        this.setFlattenedIfNotExist(list);
      });
  }

  private init(): void {
    this.navigateSvc.navigator$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(resource => this.navigateToResource(resource));
  }

  private async expandParent(): Promise<void> {
    const current = await firstValueFrom(this.current$);

    if(!current) return;

    const parentItem = this.dataSource.find(item => item.uid === current.pid);

    if(!parentItem) {
      this.store.dispatch(new SetMenuParent(current));

      return;
    };

    this.tree.expand(parentItem);

    this.store.dispatch(new SetMenuParent(parentItem));
  }

  private collapseAllNodes(): void {
    this.tree.collapseAll();
  }

  private navigateToResource(resource: Resource): void {
    const menuNode = this.flattened.find(item => item.resource === resource);

    if(!menuNode) return;
    if((!menuNode.route) && (menuNode.route !== '')) return; // '' is a route

    this.navigateTo(menuNode.route);

    this.store.dispatch(new SelectMenuItem(menuNode));

    this.expandParent();

    // Open Leftpanel if closed
    if(!this.isLeftPanelExpanded) {
      this.store.dispatch(new ToggleLeftPanel());
    }
  }

  onClickExpandedMenuNode(node: MenuNode): void {
    this.navigateSvc.navigateTo(node.resource);
  }

  onClickCollapsedMenuNode(node: MenuNode): void {
    const firstChild = node.children 
      ? node.children.find(child => child) 
      : null;

    const resource = firstChild
      ? firstChild.resource
      : node.resource;

    this.navigateSvc.navigateTo(resource);
  }

  private navigateTo(route: string): void {
    this.router.navigate([ route ]);
  }

  private isChild(node: MenuNode): boolean {
    return node.pid > 0;
  }

  private isSelectedItem(
    node: MenuNode,
    current: MenuNode | null
  ): boolean {
    if(!current) return false;

    return (node.resource === current.resource) || 
           (node.uid === current.uid) || 
           (node.uid === current.pid);
  }

  getMenuItemStyle(
    node: MenuNode,
    current: MenuNode | null
  ): string {
    const CHILD_STYLE = 'child-menu-item';
    const ITEM_SELECTED_STYLE = 'menu-item-selected';
    const CHILD_ITEM_SELECTED_STYLE = 'child-menu-item-selected';

    if(!current) return '';

    if((!this.isChild(node)) && (this.isSelectedItem(node, current))) {
      return ITEM_SELECTED_STYLE;
    }

    if((this.isChild(node)) && (!this.isSelectedItem(node, current))) {
      return CHILD_STYLE;
    }

    if((this.isChild(node)) && (this.isSelectedItem(node, current))) {
      return CHILD_ITEM_SELECTED_STYLE;
    }

    return '';
  }

  getIcon(
    node: MenuNode,
    current: MenuNode | null
  ): string {
    if(!current) return node.icon ?? '';

    if(current.pid > 0) {
      return current.pid === node.uid
        ? `${node.icon}-filled`
        : (node.icon ?? '');
    }

    return current.uid === node.uid
      ? `${node.icon}-filled`
      : (node.icon ?? '');
  }
}