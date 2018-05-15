require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var request = require("request");

var fs = require("fs");

var colors = require("colors");
const player = require("play-sound")();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);
var operation = process.argv[2];
var argument = process.argv[3];

var separator =
  "________________________________________________________________________________________________________________________________________________________";

main(operation, argument);

//                               o8o                .o o.
//                               `"'               .8' `8.
//  ooo. .oo.  .oo.    .oooo.   oooo  ooo. .oo.   .8'   `8.
//  `888P"Y88bP"Y88b  `P  )88b  `888  `888P"Y88b  88     88
//   888   888   888   .oP"888   888   888   888  88     88
//   888   888   888  d8(  888   888   888   888  `8.   .8'
//  o888o o888o o888o `Y888""8o o888o o888o o888o  `8. .8'
//                                                  `" "'
//
//

function main(operation, argument) {
  console.clear();
  console.log();
  console.log(
    "                                                   ██       ██    ██  ██  ██████   ██ ©"
      .rainbow
  );
  console.log(
    "                                                   ██       ██    ██  ██  ██   ██  ██"
      .rainbow
  );
  console.log(
    "                                                   ██       ██    ██  ██  ██████   ██"
      .rainbow
  );
  console.log(
    "                                                   ██       ██    ██  ██  ██   ██  ██"
      .rainbow
  );
  console.log(
    "                                                   ███████   ██████   ██  ██   ██  ██"
      .rainbow + "  Like siri but better.".rainbow
  );
  console.log("");
  console.log(
    "                                                    Made in America"
      .america,
    " by Luis Suarez.".zebra
  );
  console.log("");
  console.log(
    "                                               For help or more commands type:",
    "luiri help".red
  );

  //                o8o   .o88o.
  //                `"'   888 `"
  //               oooo  o888oo   .oooo.o
  //               `888   888    d88(  "8
  //                888   888    `"Y88b.
  //                888   888    o.  )88b
  //               o888o o888o   8""888P'

  if (operation == "tweets") {
    player.play("./audio/mp3/twitter.mp3", err => {
      if (err) console.log(`Could not play sound: ${err}`);
    });

    myTweets();
  }

  if (operation == "twitterTrack") {
    player.play("./audio/mp3/twitterTrack.mp3", err => {
      if (err) console.log(`Could not play sound: ${err}`);
    });

    twitterTrack(argument);
  }

  if (operation == "spotify") {
    player.play("./audio/mp3/spotify.mp3", err => {
      if (err) console.log(`Could not play sound: ${err}`);
    });

    if (argument != undefined) {
      thisSong(argument);
    } else {
      thisSong("The Sign Ace");
    }
  }

  if (operation == "movie") {
    player.play("./audio/mp3/movie.mp3", err => {
      if (err) console.log(`Could not play sound: ${err}`);
    });
    if (argument != undefined) {
      thisMovie(argument);
    } else {
      thisMovie("Mr. Nobody");
    }
  }

  if (operation == "saved") {
    saved();
  }

  if (operation == "log") {
    player.play("./audio/mp3/log.mp3", err => {
      if (err) console.log(`Could not play sound: ${err}`);
    });

    displayLog();
  }

  if (operation == "help") {
    player.play("./audio/mp3/luiri.mp3", err => {
      if (err) console.log(`Could not play sound: ${err}`);
    });

    help();
  }
}

//                                ooooooooooooo                                          .              .o o.
//                                8'   888   `8                                        .o8             .8' `8.
//  ooo. .oo.  .oo.   oooo    ooo      888      oooo oooo    ooo  .ooooo.   .ooooo.  .o888oo  .oooo.o .8'   `8.
//  `888P"Y88bP"Y88b   `88.  .8'       888       `88. `88.  .8'  d88' `88b d88' `88b   888   d88(  "8 88     88
//   888   888   888    `88..8'        888        `88..]88..8'   888ooo888 888ooo888   888   `"Y88b.  88     88
//   888   888   888     `888'         888         `888'`888'    888    .o 888    .o   888 . o.  )88b `8.   .8'
//  o888o o888o o888o     .8'         o888o         `8'  `8'     `Y8bod8P' `Y8bod8P'   "888" 8""888P'  `8. .8'
//                    .o..P'                                                                            `" "'
//                    `Y8P'
//

