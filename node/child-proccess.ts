import ChildProcess from "child_process";

const ls = ChildProcess.spawn('ls', ['-al']);

ls.stdout.on('data', (data) => {
    console.log('stdout===');
    console.log(data.toString());
    
});

ls.stderr.on('data', (data) => {
    console.log('stderr', data);
});

ls.on('close', code => {
    console.log(`child process exited with code ${code}`);
});

