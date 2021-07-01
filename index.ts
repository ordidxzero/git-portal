import { Command } from 'commander';
import ChildProcess from 'child_process';
import readGitFile from './read-head';

const program = new Command('git-portal');

program
  .option('-o, --order <number>', 'Type order of commit. first = 0')
  .option('-lc, --last', 'order of last commit. If you use the o option, this option is ignored.')
  .option('-la , --latest', 'Back to the latest commit.');

program.parse(process.argv);

const options = program.opts();
const logs = readGitFile();
if (options.latest) {
  ChildProcess.exec('echo "This is latest"', function (error, stdout, stderr) {
    console.dir(stdout);
  });
} else {
  if (options.order) {
    const order = +options.order;
    if (Number.isNaN(order)) {
      console.log(`Type only number!!!! range(0 ~ ${logs.length - 1})`);
    } else {
      if (order > logs.length - 1 || order < 0) {
        console.log('This index is not valid');
      } else {
        ChildProcess.exec(`git checkout ${logs[order].id}`);
      }
    }
  } else {
    if (options.last) {
      console.log('Order Of Last Commit : ', logs.length - 1);
    }
  }
}
