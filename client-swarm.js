let n = process.argv[2];

const execFile = require('child_process');

for (let i = 0; i<n; i++)
{
    execFile.exec('node client.js', (err, stdout, stderr)=>
    {
        if(err)
            console.log(err);
        console.log("\nClient number: "+ (i+1));
        console.log(stdout);
    });
}