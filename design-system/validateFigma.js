#!/usr/bin/env node

/**
 * Figma Design System Validation Script
 * Automatically validates Auto Layout compliance, design tokens, and accessibility
 */

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Configuration
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY || 'ChallengeCard_InteractionFlow_v1';
const VALIDATION_CONFIG = {
  required_auto_layout_compliance: 100,
  min_contrast_ratio: 4.5,
  max_variant_axes: 6,
  required_svg_icon_ratio: 95,
  max_lottie_size_kb: 200
};

// Validation results
let validationResults = {
  autoLayoutIssues: [],
  contrastIssues: [],
  variantIssues: [],
  iconIssues: [],
  tokenIssues: [],
  accessibilityIssues: [],
  score: 0,
  passed: false
};

/**
 * Fetch Figma file data
 */
async function getFigmaFile() {
  if (!FIGMA_TOKEN) {
    throw new Error('FIGMA_TOKEN environment variable is required');
  }

  try {
    const response = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch Figma file:', error.message);
    process.exit(1);
  }
}

/**
 * Recursively traverse Figma node tree
 */
function traverseNodes(nodes, callback) {
  if (!nodes) return;
  
  for (const node of nodes) {
    callback(node);
    if (node.children) {
      traverseNodes(node.children, callback);
    }
  }
}

/**
 * Validate Auto Layout compliance
 */
function validateAutoLayout(fileData) {
  const issues = [];
  let totalLayoutNodes = 0;
  let autoLayoutNodes = 0;

  traverseNodes([fileData.document], (node) => {
    // Check if node should use Auto Layout
    if (['FRAME', 'COMPONENT', 'COMPONENT_SET', 'INSTANCE'].includes(node.type)) {
      totalLayoutNodes++;
      
      if (node.layoutMode && node.layoutMode !== 'NONE') {
        autoLayoutNodes++;
      } else {
        // Exempt single-child text nodes and specific cases
        if (node.children && node.children.length > 1) {
          issues.push({
            id: node.id,
            name: node.name,
            type: node.type,
            issue: 'Missing Auto Layout on multi-child container'
          });
        }
      }
    }
  });

  const compliance = totalLayoutNodes > 0 ? (autoLayoutNodes / totalLayoutNodes) * 100 : 100;
  validationResults.autoLayoutIssues = issues;
  
  return {
    compliance: Math.round(compliance),
    issues: issues,
    passed: compliance >= VALIDATION_CONFIG.required_auto_layout_compliance
  };
}

/**
 * Validate design tokens
 */
function validateDesignTokens() {
  const tokenPath = path.join(__dirname, 'figma-tokens.json');
  const manifestPath = path.join(__dirname, 'components-manifest.json');
  
  const issues = [];
  
  try {
    // Check if token file exists
    if (!fs.existsSync(tokenPath)) {
      issues.push('figma-tokens.json file missing');
    } else {
      const tokens = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
      
      // Validate token structure
      if (!tokens.global) {
        issues.push('Missing global tokens section');
      }
      
      if (!tokens.theme || !tokens.theme.dark) {
        issues.push('Missing dark theme tokens');
      }
      
      // Validate required token categories
      const requiredCategories = ['color', 'spacing', 'typography', 'borderRadius'];
      for (const category of requiredCategories) {
        if (!tokens.global[category]) {
          issues.push(`Missing ${category} tokens`);
        }
      }
    }
    
    // Check if component manifest exists
    if (!fs.existsSync(manifestPath)) {
      issues.push('components-manifest.json file missing');
    } else {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      
      if (!manifest.components || manifest.components.length === 0) {
        issues.push('No components defined in manifest');
      }
    }
    
  } catch (error) {
    issues.push(`Token validation error: ${error.message}`);
  }
  
  validationResults.tokenIssues = issues;
  return {
    issues: issues,
    passed: issues.length === 0
  };
}

/**
 * Validate component variants
 */
