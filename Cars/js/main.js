const score = document.querySelector('.score'),
timer = document.querySelector('.timer'),
	start = document.querySelector('.start'),
	gameArea = document.querySelector('.gameArea'),
	car = document.createElement('div');
car.classList.add('car');


start.addEventListener('click',startGame);
document.addEventListener('keydown',startRun);
document.addEventListener('keyup',stopRun);

const keys= {
	ArrowUp : false,
	ArrowDown : false,
	ArrowRight : false,
	ArrowLeft : false
};

const setting={
	start : false,
	score : 0,
	timer: 0,
	speed : 3,
	traffic: 3
};

function getQuantityElements(heightElement){
return document.documentElement.clientHeight / heightElement + 1;
}

function startGame(){
	min = 0;
hour = 0;
	init();
		tick();
	start.classList.add('hide');
	document.getElementById('audio').currentTime = 0;
	document.getElementById('audio').play();
	gameArea.innerHTML='';
	car.style.left= '125px';
	car.style.top='auto';
	car.style.bottom='10px';
	for (let i = 0; i <getQuantityElements(100); i++) {
		const line = document.createElement('div');
		line.classList.add('line');
		line.style.top =(i*100)+ 'px';
		line.y= i*100;
		gameArea.appendChild(line);
	}

	for (let i=0; i< getQuantityElements(100*setting.traffic); i++){
		const enemy = document.createElement('div');
		enemy.classList.add('enemy');
		enemy.y = -100 * setting.traffic * (i+1);
		enemy.style.left = Math.floor(Math.random()*(gameArea.offsetWidth-50))+'px';
		enemy.style.top = enemy.y+ 'px';
		gameArea.appendChild(enemy);
	}
    setting.score =0;
	setting.start = true;
	gameArea.appendChild(car);
	setting.x = car.offsetLeft;
	setting.y = car.offsetTop;
	requestAnimationFrame(playGame);
}

function playGame() {

	if (setting.start) {
		setting.score+= setting.speed;
		score.innerHTML = 'SCORE<br> '+ setting.score;

		moveRoad();
		moveEnemy();
		if (keys.ArrowLeft && setting.x >0){
			setting.x-=setting.speed;
		}
		if(keys.ArrowRight && setting.x<250){
			setting.x+=setting.speed;
		}

		if(keys.ArrowUp && setting.y >0){
			setting.y-=setting.speed;
		}
		if(keys.ArrowDown && setting.y <(gameArea.offsetHeight-100)){
			setting.y+=setting.speed;
		}
		car.style.left = setting.x + 'px';
		car.style.top = setting.y + 'px';
		requestAnimationFrame(playGame);
	}
	
}
function startRun(event){
	event.preventDefault();
	keys[event.key]= true;
}

function stopRun(event){
	event.preventDefault();
	keys[event.key]= false;
}

function moveEnemy(argument) {
	let enemy = document.querySelectorAll('.enemy');
	enemy.forEach(function(item){
		let carRect = car.getBoundingClientRect();
		let enemyRect = item.getBoundingClientRect();
		if(carRect.top <= enemyRect.bottom&&
			carRect.right >= enemyRect.left&&
			carRect.left <= enemyRect.right&&
			carRect.bottom >= enemyRect.top){
			setting.start =false;
			document.getElementById('audio').pause();
			start.classList.remove('hide');
		
			
		}
		item.y+= setting.speed;
		item.style.top = item.y+'px';
		if(item.y >=document.documentElement.clientHeight){
			item.y =-100;
			item.style.left = Math.floor(Math.random()*(gameArea.offsetWidth-50))+'px';

		}
	})
}

function  moveRoad() {
	let lines = document.querySelectorAll('.line');
	lines.forEach(function(line){
		line.y += setting.speed/2;
		line.style.top = line.y + 'px';
		if(line.y >=document.documentElement.clientHeight)
			line.y =-100;
	})
}
min = 0;
hour = 0;
//Оставляем вашу функцию
function init() {
	sec = 0;
    hour = 0;
    min = 0;
    
    
    setInterval(tick, 1000);
}

//Основная функция tick()
function tick() {
    sec++;
    if (setting.start==false){ return;} else{
    if (sec >= 60) { //задаем числовые параметры, меняющиеся по ходу работы программы
        min++;
        sec = sec - 60;
    }
    if (min >= 60) {
        hour++;
        min = min - 60;
    }
    if (sec < 10) { //Визуальное оформление
        if (min < 10) {
            if (hour < 10) {
                document.getElementById('timer').innerHTML ='0' + hour + ':0' + min + ':0' + sec;
            } else {
                document.getElementById('timer').innerHTML = hour + ':0' + min + ':0' + sec;
            }
        } else {
            if (hour < 10) {
                document.getElementById('timer').innerHTML = '0' + hour + ':' + min + ':0' + sec;
            } else {
                document.getElementById('timer').innerHTML = hour + ':' + min + ':0' + sec;
            }
        }
    } else {
        if (min < 10) {
            if (hour < 10) {
                document.getElementById('timer').innerHTML = '0' + hour + ':0' + min + ':' + sec;
            } else {
                document.getElementById('timer').innerHTML = hour + ':0' + min + ':' + sec;
            }
        } else {
            if (hour < 10) {
                document.getElementById('timer').innerHTML = '0' + hour + ':' + min + ':' + sec;
            } else {
                document.getElementById('timer').innerHTML = hour + ':' + min + ':' + sec;
            }
        }
    }
}}
