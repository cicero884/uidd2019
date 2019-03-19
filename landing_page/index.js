var icon_names=['photo','cook','jp','ko','code','law','mov'];
var title_word=[
    ['PHOTO','GRAPHY'],
    ['CUISINE','FRENCH','JAPANESE'],
    ['日本語','TRANSLATOR','CULTURE'],
    [],
    ['BRAINFUCK','JAVASCRIPT'],
    [],
    ['FILM','EDITING','ART','DIRECTOR']];

var icons=[];
var titles=[];
for(let i=0;i<icon_names.length;++i){
    icons[i]=document.createElement("IMG");
    icons[i].className="icon "+icon_names[i];
    icons[i].setAttribute("src",`image/${icon_names[i]}.png`);
    titles[i]=document.createElement("div");
    titles[i].className="title_div "+icon_names[i]+" noselect";
	titles[i].style.lineHeight=window.innerHeight/6000;
    for(let j=0;j<title_word[i].length;++j){
        var subtitle=document.createElement("h2");
        subtitle.style.fontSize=innerWidth/25+'px';
        subtitle.innerHTML=title_word[i][j];
        subtitle.className="title";
        titles[i].appendChild(subtitle);
    }
}

var track = document.getElementById('track');
Draggable.create(track, {
    type:"rotation",
    onDrag:subRotate,
    onDragEnd:adjustShow
});
for(let i=0;i<icons.length*2;++i){
    track.appendChild(icons[i%icons.length].cloneNode(true));
}

