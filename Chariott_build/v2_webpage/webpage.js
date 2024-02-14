// Import required modules
const express = require('express');
const { exec } = require('child_process');

// Initialize express app
const app = express();
const port = 7000;

// Define route handler for root path
app.get('/', (req, res) => {
    // Define the command to be executed
    const command = `grpcurl -proto /chariott/service_discovery/proto/core/v1/service_registry.proto -import-path /chariott/service_discovery/proto/core/v1 -plaintext -d @ 0.0.0.0:50000 service_registry.ServiceRegistry/List <<EOF
{
}
EOF`;

    // Execute the command
    exec(command, (error, stdout, stderr) => {
        // Handle error
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }

        // Handle stderr
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }

        try {
            // Parse the output
            const output = JSON.parse(stdout);

            // Initialize HTML string
            let html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            background-color: #f4f4f4; 
                            margin: 0; 
                            padding: 0; 
                        }
                        h1 { 
                            background-color: #333; 
                            color: #fff; 
                            padding: 10px 0; 
                            margin: 0; 
                        }
                        h1, th { 
                            text-align: center; 
                        }
                        table { 
                            width: 100%; 
                            margin: 20px 0; 
                            border-collapse: collapse; 
                        }
                        th, td { 
                            padding: 15px; 
                            text-align: left; 
                            border-bottom: 1px solid #ddd; 
                        }
                        .refresh-button { 
                            float: right; 
                            margin: 20px; 
                        }
                        button { 
                            padding: 10px 20px; 
                            background-color: #333; 
                            color: #fff; 
                            border: none; 
                            border-radius: 5px; 
                            cursor: pointer; 
                            transition: box-shadow 0.3s ease-in-out; 
                        }
                        button:hover { 
                            box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19); 
                        }
                    </style>
                </head>
                <body>
                    <h1>Services</h1>
                    <table>
                        <tr>
                            <th>Namespace</th>
                            <th>Name</th>
                            <th>URI</th>
                            <th>Communication Kind</th>
                            <th>Status</th>
                        </tr>
            `;

            // Check if there are any services
            if (Object.keys(output).length === 0) {
                html += '<tr><td colspan="5">No services registered yet.</td></tr>';
            } else {
                // Map the services
                const services = output.services.map(service => ({
                    namespace: service.namespace,
                    name: service.name,
                    uri: service.uri,
                    communicationKind: service.communicationKind
                }));

                // Add each service to the HTML string
                services.forEach(service => {
                    html += `
                        <tr>
                            <td>${service.namespace}</td>
                            <td>${service.name}</td>
                            <td>${service.uri}</td>
                            <td>${service.communicationKind}</td>
                            <td><button style="background-color: green; border: none; color: white; padding: 5px 10px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Registered</button></td>
                        </tr>
                    `;
                });
            }

            // Close the HTML string
            html += `
                    </table>
                    <div class="refresh-button">
                        <button onclick="location.reload()">Fetch service</button>
                    </div>
                </body>
                </html>
            `;

            // Send the HTML string as the response
            res.send(html);
        } catch (e) {
            // Handle parsing error
            console.error(`Error: ${e.message}`);
            res.send('<!DOCTYPE html><html><head><style>body { font-family: Arial, sans-serif; }</style></head><body><h1>Loading...</h1></body></html>');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
