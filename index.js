#! /usr/bin/env node
var request = require("request");
var chalk = require("chalk");

function requestCallback(error, response, body) {
  var data = JSON.parse(body);
  if (response.statusCode === 200) {
    printURLs(data);
  } else {
    console.log("User Name: " + data.message);
  }
};

function printURLs(repos) {
  if (repos.length > 0) {
    repos.forEach(printURL);
  } else {
    console.log("No repositories found");
  }
};

function printURL(repo) {
  var colourFunction = repo.private ? chalk.red : chalk.green;
  console.log(colourFunction(repo.name), repo.clone_url);
};

function generateRequestOptions(githubUserName) {
  return {
    url: 'https://api.github.com/users/' + githubUserName + '/repos',
    headers: {
      'User-Agent': 'request'
    }
  };
};

function main() {
  var githubUserName = process.argv[2];
  if (!githubUserName) {
    console.log("Expecting username as command-line argument");
    return;
  }
  var options = generateRequestOptions(githubUserName);
  request(options, requestCallback);
};

main();
