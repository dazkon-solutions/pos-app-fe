/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  FormBuilder, 
  Validators 
} from "@angular/forms";
import { LocaleKeys } from "src/app/common/constants";
import { Action } from "src/app/common/enums";
import { ActionButtonType } from "src/app/private/system/common/action-button";

export class CategoryFormConfigHelper {
  static createForm(formBuilder: FormBuilder): any {
    return formBuilder.group({
      id: [
        {
          value: 0,
          disabled: false
        },
        [Validators.required]
      ],
      name: [
        {
          value: '',
          disabled: false
        },
        [
          Validators.required,
          Validators.maxLength(5)
        ]
      ],
      createdAt: [
        {
          value: '',
          disabled: false
        },
        [Validators.required]
      ],
      description: [
        {
          value: '',
          disabled: false
        },
        [Validators.maxLength(255)]
      ]
    });
  }

  static headerConfig = {
    title: LocaleKeys.titles.createCategory,
    value: 'SAL-23232'
  };

  static createBtnConfig = {
    action: Action.CREATE_CATEGORY,
    type: ActionButtonType.CREATE
  };
  
  static updateBtnConfig = {
    action: Action.UPDATE_CATEGORY,
    type: ActionButtonType.UPDATE
  };

  static editBtnConfig = {
    action: Action.UPDATE_CATEGORY,
    type: ActionButtonType.EDIT
  };
}