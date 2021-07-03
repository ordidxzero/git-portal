import fs from 'fs';
import path from 'path';

const filePath = path.join('./package.json');

const readPackageJson = () => {
  console.log(filePath);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return json['version'];
};

export default readPackageJson;
