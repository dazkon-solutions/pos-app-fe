/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

export class ArrayUtil {
  static createFakeArray(length: number): any[] {
    const list = Array.from({ length }, (_, index) => ({
      id: index + 1,
      value: 'x'
    }));
    return list;
  }
}