function myTweets() {
  var params = { screen_name: "suarezluis", count: 5 };

  twitter.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      console.log(" " + tweets[0].user.name.cyan + ";".cyan);
      logIt(
        "<<<<<<<<<<<<<<<<<<<<<<<< NEW LOG STARTS HERE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );
      logIt(tweets[0].user.name + ";");
      for (let i = 0; i < tweets.length; i++) {
        console.log(separator.gray);
        console.log(" ");
        console.log(
          " twitted: ".gray + '"'.yellow + tweets[i].text.blue + '"'.yellow
        );
        console.log("      on: ".gray + tweets[i].created_at.yellow);

        logIt(separator);
        logIt(" ");
        logIt(" twitted: " + '"' + tweets[i].text + '"');
        logIt("      on: " + tweets[i].created_at);
      }
      console.log(separator.gray);
      logIt(separator);
    }
  });
}

//      .                     o8o      .       .                      ooooooooooooo                              oooo          .o o.
//    .o8                     `"'    .o8     .o8                      8'   888   `8                              `888         .8' `8.
//  .o888oo oooo oooo    ooo oooo  .o888oo .o888oo  .ooooo.  oooo d8b      888      oooo d8b  .oooo.    .ooooo.   888  oooo  .8'   `8.
//    888    `88. `88.  .8'  `888    888     888   d88' `88b `888""8P      888      `888""8P `P  )88b  d88' `"Y8  888 .8P'   88     88
//    888     `88..]88..8'    888    888     888   888ooo888  888          888       888      .oP"888  888        888888.    88     88
//    888 .    `888'`888'     888    888 .   888 . 888    .o  888          888       888     d8(  888  888   .o8  888 `88b.  `8.   .8'
//    "888"     `8'  `8'     o888o   "888"   "888" `Y8bod8P' d888b        o888o     d888b    `Y888""8o `Y8bod8P' o888o o888o  `8. .8'
//                                                                                                                             `" "'
//

