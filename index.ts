import { Command } from 'commander';
import readGitFile from './read-head';

const program = new Command('git-portal');

program
  .option('-o, --order <number>', 'Type order of commit. first = 0')
  .option('-l, --last', 'order of last commit. If you use the o option, this option is ignored.');

program.parse(process.argv);

const options = program.opts();
const logs = readGitFile();
if (options.order) {
  const order = +options.order;
  if (Number.isNaN(order)) {
    console.log(`Type only number!!!! range(0 ~ ${logs.length - 1})`);
  } else {
    if (order > logs.length - 1 || order < 0) {
      console.log('This index is not valid');
    } else {
      console.log(logs[order]);
    }
  }
} else {
  if (options.last) {
    console.log('Order Of Last Commit : ', logs.length - 1);
  }
}
