#!/usr/bin/env node

const fs = require('fs');

(async () => {
  const mainPackagePath = 'package.json';
  const libPackagePath = 'projects/ngx-viacep/package.json';

  const version = await getVersion();
  const mainPackage = await getPackageData(mainPackagePath);
  const libPackage = await getPackageData(libPackagePath);

  if (mainPackage.version !== libPackage.version) {
    console.log('The lib and main packages are not with the versions synchronized');
    process.exit(1);
  }

  if (mainPackage.version === version) {
    console.log('The VERSION file must be updated with the newer version');
    process.exit(1);
  }

  mainPackage.version = version;
  libPackage.version = version;

  await savePackageData(mainPackagePath, mainPackage);
  await savePackageData(libPackagePath, libPackage);
})();

const getVersion = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile('VERSION', 'utf8', (err, version) => {
      if (err) {
        console.log('Failed to read the version file');
        reject(err);
      }
      resolve(version);
    });
  });
}

const getPackageData = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log(`Could not read from ${filePath} file`);
        reject(err);
      }
      const packageData = JSON.parse(data);
      resolve(packageData);
    });
  });
}

const savePackageData = async (filepath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, JSON.stringify(data), (err) => {
      if (err) {
        console.log(`Could not write to ${filepath} file`);
        reject(err);
      }
      resolve();
    });
  });
}