function validateVariants(fileData) {
  const issues = [];
  
  traverseNodes([fileData.document], (node) => {
    if (node.type === 'COMPONENT_SET') {
      // Check variant axis count
      const variantProperties = node.componentPropertyDefinitions || {};
      const axisCount = Object.keys(variantProperties).length;
      
      if (axisCount > VALIDATION_CONFIG.max_variant_axes) {
        issues.push({
          id: node.id,
          name: node.name,
          issue: `Too many variant axes (${axisCount}/${VALIDATION_CONFIG.max_variant_axes})`
        });
      }
      
      // Check for proper variant naming
      for (const [key, prop] of Object.entries(variantProperties)) {
        if (!key.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
          issues.push({
            id: node.id,
            name: node.name,
            issue: `Invalid variant property name: ${key}`
          });
        }
      }
    }
  });
  
  validationResults.variantIssues = issues;
  return {
    issues: issues,
    passed: issues.length === 0
  };
}

/**
 * Validate SVG icons
 */
function validateIcons(fileData) {
  const issues = [];
  let totalIcons = 0;
  let svgIcons = 0;
  
  traverseNodes([fileData.document], (node) => {
    // Identify icon nodes (typically named with "icon" prefix)
    if (node.name && node.name.toLowerCase().includes('icon')) {
      totalIcons++;
      
      // Check if it's a vector node (SVG equivalent)
      if (['VECTOR', 'BOOLEAN_OPERATION', 'STAR', 'POLYGON'].includes(node.type)) {
        svgIcons++;
      } else if (node.type === 'RECTANGLE' && node.fills && node.fills.length > 0) {
        // Check if it's an image fill (raster)
        const hasImageFill = node.fills.some(fill => fill.type === 'IMAGE');
        if (hasImageFill) {
          issues.push({
            id: node.id,
            name: node.name,
            issue: 'Icon uses raster image instead of vector'
          });
        }
      }
    }
  });
  
  const svgRatio = totalIcons > 0 ? (svgIcons / totalIcons) * 100 : 100;
  validationResults.iconIssues = issues;
  
  return {
    svgRatio: Math.round(svgRatio),
    issues: issues,
    passed: svgRatio >= VALIDATION_CONFIG.required_svg_icon_ratio
  };
}

/**
 * Validate accessibility requirements
 */
function validateAccessibility(fileData) {
  const issues = [];
  
  traverseNodes([fileData.document], (node) => {
    // Check for focus state variants in interactive components
    if (node.type === 'COMPONENT_SET' && 
        (node.name.toLowerCase().includes('button') || 
         node.name.toLowerCase().includes('card') ||
         node.name.toLowerCase().includes('input'))) {
      
      const variants = node.children || [];
      const hasFocusState = variants.some(variant => 
        variant.name.toLowerCase().includes('focus')
      );
      
      if (!hasFocusState) {
        issues.push({
          id: node.id,
          name: node.name,
          issue: 'Interactive component missing focus state variant'
        });
      }
    }
    
    // Check text node sizes for readability
    if (node.type === 'TEXT') {
      const fontSize = node.style?.fontSize || 14;
      if (fontSize < 12) {
        issues.push({
          id: node.id,
          name: node.name,
          issue: `Text too small for accessibility (${fontSize}px < 12px)`
        });
      }
    }
  });
  
  validationResults.accessibilityIssues = issues;
  return {
    issues: issues,
    passed: issues.length === 0
  };
}

/**
 * Calculate overall validation score
 */
function calculateScore() {
  const checks = [
    { weight: 30, passed: validationResults.autoLayoutIssues.length === 0 },
    { weight: 20, passed: validationResults.tokenIssues.length === 0 },
    { weight: 15, passed: validationResults.variantIssues.length === 0 },
    { weight: 15, passed: validationResults.iconIssues.length === 0 },
    { weight: 20, passed: validationResults.accessibilityIssues.length === 0 }
  ];
  
  const score = checks.reduce((total, check) => {
    return total + (check.passed ? check.weight : 0);
  }, 0);
  
  validationResults.score = score;
  validationResults.passed = score >= 90;
  
  return score;
}

