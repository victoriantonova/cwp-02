const net = require('net');
const fs = require('fs');
const port = 8124;
let seed = 1;

const server = net.createServer((client) => {
    let clientName = Date.now()+" "+seed++;
    console.log('Client ' + clientName +' connected');
    let query = false;

    let stream = fs.createWriteStream(`log/client_${clientName}.log`);

    client.setEncoding('utf8');

    client.on('data', (data) => {
        if (query) {
            console.log(data);
            stream.write(`${data}`);
            let z = (Math.random() > 0.5) ? 'yes' : 'no';
            console.log(z);
            stream.write(`Answer - ${z}`);
            client.write(z);
        }
        else if (!query && data === 'QA') {
            query = true;
            client.write('ACK');
        }
        else {
            client.write('DEC');
        }
    });

    client.on('end', () => {
        console.log('Client disconnected');
        stream.write('Disconected');
        stream.end();
    });
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});