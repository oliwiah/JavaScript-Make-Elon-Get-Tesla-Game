/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// ./node_modules/.bin/webpack js/app.js js/out.js
// ./node_modules/.bin/webpack --watch js/app.js js/out.js



function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}
function Game() {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x,y) {
        return x + (y * 10);
    };
    // musiałam wstawić tworzenie 2x, bo nie miało czego usuwać przy 1 kroku, i wywalało null
    this.showFurry = function() {
        // this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
        this.hideVisibleFurry();
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    };
    this.showCoin = function() {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    };
    var self = this;
    this.moveFurry = function() {
        if(this.furry.direction === "right") {
            this.furry.x += 1;
        }
        else if(this.furry.direction === "left"){
            this.furry.x -= 1;
        }
        else if(this.furry.direction === "up"){
            this.furry.y -= 1;
        }
        else if(this.furry.direction === "down"){
            this.furry.y += 1;
        }
        else {
            console.log("Change Furry.direction.value to make it work");
        }
        this.checkCoinColision();
        this.gameOver();
    };
    this.startGame = function() {
        this.idSetInterval = setInterval(function(){ self.moveFurry(); self.showFurry() }, 250); // z console.log działa
    };
    this.hideVisibleFurry = function() {
        var furryDiv = document.querySelector(".furry");
        // console.log(furryDiv);  // roboczo
        furryDiv.classList.remove("furry");
    };
    // var turnFurry = funtion(event) {   // czy to potrzebne?
    //     left: false;
    //     up: false;
    //     right: false;
    //     down: false;
    // };
    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 37: // Left
                self.furry.direction = "left";
                break;

            case 38: // Up
                self.furry.direction = "up";
                break;

            case 39: // Right
                self.furry.direction = "right";
                break;

            case 40: // Down
                self.furry.direction = "down";
                break;
        }
    }, false);  // może dzięki temu false nie potrzebuję var event?
    this.checkCoinColision = function() {
        if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            this.coin = new Coin(); // tworzy nowy obiekt Coin
            this.score++;
            var scoreTable = document.querySelector("#score strong");
            scoreTable.innerText = this.score;
            this.showCoin();
        }
    };
    this.gameOver = function() {
        if ((this.furry.x < 0) || (this.furry.x > 9) || (this.furry.y < 0) || (this.furry.y > 9)) {
            this.hideVisibleFurry();
            clearInterval(this.idSetInterval);
            var gameOverCover = document.querySelector("#over");
            gameOverCover.classList.remove("invisible");
            var gameOverDiv = document.createElement("div");
            gameOverCover.appendChild(gameOverDiv);
            // var gameOverScore = document.querySelector("#score div");    // for normal text verion
            var gameOverScore = document.querySelector("#score strong");
            if (gameOverScore.innerText == 1){
                gameOverDiv.innerText = "This time Elon managed to catch only " + gameOverScore.innerText + " Tesla";
            }
            else {
                gameOverDiv.innerText = "This time Elon managed to catch " + gameOverScore.innerText + " Teslas";
            }
            // gameOverDiv.innerHTML = gameOverScore.innerHTML; // normal text verion
        }
    }
}

var Game = new Game();
Game.showFurry();
Game.showCoin();
Game.startGame();







/***/ })
/******/ ]);