/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  ChangeDetectionStrategy,
  Component, 
  computed, 
  input, 
  OnDestroy
} from '@angular/core';
import { LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';
import { AnimationType } from './animation-type.enum';
import { AnimationConfigHelper } from './animation-config-helper';


@Component({
  selector: 'daz-animation-player',
  imports: [
    CORE_IMPORTS,
    LottieComponent
  ],
  templateUrl: './animation-player.component.html',
  styleUrl: './animation-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimationPlayerComponent implements OnDestroy {
  animationType = input.required<AnimationType>();

  config = computed(() => 
    AnimationConfigHelper.createByAnimationType(this.animationType()));

  options = computed(() => {
    return {
      path: this.config().path,
      loop: this.config().loop
    };
  });

  private animation!: AnimationItem;

  handleAnimation(animation: AnimationItem) {
    this.animation = animation;
  }

  ngOnDestroy(): void {
    this.animation.destroy();
  }
}