// npm packages

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
//console.log(inquirer);
const electron = require("electron-html-to");
var gs = require("github-scraper");

inquirer

// This will ask user to eneter username and favvorite color
    .prompt([

        {
            type: "input",
            message: "Enter a github username",
            name: "username"
        },

        {
            type: "input",
            message: "What is your favorite color?",
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
                        html: `<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!-- external css style sheet -->
    <link rel="stylesheet" href="./style.css">
    <!-- font awesome -->
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <!-- google fonts -->


    <!-- title -->
    <title>Profile generator</title>

    <!-- css style -->
    <style>
        body {
            -webkit-print-color-adjust: exact !important;
        }
        
        #profile-pic {
            border-radius: 50%;
            width: 150px;
            height: 150px;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
        
        .btn {
            margin-left: 10px;
            background-color: #fff;
            color: black;
            border: 1px solid black;
            border-radius: 8px;
            transition: transform .2s;
        }
        
        .btn:hover {
            background-color: black;
            color: #fff;
            transform: scale(1.1);
        }
        
        .container-fluid {
            border: 1px solid black;
            text-align: center;
        }
        
        #info {
            border: 1px solid black;
            text-align: center;
            margin-top: 50px;
            padding: 20px;
        }
        
        #layout {
            margin-top: 30px;
            text-align: center;
        }
        
        .col {
            border: 1px solid black;
            padding: 20px;
            margin-left: 25px;
        }
        
        #adjust {
            margin-left: 5px;
        }
        
        .w-100 {
            margin: 10px;
        }
    </style>

</head>

<body>
    <!-- container fluid contains img,name,bio,buttons -->
    <div class="container-fluid">
        <img src="https://www.w3schools.com/howto/img_avatar.png" id="profile-pic" alt="Profile-pic">


        <p class="h1">Nikola Jovanovic </p>

        <p class="h5">Front & back end web developer</p>
        <br>
        <button type="button" class="btn">Github</button>
        <button type="button" class="btn">My Blog</button>
    </div>
    <!-- end of container fluid -->
    <!-- container for username & location -->
    <div class="container" id="info">
        <p class="h3">Nikola4work</p>
        <p class="h6">Arlington, V.A </p>
    </div>
    <!-- end of container username & location -->

    <!-- grid layout -->
    <div class="container" id="layout">
        <div class="row">
            <div class="col" id="adjust">Public Repositories</div>
            <div class="col">GitHub Stars</div>
            <div class="w-100"></div>
            <div class="col" id="adjust">Followers</div>
            <div class="col">Following</div>
        </div>
    </div>
    <!-- end of grid location -->

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>

</html>`
                    },

                    function(err, result) {

                        if (err) {
                            return console.error(err);
                        }


                        result.stream.pipe(fs.createWriteStream(`${data.data.login}.pdf`));
                        conversion.kill();
                    });

            })
            .catch(function(error) {

                console.log(error);
            })


    });