/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

export class ErrorHandlerUtil {
  static extractErrorMessage(error: any): string {
    // Check different error structures and return a unified message
    if (error?.error?.message) {
      return error.error.message; // Nested error object
    }
    if (error?.message) {
      return error.message; // Direct error message
    }
    if (typeof error === 'string') {
      return error; // Plain string error
    }
    return 'An unknown error occurred'; // Fallback message
  }
}