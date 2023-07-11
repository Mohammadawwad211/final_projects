const WS = new WebSocket('ws://localhost:5000');



let input;

document.forms[0].onsubmit = ()=>{
    // console.log(document.getElementById('message'));
    input = document.getElementById('message');
    console.log(input.value);
    WS.send(input.value);
}


