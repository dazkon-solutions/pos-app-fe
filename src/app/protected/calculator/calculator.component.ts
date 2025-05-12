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
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { evaluate } from 'mathjs';
import { DialogHeaderComponent } from 'src/app/private/system/common/dialog/dialog-header/dialog-header.component';
import { LocaleKeys } from 'src/app/common/constants';
import { DialogHeaderConfig } from 'src/app/private/system/common/dialog/dialog-header';

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
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    DialogHeaderComponent
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent {
  headerConfig = signal<DialogHeaderConfig>({
    title: LocaleKeys.titles.calculator
  });

  historyDisplay = signal<string>(' ');
  resultDisplay = signal<string>('0');
  result = signal<number>(0);

  ButtonType = ButtonType;

  btnConfigList = <CalculatorBtnConfig[]> [
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
      const result = btn.type === ButtonType.OPERATOR
        ? this.resultDisplay() + ` ${btn.value} `
        : this.resultDisplay() + btn.value;

      this.resultDisplay.set(result);
    }
  }

  calculateResult(): void {
    try {
      const expression = this.resultDisplay().replace(/x/g, '*').replace(/\s+/g, '');
      this.result.set(evaluate(expression));
      this.historyDisplay.set(this.resultDisplay());
      this.resultDisplay.set(this.result().toString());
    } catch (error) {
      this.resultDisplay.set('Error');
    }
  }

  clearAll(): void {
    this.historyDisplay.set(' ');
    this.resultDisplay.set('0');
    this.result.set(0);
  }

  backspace(): void {
    const result = this.resultDisplay().length > 1
      ? this.resultDisplay().slice(0, -1).trim()
      : '0';

    this.resultDisplay.set(result);
  }
}