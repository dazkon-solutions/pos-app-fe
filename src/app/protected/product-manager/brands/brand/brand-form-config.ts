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
  FormGroup, 
  Validators 
} from "@angular/forms";

export class BrandFormConfigHelper {
  static createForm(formBuilder: FormBuilder): FormGroup {
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
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ]
    });
  }
}