/**
 * Generate validation report
 */
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    fileKey: FILE_KEY,
    validation: validationResults,
    summary: {
      totalIssues: validationResults.autoLayoutIssues.length + 
                  validationResults.tokenIssues.length +
                  validationResults.variantIssues.length +
                  validationResults.iconIssues.length +
                  validationResults.accessibilityIssues.length,
      score: validationResults.score,
      passed: validationResults.passed,
      requiredScore: 90
    },
    recommendations: []
  };
  
  // Add recommendations based on issues
  if (validationResults.autoLayoutIssues.length > 0) {
    report.recommendations.push('Convert all multi-child containers to use Auto Layout');
  }
  
  if (validationResults.tokenIssues.length > 0) {
    report.recommendations.push('Ensure design tokens are properly exported and structured');
  }
  
  if (validationResults.variantIssues.length > 0) {
    report.recommendations.push('Reduce component variant complexity (max 6 axes)');
  }
  
  if (validationResults.iconIssues.length > 0) {
    report.recommendations.push('Replace raster icons with vector SVG equivalents');
  }
  
  if (validationResults.accessibilityIssues.length > 0) {
    report.recommendations.push('Add missing focus states and ensure text meets minimum size requirements');
  }
  
  return report;
}

/**
 * Main validation function
 */
async function runValidation() {
  console.log('🔍 Starting Figma design system validation...\n');
  
  try {
    // Fetch Figma file
    console.log('📥 Fetching Figma file...');
    const fileData = await getFigmaFile();
    console.log('✅ Figma file loaded successfully\n');
    
    // Run validations
    console.log('🧪 Running validation checks...\n');
    
    const autoLayoutResult = validateAutoLayout(fileData);
    console.log(`Auto Layout Compliance: ${autoLayoutResult.compliance}% (${autoLayoutResult.passed ? '✅' : '❌'})`);
    
    const tokenResult = validateDesignTokens();
    console.log(`Design Tokens: ${tokenResult.passed ? '✅' : '❌'}`);
    
    const variantResult = validateVariants(fileData);
    console.log(`Component Variants: ${variantResult.passed ? '✅' : '❌'}`);
    
    const iconResult = validateIcons(fileData);
    console.log(`SVG Icons: ${iconResult.svgRatio}% (${iconResult.passed ? '✅' : '❌'})`);
    
    const accessibilityResult = validateAccessibility(fileData);
    console.log(`Accessibility: ${accessibilityResult.passed ? '✅' : '❌'}`);
    
    // Calculate score
    const score = calculateScore();
    console.log(`\n📊 Overall Score: ${score}/100 (${validationResults.passed ? 'PASS' : 'FAIL'})\n`);
    
    // Generate and save report
    const report = generateReport();
    const reportPath = path.join(__dirname, 'validation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Validation report saved to: ${reportPath}\n`);
    
    // Print summary
    if (report.summary.totalIssues > 0) {
      console.log('🚨 Issues found:');
      if (validationResults.autoLayoutIssues.length > 0) {
        console.log(`  • ${validationResults.autoLayoutIssues.length} Auto Layout issues`);
      }
      if (validationResults.tokenIssues.length > 0) {
        console.log(`  • ${validationResults.tokenIssues.length} Token issues`);
      }
      if (validationResults.variantIssues.length > 0) {
        console.log(`  • ${validationResults.variantIssues.length} Variant issues`);
      }
      if (validationResults.iconIssues.length > 0) {
        console.log(`  • ${validationResults.iconIssues.length} Icon issues`);
      }
      if (validationResults.accessibilityIssues.length > 0) {
        console.log(`  • ${validationResults.accessibilityIssues.length} Accessibility issues`);
      }
      console.log('');
    }
    
    if (report.recommendations.length > 0) {
      console.log('💡 Recommendations:');
      report.recommendations.forEach(rec => console.log(`  • ${rec}`));
      console.log('');
    }
    
    // Exit with appropriate code
    process.exit(validationResults.passed ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(2);
  }
}

// CLI usage
if (require.main === module) {
  runValidation();
}

module.exports = {
  runValidation,
  validateAutoLayout,
  validateDesignTokens,
  validateVariants,
  validateIcons,
  validateAccessibility
};