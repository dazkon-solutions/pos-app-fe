/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  Component, 
  Input, 
  OnChanges, 
  OnDestroy, 
  SimpleChanges
} from '@angular/core';
import { 
  AnimationOptions, 
  LottieComponent 
} from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { AnimationType } from './animation-type.enum';
import { 
  AnimationConfigHelper, 
  CustomAnimationConfig 
} from './animation-config-helper';
import { CORE_IMPORTS } from 'src/app/common/imports/core-imports';


@Component({
  selector: 'daz-animation-player',
  imports: [
    CORE_IMPORTS,
    LottieComponent
  ],
  templateUrl: './animation-player.component.html',
  styleUrl: './animation-player.component.scss'
})
export class AnimationPlayerComponent implements 
  OnChanges,
  OnDestroy
{
  @Input('animationType')
  animationType!: AnimationType;

  config: CustomAnimationConfig = AnimationConfigHelper.createDefault();
  options: AnimationOptions = {
    path: ''
  };

  private animation!: AnimationItem;

  ngOnChanges(changes: SimpleChanges): void {
    if('animationType' in changes) {
      this.config = AnimationConfigHelper
        .createByAnimationType(this.animationType);

      this.options ={
        ...this.options,
        path: this.config.path
      };
    }
  }

  handleAnimation(animation: AnimationItem) {
    this.animation = animation;
  }

  ngOnDestroy(): void {
    this.animation.destroy();
  }
}