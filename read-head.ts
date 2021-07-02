import fs from 'fs';
import appRoot from 'app-root-path';

export const filePAth = appRoot.resolve('../.git/logs/HEAD');

const readGitFile = () =>
  fs
    .readFileSync(filePAth, 'utf-8')
    .split('\n')
    .map(commit => commit.replace(/^([\w\-]+)/, '').trim())
    .filter(Boolean)
    .map(commit => commit.split('\t'))
    .filter(commit => /^commit/.test(commit[1]))
    .map(commit =>
      commit.reduce((prev, cur, idx) => {
        if (idx === 0) {
          prev['id'] = cur.split(' ')[0];
          return prev;
        }
        prev['message'] = cur.split(': ')[1];
        return prev;
      }, {} as any),
    )
    .map((commit, idx) => {
      commit['index'] = idx;
      return commit;
    });

export default readGitFile;
