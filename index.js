// npm packages

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
//console.log(inquirer);
const electron = require("electron-html-to");
var gs = require("github-scraper");

// This will ask user to eneter username and favvorite color
.prompt([{
            type: "input",
            message: "Enter a github username",
            name: "username"
        },
        {
            type: "input",
            message: "Enter your favorite color?",
            name: "favColor"
        }
    ])
    .then(function(response) {

            // returns the users response for github username
            var githubUrl = `https://api.github.com/users/${response.username}`;

            // returns the users response for stars
            var starCountUrl = `https://api.github.com/users/${response.username}/repos?per_page=100`;

            //Using Axios to retrieve the user data from github api
            axios.get(githubUrl)
                .then(function(data) {

                        //Console.log the returned data
                        console.log(data);

                        //convert html to PDF 
                        var conversion = electron({
                            converterPath: electron.converters.PDF
                        });

                        //hTML template for pdf
                        conversion({
                                    html: ``