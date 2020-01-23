// npm packages

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
//console.log(inquirer);
const electron = require("electron-html-to");
var gs = require("github-scraper");

// This will ask user to eneter username and favvorite color
inquirer
    .prompt([{
            type: "input",
            message: "Enter a github username",
            name: "username"
        },

        {
            type: "input",
            message: "Enter your favorite color?",
            name: "favoriteColor"
        }
    ])
    .then(function(response) {
        // returns the users response for github username
        var githubUrl = `https://api.github.com/users/${response.username}`;

        // returns the users response for stars
        let starCountUrl = `/${response.username}`;
        gs(starCountUrl, function(err, gsData) {
            //Using Axios to retrieve the user data from github api
            axios
                .get(githubUrl)
                .then(function(data) {
                    //Console.log the returned data
                    console.log(data);

                    //convert html to PDF
                    var conversion = electron({
                        converterPath: electron.converters.PDF
                    });

                    //HTML template for pdf
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

  @media print{

  
        body {
           -webkit-print-color-adjust: exact !important;
            font-family: "Delius Swash Caps", cursive;
            font-family: "Patrick Hand SC", cursive;
            background-image: url("https://insights.dice.com/wp-content/uploads/2019/11/Screen-Shot-2019-11-14-at-10.37.26-AM.png"!important);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            background-color: rgba(0, 0, 0, 0.5);
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
            margin-left: -10px;
            margin-bottom: 15px;
            background-color: #fff;
            color: black;
            border: 1px solid black;
            border-radius: 8px;
            transition: transform 0.2s;
            font-size: 20px;
        }
        
        .btn:hover {
            background-color: black;
            color: #fff;
            transform: scale(1.1);
        }
        
        .btn,
        .second {
            margin-left: 20px;
        }
        
        .container-fluid {
            margin-top: 5px;
            border: 1px solid black;
            text-align: center;
            border-radius: 20px;
            -webkit-box-shadow: 5px 5px 15px 5px #000000 !important;
            box-shadow: 5px 5px 15px 5px #000000 !important;
            background-color: ${response.favoriteColor};
        }
        
        #info {
            border: 1px solid black;
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            border-radius: 20px;
            -webkit-box-shadow: 5px 5px 15px 5px #000000 !important;
            box-shadow: 5px 5px 15px 5px #000000 !important;
            background-color: ${response.favoriteColor};
        }
        
        #layout {
            margin-top: 20px;
            text-align: center;
            border-radius: 20px;
            font-size: 25px;
        }
        
        .col {
            border: 1px solid black;
            padding: 20px;
            margin-left: 25px;
            border-radius: 20px;
            font-size: 20px;
            -webkit-box-shadow: 5px 5px 15px 5px #000000 !important;
            box-shadow: 5px 5px 15px 5px #000000 !important;
            background-color: ${response.favoriteColor};
        }
        
        #adjust {
            margin-left: 5px;
        }
        
        .w-100 {
            margin: 10px;
        }
        
        #bcg-color {
            max-width: 100%;
            max-height: 100%;
             
        }
    }
    </style>

</head>

<body>
    <!-- container fluid contains img,name,bio,buttons -->
    <div class="container-fluid">
        <img src="${data.data.avatar_url}" id="profile-pic" alt="Profile-pic">


        <p class="h1">${data.data.name}</p>

        <p class="h5">${data.data.bio}</p>
        <br>
        <a href="${data.data.html_url}" target="_blank"><button type="button" class="btn">Github</button></a> 
         <a href="${data.data.blog}" target="_blank"><button type="button" class="btn">My Blog</button></a>
    </div>
    <!-- end of container fluid -->
    <!-- container for username & location -->
    <div class="container" id="info">
        <p class="h3">${response.username}</p>
        <p class="h6"><a href="https://www.google.com/maps/search/?api=1&query=${data.data.location}" target="_blank">${data.data.location}</a></p>
    </div>
    <!-- end of container username & location -->

    <!-- grid layout -->
    <div class="container" id="layout">
        <div class="row">
            <div class="col" id="adjust">Public Repositories: ${data.data.public_repos}</div>
            <div class="col">GitHub Stars:${gsData.stars} </div>
            <div class="w-100"></div>
            <div class="col" id="adjust">Followers: ${data.data.followers}</div>
            <div class="col">Following: ${data.data.following}</div>
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

                            result.stream.pipe(
                                fs.createWriteStream(`${data.data.login}.pdf`)
                            );
                            conversion.kill();
                        }
                    );
                })
                .catch(function(error) {
                    console.log(error);
                });
            // here we end starCount function
        });
    });