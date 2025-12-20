#!/usr/bin/env node

/**
 * Script to convert React Native shadow props to CSS boxShadow
 * for react-native-web compatibility
 */

const fs = require('fs');
const path = require('path');

// Hex to RGB converter
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Convert shadow props to boxShadow string
function createBoxShadow(color, offsetX, offsetY, opacity, radius) {
  let rgba;
  
  if (color.startsWith('#')) {
    const rgb = hexToRgb(color);
    if (rgb) {
      rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    } else {
      rgba = `rgba(0, 0, 0, ${opacity})`;
    }
  } else if (color.startsWith('rgba')) {
    rgba = color.replace(/rgba\(([^)]+)\)/, (match, values) => {
      const parts = values.split(',').map(v => v.trim());
      if (parts.length === 4) {
        return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${opacity})`;
      }
      return match;
    });
  } else {
    rgba = `rgba(0, 0, 0, ${opacity})`;
  }
  
  return `${offsetX}px ${offsetY}px ${radius}px 0px ${rgba}`;
}

// Process a single file
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let lineNumber = 0;
  const lines = content.split('\n');
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = i < lines.length - 1 ? lines[i + 1] : '';
    const lineAfterNext = i < lines.length - 2 ? lines[i + 2] : '';
    const lineAfterNext2 = i < lines.length - 3 ? lines[i + 3] : '';
    
    // Check for shadowColor pattern
    const shadowColorMatch = line.match(/shadowColor:\s*['"]([^'"]+)['"]/);
    if (shadowColorMatch) {
      // Check if next lines contain shadowOffset, shadowOpacity, shadowRadius
      const offsetMatch = nextLine.match(/shadowOffset:\s*\{\s*width:\s*([-\d.]+),\s*height:\s*([-\d.]+)\s*\}/);
      const opacityMatch = lineAfterNext.match(/shadowOpacity:\s*([\d.]+)/);
      const radiusMatch = lineAfterNext2.match(/shadowRadius:\s*([\d.]+)/);
      
      if (offsetMatch && opacityMatch && radiusMatch) {
        const color = shadowColorMatch[1];
        const offsetX = parseFloat(offsetMatch[1]);
        const offsetY = parseFloat(offsetMatch[2]);
        const opacity = parseFloat(opacityMatch[1]);
        const radius = parseFloat(radiusMatch[1]);
        
        const boxShadow = createBoxShadow(color, offsetX, offsetY, opacity, radius);
        const indent = line.match(/^(\s*)/)[1];
        
        // Replace shadowColor line with boxShadow
        newLines.push(`${indent}boxShadow: '${boxShadow}',`);
        
        // Skip the next 3 lines (shadowOffset, shadowOpacity, shadowRadius)
        i += 3;
        modified = true;
        continue;
      }
    }
    
    // Check for shadowOpacity: 0 (disabled shadow)
    if (line.match(/shadowOpacity:\s*0/)) {
      const indent = line.match(/^(\s*)/)[1];
      newLines.push(`${indent}boxShadow: 'none',`);
      modified = true;
      continue;
    }
    
    newLines.push(line);
  }
  
  if (modified) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    return true;
  }
  
  return false;
}

// Find all TypeScript/JavaScript files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      findFiles(filePath, fileList);
    } else if (/\.(ts|tsx|js|jsx)$/.test(file) && !filePath.includes('node_modules')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Main execution
const srcDir = path.join(__dirname, '..', 'src');
const files = findFiles(srcDir);

let convertedCount = 0;
files.forEach(file => {
  try {
    if (processFile(file)) {
      convertedCount++;
      console.log(`✓ ${file}`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log(`\n✅ Converted shadows in ${convertedCount} files`);