function twitterTrack(string) {
  var stream = twitter.stream("statuses/filter", { track: string });
  
  console.log(separator.gray);
  logIt("<<<<<<<<<<<<<<<<<<<<<<<< NEW LOG STARTS HERE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  logIt(separator);
  stream.on("data", function(event) {
    console.log("");
    console.log(" Name:.......".gray + event.user.name.red);
    console.log(" User:.......".gray + event.user.screen_name.blue);
    console.log(" Time:.......".gray + event.created_at.yellow);
    console.log(" Location:...".gray + event.user.location);
    console.log(" Tweet:......".gray + event.text.red);
    console.log(separator.gray);

    logIt("");
    logIt(" Name:......." + event.user.name);
    logIt(" User:......." + event.user.screen_name);
    logIt(" Time:......." + event.created_at);
    logIt(" Location:..." + event.user.location);
    logIt(" Tweet:......" + event.text);
    logIt(separator);
  });

  stream.on("error", function(error) {
    throw error;
  });
}

//      .   oooo         o8o            .oooooo..o
//    .o8   `888         `"'           d8P'    `Y8
//  .o888oo  888 .oo.   oooo   .oooo.o Y88bo.       .ooooo.  ooo. .oo.    .oooooooo
//    888    888P"Y88b  `888  d88(  "8  `"Y8888o.  d88' `88b `888P"Y88b  888' `88b
//    888    888   888   888  `"Y88b.       `"Y88b 888   888  888   888  888   888
//    888 .  888   888   888  o.  )88b oo     .d8P 888   888  888   888  `88bod8P'
//    "888" o888o o888o o888o 8""888P' 8""88888P'  `Y8bod8P' o888o o888o `8oooooo.
//                                                                       d"     YD
//                                                                       "Y88888P'
//

function thisSong(string) {
  spotify.search({ type: "track", query: string, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    var artist = data.tracks.items[0].artists[0].name;
    var song = data.tracks.items[0].name;
    var link = data.tracks.items[0].external_urls.spotify;
    var album = data.tracks.items[0].album.name;

    console.log(separator.gray);
    console.log(" ");
    console.log(" " + "The song " + song.green + " by " + artist.green);
    console.log(" " + "is included in the album " + album.green);
    console.log(" " + "and can be previewed at " + link.green);
    console.log(separator.gray);

    logIt(
      "<<<<<<<<<<<<<<<<<<<<<<<< NEW LOG STARTS HERE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
    logIt(separator);
    logIt(" ");
    logIt(" " + "The song " + song + " by " + artist);
    logIt(" " + "is included in the album " + album);
    logIt(" " + "and can be previewed at " + link);
    logIt(separator);
  });
}

//      .   oooo         o8o           ooo        ooooo                        o8o              .o o.
//    .o8   `888         `"'           `88.       .888'                        `"'             .8' `8.
//  .o888oo  888 .oo.   oooo   .oooo.o  888b     d'888   .ooooo.  oooo    ooo oooo   .ooooo.  .8'   `8.
//    888    888P"Y88b  `888  d88(  "8  8 Y88. .P  888  d88' `88b  `88.  .8'  `888  d88' `88b 88     88
//    888    888   888   888  `"Y88b.   8  `888'   888  888   888   `88..8'    888  888ooo888 88     88
//    888 .  888   888   888  o.  )88b  8    Y     888  888   888    `888'     888  888    .o `8.   .8'
//    "888" o888o o888o o888o 8""888P' o8o        o888o `Y8bod8P'     `8'     o888o `Y8bod8P'  `8. .8'
//                                                                                              `" "'

function thisMovie(string) {
  request("http://www.omdbapi.com/?t=" + string + "&apikey=trilogy", function(
    error,
    response,
    body
  ) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      response = JSON.parse(body);

      var title = " " + response.Title + " ";
      var year = "" + response.Year;
      var ratingImdb = "" + response.Ratings[0].Value;
      var ratinRottenTomatoes = "" + response.Ratings[1].Value;
      var country = "" + response.Country;
      var language = "" + response.Language;
      var plot = "" + response.Plot;
      var cast = "" + response.Actors;
      console.log(separator.gray);
      console.log(" ");
      console.log(" " + "Tittle".underline + ":");
      console.log("            " + title.black.bgYellow);
      console.log(" " + "Year".underline + ":");
      console.log("            " + year.yellow);
      console.log(" " + "Country".underline + ":");
      console.log("            " + country.yellow);
      console.log(" " + "Language".underline + ":");
      console.log("            " + language.yellow);
      console.log(" " + "Cast".underline + ":");
      console.log("            " + cast.yellow);
      console.log(" " + "Plot".underline + ":");
      console.log("            " + plot.yellow);
      console.log(" " + "Ratings".underline + ":");
      console.log("            IMDb.............. " + ratingImdb.red);
      console.log("            Rotten Tomatoes... " + ratinRottenTomatoes.red);
      console.log(separator.gray);

      logIt(
        "<<<<<<<<<<<<<<<<<<<<<<<< NEW LOG STARTS HERE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );
      logIt(separator);
      logIt(" ");
      logIt(" " + "Tittle" + ":");
      logIt("            " + title);
      logIt(" " + "Year" + ":");
      logIt("            " + year);
      logIt(" " + "Country" + ":");
      logIt("            " + country);
      logIt(" " + "Language" + ":");
      logIt("            " + language);
      logIt(" " + "Cast" + ":");
      logIt("            " + cast);
      logIt(" " + "Plot" + ":");
      logIt("            " + plot);
      logIt(" " + "Ratings" + ":");
      logIt("            IMDb.............. " + ratingImdb);
      logIt("            Rotten Tomatoes... " + ratinRottenTomatoes);
      logIt(separator);
    }
  });
}

//                                                 .o8
//                                                "888
//   .oooo.o  .oooo.   oooo    ooo  .ooooo.   .oooo888
//  d88(  "8 `P  )88b   `88.  .8'  d88' `88b d88' `888
//  `"Y88b.   .oP"888    `88..8'   888ooo888 888   888
//  o.  )88b d8(  888     `888'    888    .o 888   888
//  8""888P' `Y888""8o     `8'     `Y8bod8P' `Y8bod88P"
//
//

function saved() {
  fs.readFile("saved.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    array = data.split(",");

    main(array[0], array[1]);
  });
}

