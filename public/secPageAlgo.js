dict={};
new URLSearchParams(window.location.search).forEach((value,name)=>{

    dict[name]=value;
})


let size=dict["size"];
let animations=[];
let speed=dict["speed"];
let pad;

if ((speed<0 || speed>5000  || speed=="" || speed==undefined) || (size>8 || size<4 || size=="" || size==undefined )){
    size=8;
    speed=1000;
    alert("Default setting applied due to unvalid inputs.")
}



if (size==8){
    pad=46;
}
else if (size==7){
    pad=58;
}
else if (size==6){
    pad=75;
}
else if (size==5){
    pad=98;
}
else {
    pad=133;
}

let board=Array(size);

for (let j=0;j<size;j++){
    board[j]=Array(size);
}
colorForIndi=dict["color"]=="BLUE"?["blue","blue","blue","blue","blue","blue","blue","blue"]: ["red","orange","yellow","green","pink","purple","darkgreen","darkblue"];

isSafe=(board,i,j)=>{
    for(let row_dec=i;row_dec>=0;row_dec--){
        if (board[row_dec][j]){
            return false;
        }
    }

    let rd=i;
    let ci=j;
    while(0<=rd && ci<size){
        if (board[rd][ci]){
            return false;
        }
        rd--;
        ci++;
    }

    rd=i;
    let cd=j;
    while(0<=rd && 0<=cd){
        if (board[rd][cd]){
            return false;
        }
        rd--;
        cd--;
    }
    return true;
}

noMultiHit=(x,y)=>{

    if (dict["color"]!="BLUE")
    return true;
// Code below is the logic for single color scheme for queen in every row.
    let i=x;
    let j=y;
    let elem;
    
    let ri=i+1;
    let ci=j+1;

    for (let k=j;k>=0;k--){

        elem=document.getElementById(`${i}_${k}`);
        if (elem.style.backgroundImage!=""){
            return false;
        }
        
    }
    
    for (let l=j;l<size;l++){
        elem=document.getElementById(`${i}_${l}`);
        if (elem.style.backgroundImage!=""){
            return false;
        }
    }
    while(ri<size && ci<size){
        elem=document.getElementById(`${ri}_${ci}`);
        if (elem.style.backgroundImage!=""){
            return false;
        }
        ri++;
        ci++;
    }
    
    for(let row_dec=i;row_dec>=0;row_dec--){
        elem=document.getElementById(`${row_dec}_${j}`);
        if (elem.style.backgroundImage!=""){
            return false;
        }
        
    }

    let rd=i;
    ci=j;
    while(0<=rd && ci<size){

        elem=document.getElementById(`${rd}_${ci}`);
        if (elem.style.backgroundImage!=""){
            return false;
        }
        rd--;
        ci++;
    }

    rd=i;
    let cd=j;
    while(0<=rd && 0<=cd){
        elem=document.getElementById(`${rd}_${cd}`);
        if (elem.style.backgroundImage!=""){
            return false;
        }
        rd--;
        cd--;
    }

    for(let row_inc=i;row_inc<size;row_inc++){
        elem=document.getElementById(`${row_inc}_${j}`);
        if (elem.style.backgroundImage!=""){
            return false;
        }
        
    }
     ri=i;
     cd=j;
    while(ri<size && cd>=0){

        elem=document.getElementById(`${ri}_${cd}`);
        if (elem.style.backgroundImage!=""){
            return false;
        }
        ri++;
        cd--;
    }
    return true;
}

deColor=(id,time)=>{
   
    let i=parseInt(id.split("_")[0]);
    let color=colorForIndi[i];
    let j=parseInt(id.split("_")[1]);

    let elem;
    


    for (let k=j;k>=0;k--){
        elem=document.getElementById(`${i}_${k}`);
        noMultiHit(i,k)?elem.classList.remove(color):0;
    }
    for (let l=j;l<size;l++){
        elem=document.getElementById(`${i}_${l}`);
        noMultiHit(i,l)?elem.classList.remove(color):0;
    }

    let ri=i+1;
    let ci=j+1;
    while(ri<size && ci<size){
        elem=document.getElementById(`${ri}_${ci}`);
        noMultiHit(ri,ci)?elem.classList.remove(color):0;
        ri++;
        ci++;
    }
    
    for(let row_dec=i;row_dec>=0;row_dec--){
        elem=document.getElementById(`${row_dec}_${j}`);
        noMultiHit(row_dec,j)?elem.classList.remove(color):0;
        
    }

    let rd=i;
    ci=j;
    while(0<=rd && ci<size){

        elem=document.getElementById(`${rd}_${ci}`);
        noMultiHit(rd,ci)?elem.classList.remove(color):0;
        rd--;
        ci++;
    }

    rd=i;
    let cd=j;
    while(0<=rd && 0<=cd){
        elem=document.getElementById(`${rd}_${cd}`);
        noMultiHit(rd,cd)?elem.classList.remove(color):0;
        rd--;
        cd--;
    }

    for(let row_inc=i;row_inc<size;row_inc++){
        elem=document.getElementById(`${row_inc}_${j}`);
        noMultiHit(row_inc,j)?elem.classList.remove(color):0;
        
    }
    ri=i;
    cd=j;
   while(ri<size && cd>=0){

       elem=document.getElementById(`${ri}_${cd}`);
       noMultiHit(ri,cd)?elem.classList.remove(color):0;
       ri++;
       cd--;
   }

}

