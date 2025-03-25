const fs = require("fs");
const os = require("os");
const { exec } = require("child_process");
const axios = require("axios");

// Get platform/kernel
const platform = os.platform();
// Get CPU architecture
const arch = os.arch();
// Get total memory in megabytes
const totalMemory = Math.floor(os.totalmem() / (1024 * 1024));
// Get free memory in bytes
const freeMemory = Math.floor(os.freemem() / (1024 * 1024));

// Function to show shell type via a shell command.
function showShell() {
  exec("zsh --version", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    process.stdout.write(`Shell: ${stdout}`);
  });
}

// Function to show weather via wttr.in with Axios
function showWeather() {
  axios
    .get('https://wttr.in/\?format="%l+%C%c+%t+%m\n"')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function showInfo() {
  // Read our Apple Logo from text file in directory
  fs.readFile("appleLogo.txt", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // If all goes well, show our logo
    console.log(data.toString());

    // Print the rest of the sustem data

    /*
      we're doing all of this after the file read
      to ensure the logs and functions run afterwards
      for proper formatting
    */

    // Print platform and architecture
    console.log(`OS: ${arch} ${platform}`);
    // Print used RAM out of total RAM
    console.log(`RAM: ${freeMemory} MiB / ${totalMemory} MiB`);
    // Print current shell via showShell function
    showShell();
    // Print the current weather via showWeather function
    showWeather();
  });
}

// Run the showInfo function
showInfo();
