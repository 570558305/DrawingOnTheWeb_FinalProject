const lat = 30;
const lng = 120;

console.log('hi')

fetch(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=2021-04-22&end=2021-04-23`, {
headers: {
'Authorization': '7386f032-a375-11eb-8d12-0242ac130002-7386f0a0-a375-11eb-8d12-0242ac130002'
}
}).then((response) => response.json()).then((jsonData) => {
// Do something with response data.

var datas = []
var counter = 0

var data1 = jsonData.data[0].type
var data2 = jsonData.data[1].type
var data3 = jsonData.data[2].type
var data4 = jsonData.data[3].type

datas.push(data1)
datas.push(data2)
datas.push(data3)
datas.push(data4)


for (let i = 0; i < datas.length; i++){
	if (datas[i] == 'high'){
		counter += 1
	}
}


if (counter / 4 >= 2/3 ){

	document.querySelector('#one').onmouseover = function(event){
		document.querySelector('#one').style.animationName = 'zoomin';
		document.querySelector('#one').style.animationDuration = '0.5s';
	}

	document.querySelector('#two').onmouseover = function(event){
		document.querySelector('#two').style.animationName = 'zoomin';
		document.querySelector('#two').style.animationDuration = '0.5s';
	}
	document.querySelector('#three').onmouseover = function(event){
		document.querySelector('#three').style.animationName = 'zoomin';
		document.querySelector('#three').style.animationDuration = '0.5s';
	}
	document.querySelector('#four').onmouseover = function(event){
		document.querySelector('#four').style.animationName = 'zoomin';
		document.querySelector('#four').style.animationDuration = '0.5s';
	}
	document.querySelector('#five').onmouseover = function(event){
		document.querySelector('#five').style.animationName = 'zoomin';
		document.querySelector('#five').style.animationDuration = '0.5s';
	}
	document.querySelector('#six').onmouseover = function(event){
		document.querySelector('#six').style.animationName = 'zoomin';
		document.querySelector('#six').style.animationDuration = '0.5s';
	}

}
else if (counter / 4 >= 1/3){
	document.querySelector('#one').onmouseover = function(event){
		document.querySelector('#one').style.animationName = 'zoomin';
		document.querySelector('#one').style.animationDuration = '2s';
	}
	document.querySelector('#two').onmouseover = function(event){
		document.querySelector('#two').style.animationName = 'zoomin';
		document.querySelector('#two').style.animationDuration = '2s';
	}
	document.querySelector('#three').onmouseover = function(event){
		document.querySelector('#three').style.animationName = 'zoomin';
		document.querySelector('#three').style.animationDuration = '2s';
	}
	document.querySelector('#four').onmouseover = function(event){
		document.querySelector('#four').style.animationName = 'zoomin';
		document.querySelector('#four').style.animationDuration = '2s';
	}
	document.querySelector('#five').onmouseover = function(event){
		document.querySelector('#five').style.animationName = 'zoomin';
		document.querySelector('#five').style.animationDuration = '2s';
	}
	document.querySelector('#six').onmouseover = function(event){
		document.querySelector('#six').style.animationName = 'zoomin';
		document.querySelector('#six').style.animationDuration = '2s';
	}
}
else{
	document.querySelector('#one').onmouseover = function(event){
		document.querySelector('#one').style.animationName = 'zoomin';
		document.querySelector('#one').style.animationDuration = '5s';
	}
	document.querySelector('#two').onmouseover = function(event){
		document.querySelector('#two').style.animationName = 'zoomin';
		document.querySelector('#two').style.animationDuration = '5s';
	}
	document.querySelector('#three').onmouseover = function(event){
		document.querySelector('#three').style.animationName = 'zoomin';
		document.querySelector('#three').style.animationDuration = '5s';
	}
	document.querySelector('#four').onmouseover = function(event){
		document.querySelector('#four').style.animationName = 'zoomin';
		document.querySelector('#four').style.animationDuration = '5s';
	}
	document.querySelector('#five').onmouseover = function(event){
		document.querySelector('#five').style.animationName = 'zoomin';
		document.querySelector('#five').style.animationDuration = '5s';
	}
	document.querySelector('#six').onmouseover = function(event){
		document.querySelector('#six').style.animationName = 'zoomin';
		document.querySelector('#six').style.animationDuration = '5s';
	}
}

});
