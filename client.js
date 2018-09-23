const net = require('net');
const fs = require('fs');
const port = 8124;

let arr;
let count = 0;

const client = new net.Socket();

client.setEncoding('utf8');

client.connect(port, function() {
    fs.readFile("qa.json", (err, data) => {

        arr = JSON.parse(data);
        arr.sort(function (a, b) {
            return Math.random() - 0.5;
        });
        client.write('QA');
    });
});

client.on('data', function(data) {
    if(data==='DEC')
    {
        console.log(data);
        client.destroy();
    }
    else if (data === 'ACK')
    {
        console.log('You can send messages');
        client.write(arr[count].question);
    }
    else
    {
        console.log('The question was: '+ arr[count].question);
        if(data === arr[count].answer)
            console.log('correct');
        else
            console.log('uncorrect');

        if(count !== arr.length-1)
        {
            count++;
            client.write(arr[count].question);
        }
        else
            client.destroy();
    }
});

client.on('close', function() {
    console.log('Connection closed');
});