showRange=(id,delay)=>{

    let i=parseInt(id.split("_")[0]);
    let color=colorForIndi[i];
    let j=parseInt(id.split("_")[1]);
    let elem;
    
    let ri=i+1;
    let ci=j+1;

    for (let k=j;k>=0;k--){
        elem=document.getElementById(`${i}_${k}`);
        elem.classList.add(color);
    }
    
    for (let l=j;l<size;l++){
        elem=document.getElementById(`${i}_${l}`);
        elem.classList.add(color);
    }
    while(ri<size && ci<size){
        elem=document.getElementById(`${ri}_${ci}`);
        elem.classList.add(color)
        ri++;
        ci++;
    }
    
    for(let row_dec=i;row_dec>=0;row_dec--){
        elem=document.getElementById(`${row_dec}_${j}`);
            elem.classList.add(color) 
        
    }

    let rd=i;
    ci=j;
    while(0<=rd && ci<size){

        elem=document.getElementById(`${rd}_${ci}`);
        elem.classList.add(color);
        rd--;
        ci++;
    }

    rd=i;
    let cd=j;
    while(0<=rd && 0<=cd){
        elem=document.getElementById(`${rd}_${cd}`);
        elem.classList.add(color)
        rd--;
        cd--;
    }

    for(let row_inc=i;row_inc<size;row_inc++){
        elem=document.getElementById(`${row_inc}_${j}`);
            elem.classList.add(color) 
        
    }
     ri=i;
     cd=j;
    while(ri<size && cd>=0){

        elem=document.getElementById(`${ri}_${cd}`);
        elem.classList.add(color);
        ri++;
        cd--;
    }


}

doanimation=(animan)=>{
    for (let o=0;o<animan.length;o++){
        
    setTimeout(() => {
        if (animan[o][0]=="r"){
            
            document.getElementById(animan[o].slice(1)).style.backgroundImage="";
            deColor(animan[o].slice(1),o);
        }else{
            if (dict["QUEEN_TYPE"]=="anime"){
            document.getElementById(animan[o]).style.backgroundImage = "url('./images/anima_queen.png')";
        }
            else{
            document.getElementById(animan[o]).style.backgroundImage = "url('./images/DefaultQueen.png')";

            document.getElementById(animan[o]).style.backgroundSize=`${pad}px`;}
            showRange(animan[o],o);
        }
    }, o*speed);
    }
}

runNQueen=(board,x)=>{
    if (x==size){
        return true;
    }

    for (let j=0;j<size;j++){
        // animations.push(`${x}_${j}`);
        if(isSafe(board,x,j)){
            board[x][j]=1;
            animations.push(`${x}_${j}`);
            
            if (runNQueen(board,x+1)){
                return true;
            }
            board[x][j]=0;
            animations.push(`r${x}_${j}`);
        } else{
            // animations.push(`r${x}_${j}`);
        }
    }
    return false;
}

runComs=()=>{
    animations=[];
    runNQueen(board,0);
    
    doanimation(animations);
    document.getElementById("run").disabled=true;
}

createBox=()=>{
    let board_h=document.getElementsByClassName("board")[0];
    for (let i=0;i<size;i++){
        let decider=i %2 ==0?1:0;
        for(let j=0;j<size;j++){
            let classN;
            if (decider==1){
                if (j%2==1){
                    classN="black";
                }else{
                    classN="white";
                }
            }else{
                if (j%2==0){
                    classN="black";
                }else{
                    classN="white";
                }
            }
            board[i][j]=0;
            let tmp_box=document.createElement("div");
            tmp_box.setAttribute("id",`${i}_${j}`);
            tmp_box.setAttribute("class",classN);
            tmp_box.style.width=`${pad}px`
            board_h.appendChild(tmp_box);
        }
    }
}
createBox();

if (colorForIndi[0]!="blue"){
    let it;
    let div=document.getElementById("details");
    let list=document.createElement("ul")
    for(let i=0;i<size;i++){
        it =document.createElement("li");
        it.style.color=colorForIndi[i];
        it.innerHTML=`<h4>${i+1}th row Queen has color of ${colorForIndi[i]}</h4>`
        list.appendChild(it);
    }
    div.appendChild(list);
    let disclaimer=document.createElement("div");
    disclaimer.setAttribute("id","disclaimer")
    disclaimer.innerHTML="<h5>NOTE:  The Queen which is placed later, takes the priority for showing its range of influence in  influence overlaping boxes. </h5>"
    div.appendChild(disclaimer);
}else{
    let it =document.createElement("div");
    it.id="hint";
    let div=document.getElementById("details");
    it.innerHTML=`<h4> Each Queen's Influence Is Shown In Blue</h4>`
    div.appendChild(it);

}





