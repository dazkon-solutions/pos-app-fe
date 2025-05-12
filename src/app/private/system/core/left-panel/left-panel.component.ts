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
  effect, 
  inject, 
  OnInit, 
  ViewChild
} from '@angular/core';
import { CdkTree } from '@angular/cdk/tree';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { 
  firstValueFrom,
  Observable
} from 'rxjs';
import { Store } from '@ngxs/store';
import { 
  ExpendLeftPanel,
  LeftPanelState
} from 'src/app/store/left-panel-config';
import { 
  MenuState,
  SelectMenuItem,
  MenuNode,
  SetMenuParent
} from 'src/app/store/menu-config';
import { NavigationService } from 'src/app/common/navigation';
import { NavigationState } from 'src/app/store/navigation-config';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';


@Component({
  selector: 'daz-left-panel',
  imports: [
    CORE_IMPORTS,
    MatDividerModule,
    MatTreeModule,
    MatIconModule,
    MatTooltipModule,
    CdkTreeModule,
    MatButtonModule,
    MatRippleModule,
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
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);
  private navigationSvc = inject(NavigationService);
  private cdr = inject(ChangeDetectorRef);
  
  @ViewChild(CdkTree)
  tree!: CdkTree<MenuNode>;

  private currentRoutePath = this.store.selectSignal(NavigationState.getCurrentRoutePath);
  
  current$!: Observable<MenuNode | null>;
  dataSource: MenuNode[] = [];
  flattened: MenuNode[] = [];
  isLeftPanelExpanded = false;
  
  childrenAccessor = (node: MenuNode) => node.children ?? [];
  hasChild = (_: number, node: MenuNode) => 
    !!node.children && node.children.length > 0;

  constructor() { 
    effect(() => {
      this.prepairMenuUI(this.currentRoutePath());
    })
  }

  async ngOnInit(): Promise<void> {
    await this.syncState();
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

  private prepairMenuUI(routePath: string): void {
    const menuNode = this.flattened.find(item => item.routePath === routePath);

    if(!menuNode) return;
    if((!menuNode.routePath) && (menuNode.routePath !== '')) return; // '' is a route

    this.store.dispatch(new SelectMenuItem(menuNode));

    this.expandParent();

    this.store.dispatch(new ExpendLeftPanel());
  }

  onClickExpandedMenuNode(node: MenuNode): void {
    this.navigationSvc.navigateTo(node.routePath);
  }

  onClickCollapsedMenuNode(node: MenuNode): void {
    const firstChild = node.children 
      ? node.children.find(child => child) 
      : null;

    const routePath = firstChild
      ? firstChild.routePath
      : node.routePath;

    this.navigationSvc.navigateTo(routePath);
  }

  private isChild(node: MenuNode): boolean {
    return node.pid > 0;
  }

  private isSelectedItem(
    node: MenuNode,
    current: MenuNode | null
  ): boolean {
    if(!current) return false;

    return (node.routePath === current.routePath) || 
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