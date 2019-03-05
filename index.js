var check={
    length:{
        id:"le",
        varify:false
    },
    special:{
        id:"sp",
        varify:false
    },
    upper:{
        id:"up",
        varify:false
    },
    number:{
        id:"nu",
        varify:false
    }
}
var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
function pwCheck(){
    let passwd=document.getElementById("pwInput").value;
    let checkTmp={
        length:false,
        special:false,
        upper:false,
        number:false
    }
    checkTmp.length=(passwd.length>=8);
    checkTmp.special=format.test(passwd);
    checkTmp.number=/\d/.test(passwd);
    checkTmp.upper=(passwd!=passwd.toLowerCase());
    for(let item in checkTmp){
        if((checkTmp[item])^(check[item].varify)){
            if(checkTmp[item]) anime_confirm(document.getElementById(check[item].id));
            else anime_cancel(document.getElementById(check[item].id));
            check[item].varify=checkTmp[item];
        }
    }
	console.log(checkTmp);
	return "test";
}

function visible(){
	var x = document.getElementById("pwInput");
	if (x.type == "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
	console.log(x);
}
function anime_confirm(element){
	element.className = "remove";

}
function anime_cancel(element){
	element.className = "unremove";
}
document.getElementById("pwInput").addEventListener("keyup",function(){pwCheck();});
document.getElementById("show").addEventListener("click",function(){visible();});