//  oooo                       ooooo     .     .o o.
//  `888                       `888'   .o8    .8' `8.
//   888   .ooooo.   .oooooooo  888  .o888oo .8'   `8.
//   888  d88' `88b 888' `88b   888    888   88     88
//   888  888   888 888   888   888    888   88     88
//   888  888   888 `88bod8P'   888    888 . `8.   .8'
//  o888o `Y8bod8P' `8oooooo.  o888o   "888"  `8. .8'
//                  d"     YD                  `" "'
//                  "Y88888P'
//

function logIt(string) {
  fs.appendFile("log.txt", string + "\n", function(err) {
    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
  });
}

//        .o8   o8o                      oooo                        ooooo                               .o o.
//       "888   `"'                      `888                        `888'                              .8' `8.
//   .oooo888  oooo   .oooo.o oo.ooooo.   888   .oooo.   oooo    ooo  888          .ooooo.   .oooooooo .8'   `8.
//  d88' `888  `888  d88(  "8  888' `88b  888  `P  )88b   `88.  .8'   888         d88' `88b 888' `88b  88     88
//  888   888   888  `"Y88b.   888   888  888   .oP"888    `88..8'    888         888   888 888   888  88     88
//  888   888   888  o.  )88b  888   888  888  d8(  888     `888'     888       o 888   888 `88bod8P'  `8.   .8'
//  `Y8bod88P" o888o 8""888P'  888bod8P' o888o `Y888""8o     .8'     o888ooooood8 `Y8bod8P' `8oooooo.   `8. .8'
//                             888                       .o..P'                             d"     YD    `" "'
//                            o888o                      `Y8P'                              "Y88888P'
//

function displayLog() {
  fs.readFile("log.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    console.log(data.green);
  });
}

//  oooo                  oooo               .o o.
//  `888                  `888              .8' `8.
//   888 .oo.    .ooooo.   888  oo.ooooo.  .8'   `8.
//   888P"Y88b  d88' `88b  888   888' `88b 88     88
//   888   888  888ooo888  888   888   888 88     88
//   888   888  888    .o  888   888   888 `8.   .8'
//  o888o o888o `Y8bod8P' o888o  888bod8P'  `8. .8'
//                               888         `" "'
//                              o888o
//

function help() {
  console.log(" ");
  console.log(
    "                               ╔════════════════════════════════════════════════════════════════════════╗"
      .rainbow
  );
  console.log(
    "                               ║                                                                        ║"
      .rainbow
  );
  console.log(
    "                               ║   Hi my name is LUIRI, like Siri but better, Ill be assisting you...   ║"
      .rainbow
  );
  console.log(
    "                               ║                                                                        ║"
      .rainbow
  );
  console.log(
    "                               ╠════════════════════════════════════════════════════════════════════════╣"
      .rainbow
  );
  console.log(
    "                               ║                  To see your tweets: luiri tweets                      ║"
      .red
  );
  console.log(
    '                               ║             To track a tweet: luiri twitterTrack "word"                ║'
      .red
  );
  console.log(
    '                               ║            To search for a song: luiri spotify "song name"             ║'
      .green
  );
  console.log(
    '                               ║            To search for a movie: luiri movie "movie name"             ║'
      .yellow
  );
  console.log(
    "                               ║                          Saved: luiri saved                            ║"
      .blue
  );
  console.log(
    "                               ║                      To view the log: luiri log                        ║"
      .green
  );
  console.log(
    "                               ╚════════════════════════════════════════════════════════════════════════╝"
      .rainbow
  );
}
