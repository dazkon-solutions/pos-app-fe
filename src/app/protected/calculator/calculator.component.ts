/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Component } from '@angular/core';
import { evaluate } from 'mathjs';
import { BehaviorSubject } from 'rxjs';
import { DialogHeaderComponent } from 'src/app/private/system/common/dialog/dialog-header/dialog-header.component';
import { LocaleKeys } from 'src/app/common/constants';
import { DialogHeaderConfig } from 'src/app/private/system/common/dialog/dialog-header';
import { CALCULATOR_MAT_IMPORTS } from './calculator-imports';

enum ButtonType {
  NUMBER,
  OPERATOR
};

interface CalculatorBtnConfig {
  value: number | string;
  type:  ButtonType;
};

@Component({
  selector: 'daz-calculator',
  imports: [
    CALCULATOR_MAT_IMPORTS,
    DialogHeaderComponent
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  headerConfig$ = new BehaviorSubject<DialogHeaderConfig>({
    title: LocaleKeys.titles.calculator
  });
  historyDisplay = ' ';
  resultDisplay = '0';
  result = 0;
  ButtonType = ButtonType;

  btnConfigList: CalculatorBtnConfig[] = [
    {
      value: 7,
      type: ButtonType.NUMBER
    },
    {
      value: 8,
      type: ButtonType.NUMBER
    },
    {
      value: 9,
      type: ButtonType.NUMBER
    },
    {
      value: '/',
      type: ButtonType.OPERATOR
    },
    {
      value: 4,
      type: ButtonType.NUMBER
    },
    {
      value: 5,
      type: ButtonType.NUMBER
    },
    {
      value: 6,
      type: ButtonType.NUMBER
    },
    {
      value: 'x',
      type: ButtonType.OPERATOR
    },
    {
      value: 1,
      type: ButtonType.NUMBER
    },
    {
      value: 2,
      type: ButtonType.NUMBER
    },
    {
      value: 3,
      type: ButtonType.NUMBER
    },
    {
      value: '-',
      type: ButtonType.OPERATOR
    },
    {
      value: '.',
      type: ButtonType.OPERATOR
    },
    {
      value: 0,
      type: ButtonType.NUMBER
    },
    {
      value: '=',
      type: ButtonType.OPERATOR
    },
    {
      value: '+',
      type: ButtonType.OPERATOR
    }
  ];

  onClickBtn(btn: CalculatorBtnConfig): void {
    if (btn.value === '=') {
      this.calculateResult();
    } else {
      btn.type === ButtonType.OPERATOR
        ? this.resultDisplay += ` ${btn.value} `
        : this.resultDisplay += btn.value;
    }
  }

  calculateResult(): void {
    try {
      const expression = this.resultDisplay.replace(/x/g, '*').replace(/\s+/g, '');
      this.result = evaluate(expression);
      this.historyDisplay = this.resultDisplay;
      this.resultDisplay = this.result.toString();
    } catch (error) {
      this.resultDisplay = 'Error';
    }
  }

  clearAll(): void {
    this.historyDisplay = ' ';
    this.resultDisplay = '0';
    this.result = 0;
  }

  backspace(): void {
    if (this.resultDisplay.length > 1) {
      this.resultDisplay = this.resultDisplay.slice(0, -1).trim();
    } else {
      this.resultDisplay = '0';
    }
  }
}