/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */


/**
 * To run -> 
 * npx ts-node public/scripts/generate-i18n-constants.ts
 * or
 * npm run generate-i18n
 */

const fs = require('fs');
const path = require('path');

const inputFilePath = path.join('public/locale/en.json');
const outputFilePath = path.join('src/app/common/constants/locale-key.constant.ts');

// Function to read JSON safely with error handling
function readJSONFile(filePath: string): any {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error(`Error: File not found at ${filePath}`);
    } else if (error.name === 'SyntaxError') {
      console.error(`Error: Invalid JSON content in ${filePath}`);
    } else {
      console.error(`Error reading file at ${filePath}:`, error.message);
    }
    process.exit(1); // Stop execution if reading fails
  }
}

// Function to generate constants recursively with proper indentation
function generateConstants(
  data: Record<string, any>, 
  indent: number = 2,
  parentKey: string = ''
): string {
  const spaces = ' '.repeat(indent);
  let result = '';

  for (const key in data) {
    const value = data[key];
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      result += `${spaces}${key}: {\n${generateConstants(value, indent + 2, fullKey)}${spaces}},\n`;
    } else {
      result += `${spaces}${key}: '${fullKey}',\n`;
    }
  }

  return result;
}

// Read the JSON file
const jsonData = readJSONFile(inputFilePath);

// Generate the content for the TypeScript file
const fileContent = `
/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

////////////////////////////////////////////////////////////////////////////
//             Auto-generated file. Do not modify manually.               //
//           Refer public/scripts/generate-i18n-constants.ts              //
////////////////////////////////////////////////////////////////////////////

export const LocaleKeys = {
${generateConstants(jsonData, 2)}
};

`;

// Write the output to the new constants file
try {
  fs.writeFileSync(outputFilePath, fileContent);
  console.log('i18n-constants.ts has been generated successfully.');
} catch (error: any) {
  console.error(`Error writing to ${outputFilePath}:`, error.message);
  process.exit(1); // Stop execution if writing fails
}