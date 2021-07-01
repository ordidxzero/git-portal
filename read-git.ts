import fs from 'fs';

const formatter = (path: string) => (prev: any, cur: string, idx: number, arr: string[]) => {
  const currentPath = `${path}/${cur}`;
  const isFile = fs.lstatSync(currentPath).isFile();
  if (isFile) {
    const content = fs.readFileSync(currentPath, 'utf-8');
    prev[cur] = content;
    return prev;
  }
  const fl = fs.readdirSync(currentPath, 'utf-8').reduce(formatter(currentPath), {} as any);
  prev[cur] = fl;
  return prev;
};

const f = fs.readdirSync('.git', 'utf-8').reduce(formatter('.git'), {} as any);

fs.writeFileSync('git.json', JSON.stringify(f, null, 4));

console.log(f);
