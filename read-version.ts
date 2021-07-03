import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), './package.json');

const readPackageJson = () => {
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return json['version'];
};

export default readPackageJson;
