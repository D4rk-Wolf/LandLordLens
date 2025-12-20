const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Helper function to convert shadow props to boxShadow
function convertShadowToBoxShadow(shadowColor, shadowOffset, shadowOpacity, shadowRadius) {
  // Parse color
  let color = shadowColor || '#000';
  
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const opacity = shadowOpacity || 0;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  // Handle rgba/rgb strings
  if (color.startsWith('rgba') || color.startsWith('rgb')) {
    return color;
  }
  
  // Default fallback
  return `rgba(0, 0, 0, ${shadowOpacity || 0})`;
}

function convertFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Pattern to match shadow properties
  const shadowPattern = /(\s+)(shadowColor:\s*['"]([^'"]+)['"],?\s*\n\s+shadowOffset:\s*\{\s*width:\s*([-\d.]+),\s*height:\s*([-\d.]+)\s*\},?\s*\n\s+shadowOpacity:\s*([\d.]+),?\s*\n\s+shadowRadius:\s*([\d.]+),?)/g;
  
  content = content.replace(shadowPattern, (match, indent, fullMatch, color, width, height, opacity, radius) => {
    modified = true;
    const rgba = convertShadowToBoxShadow(color, { width: parseFloat(width), height: parseFloat(height) }, parseFloat(opacity), parseFloat(radius));
    const offsetX = width;
    const offsetY = height;
    const blurRadius = radius;
    const spreadRadius = 0;
    
    return `${indent}boxShadow: '${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${rgba}',`;
  });
  
  // Also handle cases where shadowOpacity might be 0 (disabled shadow)
  const shadowOpacityZeroPattern = /(\s+)(shadowOpacity:\s*0,?\s*\n)/g;
  content = content.replace(shadowOpacityZeroPattern, (match, indent) => {
    modified = true;
    return `${indent}boxShadow: 'none',\n`;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Converted shadows in ${filePath}`);
    return true;
  }
  
  return false;
}

// Find all TypeScript/JavaScript files in src directory
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}');

let convertedCount = 0;
files.forEach(file => {
  if (convertFile(file)) {
    convertedCount++;
  }
});

console.log(`\n✅ Converted shadows in ${convertedCount} files`);
