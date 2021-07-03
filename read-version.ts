import fs from 'fs';
import appRoot from 'app-root-path';

const filePath = appRoot.resolve('./package.json');

const readPackageJson = () => {
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return json['version'];
};

export default readPackageJson;
