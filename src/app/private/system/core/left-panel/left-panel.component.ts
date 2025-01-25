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
  OnDestroy, 
  OnInit, 
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CdkTree } from '@angular/cdk/tree';
import { 
  firstValueFrom,
  Observable,
  Subject, 
  takeUntil 
} from 'rxjs';
import { 
  MenuState,
  LeftPanelState,
  SelectMenuItem,
  MenuNode,
  ToggleLeftPanel
} from 'src/app/store';
import { SubscriptionHelper } from 'src/app/common/helpers';
import { Resource } from 'src/app/common/enums';
import { Navigator } from 'src/app/common/services';
import { 
  MaterialModule, 
  StandaloneCommonModule 
} from 'src/app/common/modules';


@Component({
  selector: 'daz-left-panel',
  imports: [
    StandaloneCommonModule,
    MaterialModule
  ],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftPanelComponent implements 
  OnInit,
  AfterViewInit,
  OnDestroy
{
  @ViewChild(CdkTree)
  tree!: CdkTree<MenuNode>;
  
  current$!: Observable<MenuNode | null>;
  dataSource: MenuNode[] = [];
  flattened: MenuNode[] = [];
  isLeftPanelExpanded = false;
  
  private destroy$ = new Subject<void>();

  childrenAccessor = (node: MenuNode) => node.children ?? [];
  hasChild = (_: number, node: MenuNode) => 
    !!node.children && node.children.length > 0;

  constructor(
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
      .pipe(takeUntil(this.destroy$))
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

  private setFlattened(menuNodes: MenuNode[]): void {
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => {
        this.dataSource = list;
        this.setFlattened(list);
      });
  }

  private init(): void {
    this.navigateSvc.navigator$
      .pipe(takeUntil(this.destroy$))
      .subscribe(resource => this.navigateToResource(resource));
  }

  private async expandParent(): Promise<void> {
    const current = await firstValueFrom(this.current$);

    if(!current) return;

    const parentItem = this.dataSource.find(item => item.uid === current.pid);

    if(!parentItem) return;

    this.tree.expand(parentItem);
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
  }

  onClickExpandedMenuNode(node: MenuNode): void {
    this.navigateToResource(node.resource);
  }

  onClickCollapsedMenuNode(node: MenuNode): void {
    const firstChild = node.children 
      ? node.children.find(child => child) 
      : null;

    const resource = firstChild
      ? firstChild.resource
      : node.resource;

    this.navigateToResource(resource);

    this.store.dispatch(new ToggleLeftPanel());
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

  ngOnDestroy(): void {
    SubscriptionHelper.destroy(this.destroy$);
  }
}