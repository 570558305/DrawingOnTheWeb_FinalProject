const lat = 30;
const lng = 120;

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


/* THE WEB API IS HERE:*/
	if (counter / 4 >= 2/3 ){
		var s = document.querySelectorAll('span')
		console.log(s)
		for(i=0; i<s.length; i++){
			s[i].style.background = "url('shark.svg')";
		}

	}
	else if (counter / 4 >= 1/3){
		var s = document.querySelectorAll('span')
		console.log(s)
		for(i=0; i<s.length; i++){
			s[i].style.background = "url('whale.svg')";
		}

	}
	else{
		var s = document.querySelectorAll('span')
		console.log(s)
		for(i=0; i<s.length; i++){
			s[i].style.background = "url('fish.svg')";
		}
	}

});
