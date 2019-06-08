var tabInterval;

var clickInterval;
//Object for projects.

function Project(name,info,image,link,repo){
    this.name = name;

    this.info = info;

    this.image = image;

    this.link = link;

    this.repo = repo;

    this.addToPortfolio = function(){
        $("#portfolio-holder").append(`
        <div class = "project-card flex-container">
        <img class = "project-image" src = ${this.image} width = "279px" height = "270px">

        <div class = "project-aside">
            <p id= "project-title">${this.name}</p>

            <p class = "project-description">${this.info}</p>

            <a class = "project-link link" href = ${this.link}>Link</a>

            <a class = "project-link repo" href = ${this.repo}>Repo</a>
        </div>
    </div>`
        )
    }
}

//array of projects
const projects = [
    new Project(
        "Adventure Setter",
        "My first group project.  I worked on the front and back end for the results list.",
        "assets/images/adventure-setter.png",
        "https://emssslay.github.io/travel-project/index.html",
        "https://github.com/emssslay/travel-project"),
    
    new Project(
        "Dragon Curve",
        "A personal project I made to learn html canvas and practice javascript.  Creates a dragon curve fractal using an array of points.",
        "assets/images/dragon-curve.png",
        "https://ashlyntyler.github.io/dragon-curve",
        "https://github.com/AshlynTyler/dragon-curve"),
    
    new Project(
        "Artist Hangman",
        "One of my first real projects using javascript.  Very very basic but I'm still pleased with it.",
        "assets/images/artist-hangman.png",
        "https://ashlyntyler.github.io/WordGuessGame",
        "https://github.com/AshlynTyler/WordGuessGame"),

    new Project(
        "Conway's Game of Life",
        "This was another personal project I made using javascript and html canvas.  I tried to make the best version of the Game of Life that I could.",
        "./assets/images/game-of-life.png",
        "https://ashlyntyler.github.io/Conways-Game-of-Life",
        "https://github.com/AshlynTyler/Conways-Game-of-Life"

    )
    
]

//append all projects to portfolio and append portfolio to page
function renderPortfolio(){
    $("#content-container").html(`<div id = "portfolio-holder" class = "flex-container">
    </div>`)
    for(let i = 0; i < projects.length; i++){
        projects[i].addToPortfolio();
    }
}

renderPortfolio()


function renderAbout(){
    $("#content-container").html(`<div id = "about-holder" class = "flex-container">
        <p id= "about-paragraph">
            Hi!  I'm Ashlyn Tyler!  I'm a hobbyist game developer and aspiring professional programmer and web developer!  I like to solve problems and create things, and have a love of art and science.  I am a full stack developer proficient in html, css, javascript, and jquery with a specialty in front end developement and design.
        <p>
    
    </div>`)
}

// creating canvas constants

const canvas = document.getElementById("nav-canvas")

const draw = canvas.getContext("2d");

draw.translate(.5,.5);

const canvasClick = document.getElementById("nav-canvas-click")

const drawClick = canvasClick.getContext("2d");

drawClick.translate(.5,.5);

//when hovering over a navbar tab, create an animation of two lines circling the tab element.
$("body").on("mouseenter",".tab",function(event){
    let tabPos = $(this).position();
    let canvasPos = $("#nav-canvas").position();

    let leftPos = tabPos.left - canvasPos.left;

    let topPos = tabPos.top - canvasPos.top;

    let width = $(this).width();

    let height = $(this).height();

    canvas.setAttribute('width', String($("#nav-canvas").width()));

    canvas.setAttribute('height', String($("#nav-canvas").height()));

    let points = [
        frontA = {
            x: leftPos-800,
            y: topPos + height - 10,
            direction: [1,0],
            speed:20
        },

        backA = {
            x: frontA.x - 100,
            y: frontA.y,
            direction: [1,0],
            speed:20

        },

        frontB = {
            x: leftPos + width + 800,
            y: topPos,
            direction: [-1,0],
            speed:20
        },

        backB = {
            x: frontB.x + 100,
            y: frontB.y,
            direction: [-1,0],
            speed:20
        }
    ]

    tabInterval = setInterval(function(){

        for(let i = 0; i < points.length; i++){
            points[i].x += points[i].direction[0] * points[i].speed

            points[i].y += points[i].direction[1] * points[i].speed

            if(points[i].x <= leftPos && points[i].direction[0] === -1){
                points[i].direction = [0,1]
                points[i].speed = 8;
            }

            if(points[i].x >= leftPos + width && points[i].direction[0] === 1){
                points[i].direction = [0,-1]
                points[i].speed = 8;
            }

            if(points[i].y <= topPos && points[i].direction[1] === -1){
                points[i].direction = [-1,0]
                points[i].speed = 8;
            }

            if(points[i].y >= topPos + height -10 && points[i].direction[1] === 1){
                points[i].direction = [1,0]
                points[i].speed = 8;
            }
        }

        draw.clearRect(
            0,
            0,
            $("#nav-canvas").width(),
            $("#nav-canvas").height())

        draw.lineWidth = 2;

        draw.strokeStyle = "#ff0066";

        draw.beginPath();

        draw.moveTo(frontA.x,frontA.y)

        if(Math.abs(backA.direction[0]) === 1){
            draw.lineTo(frontA.x,backA.y)
        }
        else{
            draw.lineTo(backA.x,frontA.y)
        }

        draw.lineTo(backA.x,backA.y)

        draw.moveTo(frontB.x,frontB.y)

        if(Math.abs(backB.direction[0]) === 1){
            draw.lineTo(frontB.x,backB.y)
        }
        else{
            draw.lineTo(backB.x,frontB.y)
        }

        draw.lineTo(backB.x,backB.y)

        draw.stroke();
    },10)
})

//clear animation when moving away from tab element
$("body").on("click",".tab",function(event){

    clearInterval(clickInterval)

    draw.clearRect(
        0,
        0,
        $("#nav-canvas").width(),
        $("#nav-canvas").height())

        canvasClick.setAttribute('width', String($("#nav-canvas-click").width()));

    canvasClick.setAttribute('height', String($("#nav-canvas-click").height()));
    
    let tabPos = $(this).position();

    let canvasPos = $("#nav-canvas-click").position();

    let leftPos = tabPos.left - canvasPos.left;

    let topPos = tabPos.top - canvasPos.top;

    let width = $(this).width();

    let height = $(this).height() - 10;

    let percent = 1;

    drawClick.lineWidth = 2;

    


    clickInterval = setInterval(function(){
        drawClick.clearRect(
            0,
            0,
            $("#nav-canvas-click").width(),
            $("#nav-canvas-click").height()
        )

        if(percent < .5)
            drawClick.strokeStyle = "#aadd55"+Math.round((percent*510)).toString(16);
        else
            drawClick.strokeStyle = "#aadd55"

        drawClick.strokeRect(
            leftPos+(width/2*percent),
            topPos+(height/2*percent),
            width*(1-percent),
            height*(1-percent)
        )
        
        percent = percent *.96

        if(percent < .01){
            clearInterval(clickInterval)

            drawClick.clearRect(
                0,
                0,
                $("#nav-canvas-click").width(),
                $("#nav-canvas-click").height()
            )
        }



    },10)

})

$(document).on("mouseleave",".tab",function(event){
    clearInterval(tabInterval)

    draw.clearRect(
        0,
        0,
        $("#nav-canvas").width(),
        $("#nav-canvas").height())
})

$("body").on("click","#portfolio-tab",function(event){
    renderPortfolio()
});

$("body").on("click","#about-tab",function(event){
    renderAbout();
})

$("body").on("click","#contact-tab",function(event){
    renderContact();
})