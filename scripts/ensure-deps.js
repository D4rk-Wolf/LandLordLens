/**
 * Ensure critical dependencies are installed
 * This script checks and installs webpack if missing
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
const webpackPath = path.join(nodeModulesPath, 'webpack');

function ensureWebpack() {
  // Check if webpack is properly installed via npm first
  const webpackPackageJson = path.join(webpackPath, 'package.json');
  if (fs.existsSync(webpackPath) && fs.existsSync(webpackPackageJson)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(webpackPackageJson, 'utf-8'));
      if (pkg.name === 'webpack' && fs.existsSync(path.join(webpackPath, 'lib', 'index.js'))) {
        console.log('✓ Webpack is installed');
        return;
      }
    } catch (e) {
      // Continue to manual install
    }
  }
  if (!fs.existsSync(webpackPath) || !fs.existsSync(path.join(webpackPath, 'lib', 'index.js'))) {
    console.log('Webpack not found or incomplete, installing...');
    try {
      // Manual extraction - npm install doesn't seem to work for webpack
      const projectRoot = path.join(__dirname, '..');
      const packOutput = execSync('npm pack webpack@5.104.1', {
        cwd: projectRoot,
        encoding: 'utf-8',
        stdio: 'pipe',
      });
      const tgzFile = packOutput.trim().split('\n').pop();
      if (tgzFile && fs.existsSync(path.join(projectRoot, tgzFile))) {
        // Remove existing incomplete webpack if any
        if (fs.existsSync(webpackPath)) {
          fs.rmSync(webpackPath, { recursive: true, force: true });
        }
        // Extract and move
        execSync(`tar -xzf "${tgzFile}"`, { cwd: projectRoot });
        if (fs.existsSync(path.join(projectRoot, 'package'))) {
          fs.renameSync(path.join(projectRoot, 'package'), webpackPath);
        }
        // Clean up
        if (fs.existsSync(path.join(projectRoot, tgzFile))) {
          fs.unlinkSync(path.join(projectRoot, tgzFile));
        }
        console.log('✓ Webpack manually installed');
        // Install webpack dependencies
        try {
          execSync('npm install --no-save --legacy-peer-deps', {
            cwd: webpackPath,
            stdio: 'pipe',
          });
          console.log('✓ Webpack dependencies installed');
        } catch (err) {
          console.log('Note: Some webpack dependencies may need manual installation');
        }
      } else {
        throw new Error('Failed to download webpack package');
      }
    } catch (err) {
      console.error('Failed to install webpack:', err.message);
      // Don't exit - let it try to run anyway
    }
  } else {
    console.log('✓ Webpack is installed');
  }
}

function ensureHtmlWebpackPlugin() {
  const htmlWebpackPluginPath = path.join(nodeModulesPath, 'html-webpack-plugin');
  if (!fs.existsSync(htmlWebpackPluginPath)) {
    console.log('html-webpack-plugin not found, installing...');
    try {
      // Manual extraction like webpack
      const projectRoot = path.join(__dirname, '..');
      const packOutput = execSync('npm pack html-webpack-plugin@5.6.0', {
        cwd: projectRoot,
        encoding: 'utf-8',
        stdio: 'pipe',
      });
      const tgzFile = packOutput.trim().split('\n').pop();
      if (tgzFile && fs.existsSync(path.join(projectRoot, tgzFile))) {
        execSync(`tar -xzf "${tgzFile}"`, { cwd: projectRoot });
        if (fs.existsSync(path.join(projectRoot, 'package'))) {
          fs.renameSync(path.join(projectRoot, 'package'), htmlWebpackPluginPath);
        }
        if (fs.existsSync(path.join(projectRoot, tgzFile))) {
          fs.unlinkSync(path.join(projectRoot, tgzFile));
        }
        console.log('✓ html-webpack-plugin manually installed');
      }
    } catch (error) {
      console.error('Failed to install html-webpack-plugin:', error.message);
    }
  } else {
    console.log('✓ html-webpack-plugin is installed');
  }
}

function ensureTapable() {
  const tapablePath = path.join(nodeModulesPath, 'tapable');
  if (!fs.existsSync(tapablePath)) {
    console.log('tapable not found, installing...');
    try {
      const projectRoot = path.join(__dirname, '..');
      const packOutput = execSync('npm pack tapable@2.3.0', {
        cwd: projectRoot,
        encoding: 'utf-8',
        stdio: 'pipe',
      });
      const tgzFile = packOutput.trim().split('\n').pop();
      if (tgzFile && fs.existsSync(path.join(projectRoot, tgzFile))) {
        execSync(`tar -xzf "${tgzFile}"`, { cwd: projectRoot });
        if (fs.existsSync(path.join(projectRoot, 'package'))) {
          fs.renameSync(path.join(projectRoot, 'package'), tapablePath);
        }
        if (fs.existsSync(path.join(projectRoot, tgzFile))) {
          fs.unlinkSync(path.join(projectRoot, tgzFile));
        }
        console.log('✓ tapable manually installed');
      }
    } catch (error) {
      console.error('Failed to install tapable:', error.message);
    }
  } else {
    console.log('✓ tapable is installed');
  }
}

function ensureBabelLoader() {
  const babelLoaderPath = path.join(nodeModulesPath, 'babel-loader');
  if (!fs.existsSync(babelLoaderPath) || !fs.existsSync(path.join(babelLoaderPath, 'lib', 'index.js'))) {
    console.log('babel-loader not found, installing...');
    try {
      const projectRoot = path.join(__dirname, '..');
      const packOutput = execSync('npm pack babel-loader@10.0.0', {
        cwd: projectRoot,
        encoding: 'utf-8',
        stdio: 'pipe',
      });
      const tgzFile = packOutput.trim().split('\n').pop();
      if (tgzFile && fs.existsSync(path.join(projectRoot, tgzFile))) {
        // Remove existing incomplete babel-loader if any
        if (fs.existsSync(babelLoaderPath)) {
          fs.rmSync(babelLoaderPath, { recursive: true, force: true });
        }
        execSync(`tar -xzf "${tgzFile}"`, { cwd: projectRoot });
        if (fs.existsSync(path.join(projectRoot, 'package'))) {
          fs.renameSync(path.join(projectRoot, 'package'), babelLoaderPath);
        }
        if (fs.existsSync(path.join(projectRoot, tgzFile))) {
          fs.unlinkSync(path.join(projectRoot, tgzFile));
        }
        console.log('✓ babel-loader manually installed');
      }
    } catch (error) {
      console.error('Failed to install babel-loader:', error.message);
    }
  } else {
    console.log('✓ babel-loader is installed');
  }
}

// Check and install
ensureWebpack();
ensureHtmlWebpackPlugin();
ensureTapable();
ensureBabelLoader();
// Final check - ensure webpack is still there
if (!fs.existsSync(webpackPath) || !fs.existsSync(path.join(webpackPath, 'lib', 'index.js'))) {
  console.log('Final webpack check - reinstalling if needed...');
  ensureWebpack();
}