var track_icons=track.children;
var body=document.getElementById("body");
var Rx,Ry,R,rotateAngle,origionAngle,button=null,button_left,button_top,title; 
//console.log(track_icons);
function subRotate(){
    let data=track.style.transform.replace(/[()\s]+/g, '').split(',');
    let length=track_icons.length;
    rotateAngle=Math.atan2(data[4],data[5])*180/Math.PI;
    for(let i=0;i<length;++i){
        track_icons[i].style.transform = 'rotate('+rotateAngle+'deg)';
    }
}
function adjustShow(){
    let index=Math.round(rotateAngle/(360/track_icons.length));
    console.log(index);
    let angle=index*(360/track_icons.length);
    TweenMax.to(track,1,{rotation:-angle})
    for(let i=0;i<track_icons.length;++i){
        TweenMax.fromTo(track_icons[i],1,{rotation:rotateAngle},{rotation:angle});
    }
    index+=icons.length;
    index%=icons.length;
    body.removeChild(button);
    button=icons[index];
    body.removeChild(title);
    title=titles[index];
    body.appendChild(button);
    body.appendChild(title);
    TweenMax.fromTo(button,1,{opacity:0},{opacity:1});
    TweenMax.fromTo(title,1,{opacity:0},{opacity:1});
}
function setBackground(){
    var canvas = document.getElementById('background');
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    var ctx = canvas.getContext('2d'); 
    //draw circle
    Rx = canvas.width / 1.7;
    Ry = 0;
    R = (Rx+Ry)/1.5;
    ctx.beginPath();
    ctx.arc(Rx, Ry, R, 0, 2 * Math.PI, false);
    ctx.lineWidth = Rx/11;
    ctx.strokeStyle = '#DDD';
    ctx.stroke();
    //draw line
    let P1x=canvas.width/3;
    let P1y=-canvas.height;
    let P2x=canvas.width;
    let P2y=canvas.height;
    ctx.beginPath();
    ctx.moveTo(P1x,P1y);
    ctx.lineTo(P2x,P2y);
    ctx.stroke();
    //draw point
    //y=ax+b
    let a=(P2y-P1y)/(P2x-P1x);
    let b=(P2x*P1y-P1x*P2y)/(P2x-P1x);
    let Px=findCircleLineIntersections(R,Rx,Ry,a,b);
    let Py=[a*Px[0]+b,a*Px[1]+b];
    ctx.beginPath();
    ctx.arc(Px[0], Py[0], Rx/8, 0, 2 * Math.PI, false);
    ctx.arc(Px[1], Py[1], Rx/8, 0, 2 * Math.PI, false);
    ctx.fillStyle='#AAA';
    ctx.fill();
    //set track
    track.style.left=(Rx-R)+'px';
    track.style.top=(Ry-R)+'px';
    track.style.width=(2*R)+'px';
    track.style.height=(2*R)+'px';

    //set icon
    let length=track_icons.length;
    let angle=Math.atan2(Py[0]-Ry,Px[0]-Rx);
    origionAngle=angle;
    for(let i=0;i<length;++i){
        track_icons[i].style.width=Rx/8+'px';
        track_icons[i].style.height='auto';
        track_icons[i].style.left=(R-track_icons[i].offsetWidth/2+R*Math.cos(angle))+'px';
        track_icons[i].style.top=(R-track_icons[i].offsetHeight/2+R*Math.sin(angle))+'px';
        angle+=Math.PI/(icons.length);
    }

    //set button+title
    let P0y=0,P0x=(P0y-b)/a;
    button_left=((P0x+Px[0])/2-track_icons[0].offsetWidth);
    button_top=((P0y+Py[0])/2-track_icons[0].offsetHeight);
    for(let i=0;i<icons.length;++i){
        icons[i].style.width=track_icons[0].offsetWidth*2+'px';
        icons[i].style.height='auto';
        icons[i].style.left=button_left+'px';
        icons[i].style.top=button_top+'px';
		icons[i].className+=" button";
        icons[i].addEventListener("click",function(){showDetail(icons[i]);});
        titles[i].style.left=button_left-R+'px';
        titles[i].style.top=button_top+'px';
    }
    button=icons[0];
    title=titles[0];
    body.appendChild(button);
    body.appendChild(title);
}
function showDetail(e){
    console.log("show");
    let page=document.createElement("div");
    page.className="page";
    let pageBackground=document.createElement("canvas");
    pageBackground.className="pageBackground";
    page.appendChild(pageBackground);
    pageBackground.setAttribute('width', window.innerWidth);
    pageBackground.setAttribute('height', window.innerHeight);
    let returnButton=document.createElement("IMG");
    returnButton.style.width=track_icons[0].width+'px';
    returnButton.style.height=track_icons[0].height+'px';
    returnButton.style.top="0px";
    returnButton.style.left=window.innerWidth-track_icons[0].width+'px';
    returnButton.className="icon";
    returnButton.setAttribute("src","./image/return.png");
    returnButton.addEventListener("click",function(){
        TweenMax.to(title,0.5,{top:button_top+'px',left:button_left-R+'px'});
        TweenMax.to(".title",0.5,{"color":"#BBB"});
        body.removeChild(page);
    });
    page.appendChild(returnButton);
    body.appendChild(page);
    TweenMax.fromTo(page,0.5,{opacity:0},{opacity:1});
    TweenMax.to(".title",0.5,{"color":"#FFF"});
    let title_top=button.offsetTop+button.height+'px';
    TweenMax.to(title,0.5,{top:title_top,left:button.style.left});
}
function findCircleLineIntersections(r, h, k, m, n) {
    // circle: (x - h)^2 + (y - k)^2 = r^2
    // line: y = m * x + n
    // r: circle radius
    // h: x value of circle centre
    // k: y value of circle centre
    // m: slope
    // n: y-intercept

    // get a, b, c values
    let a = 1 + m*m;
    let b = -h * 2 + (m * (n - k)) * 2;
    let c = h*h + Math.pow(n - k,2) - r*r;

    // get discriminant
    let d = b*b - 4 * a * c;
    if (d >= 0) {
        // insert into quadratic formula
        var intersections = [
            (-b + Math.sqrt(b*b - 4 * a * c)) / (2 * a),
            (-b - Math.sqrt(b*b - 4 * a * c)) / (2 * a)
        ];
        if (d == 0) {
            // only 1 intersection
            return [intersections[0]];
        }
        return intersections;
    }
    // no intersection
    return [];
}
