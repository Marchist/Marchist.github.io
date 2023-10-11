enchant();

window.onload = function () {
	const game = new Game(500, 515);  				
	game.fps = 60;

	var ASSETS = {
		'retryImgUrl':'Retry.png',
		'tweetImgUrl':'Tweet.png',
		'box':'box.png',
		'boxsmall':'boxsmall.png',
		'box50':'box50.png',
		'boxsmallred':'boxsmallred.png',
		'damaged':'Damaged.png',
	};
	game.preload(ASSETS);

	game.onload = function () {		
			
		function shuffle(array) {
			for (let index = array.length - 1; index > 0; index--) {
			  // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
			  const randomPosition = Math.floor(Math.random() * (index + 1));
		  
			  // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
			  const temporary = array[index];
			  array[index] = array[randomPosition];
			  array[randomPosition] = temporary;
			}
		}

		GetRandomNumber = function(n){
			let ret = 0
			let RNG = Math.random();
			let fiveorless = Math.max(0.4 , 0.6 - 0.01 * Math.floor(score / 1000))
			let sixtonine = (0.94 - fiveorless) / 34
			let six = fiveorless + sixtonine * 10
			let seven = six + sixtonine * 9
			let eight = seven + sixtonine * 8
			let nine = eight + sixtonine * 7
			if (RNG < fiveorless){
				ret = 1 + Math.floor(RNG / (fiveorless/5))
			}else if(RNG < six){
				ret = 6
			}else if(RNG < seven){
				ret = 7
			}else if(RNG < eight){
				ret = 8
			}else if(RNG < nine){
				ret = 9
			}else if(RNG < 0.95){
				ret = 10
			}else{
				ret = -1
			}
			return ret
		}

		GetTargetNumber = function(){
			let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
			shuffle(arr)
			target1 = arr[0]
			target2 = arr[1]
			target3 = arr[2]
			target4 = arr[3]
			target5 = arr[4]
		}

		let score, nomissbonus, life, boxnum, hold, next1, next2, next3, target1, target2, target3, target4, target5
		let gotdamage, gotdamagetimer, gotbonus, gotbonustimer
		const SCOREGAIN = 100;
		const TARGETY = 24

		Initialize = function(){
			score = 0;		
			nomissbonus = 100;
			life = 20;
			boxnum = [0, 0, 0, 0, 0];
			hold = '';
			next1 = GetRandomNumber();
			next2 = GetRandomNumber();
			next3 = GetRandomNumber();
			GetTargetNumber();
			gotdamage = false;
			gotdamagetimer = 15;
			gotbonus = false;
			gotbonustimer = 120;
		}

		Initialize()

		//#region
		const mainScene = new Scene();					
		mainScene.backgroundColor = "White"; 	

		const endScene = new Scene()
		endScene.backgroundColor = "White"

		///////////////////// Labels
		const scoreLabel = new Label(); 					
		scoreLabel.font = "40px BebasNeue";				
		scoreLabel.color = 'rgba(0,0,0,1)';		
		scoreLabel.width = 216;							
		scoreLabel.moveTo(28, 224);						
		mainScene.addChild(scoreLabel);					
		scoreLabel.text = "SCORE";			
		scoreLabel.textAlign = 'center';

		const lifeLabel = new Label(); 					
		lifeLabel.font = "40px BebasNeue";				
		lifeLabel.color = 'rgba(243,82,82,1)';		
		lifeLabel.width = 216;							
		lifeLabel.moveTo(261, 224);						
		mainScene.addChild(lifeLabel);					
		lifeLabel.text = "LIFE";			
		lifeLabel.textAlign = 'center';

		const holdLabel = new Label(); 					
		holdLabel.font = "25px BebasNeue";				
		holdLabel.color = 'rgba(0,0,0,1)';				
		holdLabel.width = 52;		
		holdLabel.moveTo(59, 343);			
		mainScene.addChild(holdLabel);					
		holdLabel.text = 'HOLD';		
		holdLabel.textAlign = 'center';

		const nextLabel = new Label(); 					
		nextLabel.font = "25px BebasNeue";				
		nextLabel.color = 'rgba(0,0,0,1)';				
		nextLabel.width = 52;		
		nextLabel.moveTo(278, 343);			
		mainScene.addChild(nextLabel);					
		nextLabel.text = 'NEXT';		
		nextLabel.textAlign = 'center';

		const targetLabel = new Label(); 					
		targetLabel.font = "25px BebasNeue";				
		targetLabel.color = 'rgba(0,0,0,1)';				
		targetLabel.width = 80;		
		targetLabel.moveTo(78, 39);			
		mainScene.addChild(targetLabel);					
		targetLabel.text = 'TARGET';		
		targetLabel.textAlign = 'center';
		
		const gameOverLabel = new Label()
		gameOverLabel.font = "50px BebasNeue"
		gameOverLabel.color = 'rgba(0,0,0,1)'
		gameOverLabel.width = 500
		gameOverLabel.moveTo(0, 100)
		gameOverLabel.text = "GAME OVER!"
		gameOverLabel.textAlign = 'center'
		endScene.addChild(gameOverLabel)
		///////////////////// Labels



		///////////////////// Sprites
		const Box1 = new Sprite(80, 80);				
		Box1.moveTo(55, 110);						
		Box1.image = game.assets['box'];			
		mainScene.addChild(Box1);		

		const Box2 = new Sprite(80, 80);				
		Box2.moveTo(133, 110);						
		Box2.image = game.assets['box'];			
		mainScene.addChild(Box2);				

		const Box3 = new Sprite(80, 80);				
		Box3.moveTo(211, 110);						
		Box3.image = game.assets['box'];			
		mainScene.addChild(Box3);			

		const Box4 = new Sprite(80, 80);				
		Box4.moveTo(289, 110);						
		Box4.image = game.assets['box'];			
		mainScene.addChild(Box4);	

		const Box5 = new Sprite(80, 80);				
		Box5.moveTo(367, 110);						
		Box5.image = game.assets['box'];			
		mainScene.addChild(Box5);	
		
		const holdBox = new Sprite(60, 60);				
		holdBox.moveTo(55, 371);						
		holdBox.image = game.assets['boxsmall'];			
		mainScene.addChild(holdBox);	

		const nextBox1 = new Sprite(60, 60);				
		nextBox1.moveTo(274, 371);						
		nextBox1.image = game.assets['boxsmallred'];			
		mainScene.addChild(nextBox1);	

		const nextBox2 = new Sprite(60, 60);				
		nextBox2.moveTo(332, 371);						
		nextBox2.image = game.assets['boxsmall'];			
		mainScene.addChild(nextBox2);	

		const nextBox3 = new Sprite(60, 60);				
		nextBox3.moveTo(388, 371);						
		nextBox3.image = game.assets['boxsmall'];			
		mainScene.addChild(nextBox3);	

		const retryBtn = new Sprite(200, 100)
		retryBtn.moveTo(60, 350)
		retryBtn.image = game.assets['retryImgUrl']		
		endScene.addChild(retryBtn)

		const tweetBtn = new Sprite(200, 100)
		tweetBtn.moveTo(260, 350)
		tweetBtn.image = game.assets['tweetImgUrl']
		endScene.addChild(tweetBtn)

		const targetBox1 = new Sprite(50, 50);				
		targetBox1.moveTo(160, TARGETY);						
		targetBox1.image = game.assets['box50'];			
		mainScene.addChild(targetBox1);	

		const targetBox2 = new Sprite(50, 50);				
		targetBox2.moveTo(208, TARGETY);						
		targetBox2.image = game.assets['box50'];			
		mainScene.addChild(targetBox2);	

		const targetBox3 = new Sprite(50, 50);				
		targetBox3.moveTo(254, TARGETY);						
		targetBox3.image = game.assets['box50'];			
		mainScene.addChild(targetBox3);	

		const targetBox4 = new Sprite(50, 50);				
		targetBox4.moveTo(302, TARGETY);						
		targetBox4.image = game.assets['box50'];			
		mainScene.addChild(targetBox4);	

		const targetBox5 = new Sprite(50, 50);				
		targetBox5.moveTo(350, TARGETY);						
		targetBox5.image = game.assets['box50'];			
		mainScene.addChild(targetBox5);	
		///////////////////// Sprites



		///////////////////// Texts
		const scoreText = new Label(); 					
		scoreText.font = "40px BebasNeue";				
		scoreText.color = 'rgba(0,0,0,1)';			
		scoreText.width = 216;		
		scoreText.moveTo(28, 270);			
		mainScene.addChild(scoreText);						
		scoreText.textAlign = 'center';
		
		const lifeText = new Label(); 					
		lifeText.font = "40px BebasNeue";				
		lifeText.color = 'rgba(243,82,82,1)';				
		lifeText.width = 216;		
		lifeText.moveTo(261, 270);			
		mainScene.addChild(lifeText);					
		lifeText.textAlign = 'center';

		const box1Text = new Label(); 					
		box1Text.font = "50px BebasNeue";				
		box1Text.color = 'rgba(0,0,0,1)';			
		box1Text.width = 68;		
		box1Text.moveTo(61, 130);			
		mainScene.addChild(box1Text);		
		box1Text.textAlign = 'center';

		const box2Text = new Label(); 					
		box2Text.font = "50px BebasNeue";				
		box2Text.color = 'rgba(0,0,0,1)';			
		box2Text.width = 68;		
		box2Text.moveTo(139, 130);			
		mainScene.addChild(box2Text);		
		box2Text.textAlign = 'center';

		const box3Text = new Label(); 					
		box3Text.font = "50px BebasNeue";				
		box3Text.color = 'rgba(0,0,0,1)';			
		box3Text.width = 68;		
		box3Text.moveTo(217, 130);			
		mainScene.addChild(box3Text);		
		box3Text.textAlign = 'center';

		const box4Text = new Label(); 					
		box4Text.font = "50px BebasNeue";				
		box4Text.color = 'rgba(0,0,0,1)';			
		box4Text.width = 68;		
		box4Text.moveTo(295, 130);			
		mainScene.addChild(box4Text);		
		box4Text.textAlign = 'center';

		const box5Text = new Label(); 					
		box5Text.font = "50px BebasNeue";				
		box5Text.color = 'rgba(0,0,0,1)';			
		box5Text.width = 68;		
		box5Text.moveTo(373, 130);			
		mainScene.addChild(box5Text);		
		box5Text.textAlign = 'center';

		const nomissbonusText = new Label(); 					
		nomissbonusText.font = "25px BebasNeue";				
		nomissbonusText.color = 'rgba(0,0,0,1)';				
		nomissbonusText.width = 140;		
		nomissbonusText.moveTo(15,442);			
		mainScene.addChild(nomissbonusText);					
		nomissbonusText.textAlign = 'center';

		const holdText = new Label(); 					
		holdText.font = "40px BebasNeue";				
		holdText.color = 'rgba(160,160,160,1)';				
		holdText.width = 60;		
		holdText.moveTo(55, 385);			
		mainScene.addChild(holdText);					
		holdText.text = hold;		
		holdText.textAlign = 'center';

		const next1Text = new Label(); 					
		next1Text.font = "40px BebasNeue";				
		next1Text.color = 'rgba(0,0,0,1)';				
		next1Text.width = 60;		
		next1Text.moveTo(274, 385);			
		mainScene.addChild(next1Text);			
		next1Text.textAlign = 'center';

		const next2Text = new Label(); 					
		next2Text.font = "40px BebasNeue";				
		next2Text.color = 'rgba(0,0,0,1)';				
		next2Text.width = 60;		
		next2Text.moveTo(331, 385);			
		mainScene.addChild(next2Text);		
		next2Text.textAlign = 'center';

		const next3Text = new Label(); 					
		next3Text.font = "40px BebasNeue";				
		next3Text.color = 'rgba(0,0,0,1)';				
		next3Text.width = 60;		
		next3Text.moveTo(388, 385);			
		mainScene.addChild(next3Text);		
		next3Text.textAlign = 'center';

		const target1Text = new Label(); 					
		target1Text.font = "35px BebasNeue";				
		target1Text.color = 'rgba(0,102,204,1)';				
		target1Text.width = 50;		
		target1Text.moveTo(160, TARGETY+12);			
		mainScene.addChild(target1Text);			
		target1Text.textAlign = 'center';

		const target2Text = new Label(); 					
		target2Text.font = "35px BebasNeue";				
		target2Text.color = 'rgba(0,102,204,1)';				
		target2Text.width = 50;		
		target2Text.moveTo(207, TARGETY+12);			
		mainScene.addChild(target2Text);		
		target2Text.textAlign = 'center';

		const target3Text = new Label(); 					
		target3Text.font = "35px BebasNeue";				
		target3Text.color = 'rgba(0,102,204,1)';				
		target3Text.width = 50;		
		target3Text.moveTo(254, TARGETY+12);			
		mainScene.addChild(target3Text);			
		target3Text.textAlign = 'center';

		const target4Text = new Label(); 					
		target4Text.font = "35px BebasNeue";				
		target4Text.color = 'rgba(0,102,204,1)';				
		target4Text.width = 50;		
		target4Text.moveTo(302, TARGETY+12);			
		mainScene.addChild(target4Text);		
		target4Text.textAlign = 'center';

		const target5Text = new Label(); 					
		target5Text.font = "35px BebasNeue";				
		target5Text.color = 'rgba(0,102,204,1)';				
		target5Text.width = 50;		
		target5Text.moveTo(350, TARGETY+12);			
		mainScene.addChild(target5Text);		
		target5Text.textAlign = 'center';

		const gameOverText = new Label()
		gameOverText.font = "40px BebasNeue"
		gameOverText.color = 'rgba(0,0,0,1)'
		gameOverText.width = 500		
		gameOverText.moveTo(0, 200)
		gameOverText.textAlign = 'center'	
		endScene.addChild(gameOverText)

		const bonusText = new Label()
		bonusText.font = "40px BebasNeue"
		bonusText.color = 'rgba(0,0,0,1)'
		bonusText.width = 500
		bonusText.moveTo(0, 134)
		bonusText.textAlign = 'center'
		bonusText.text = "FIVE OF A KIND"
		bonusText.visible = false
		mainScene.addChild(bonusText)
		///////////////////// Texts

		///////////////////// TOP
		const damaged = new Sprite(500, 700)
		damaged.moveTo(0, 0)
		damaged.image = game.assets['damaged']		
		damaged.visible = false
		mainScene.addChild(damaged)

		const damaged2 = new Sprite(500, 700)
		damaged2.moveTo(0, 0)
		damaged2.image = game.assets['damaged']		
		damaged2.visible = false
		endScene.addChild(damaged2)
		///////////////////// TOP

		game.pushScene(mainScene);  			



		Box1.ontouchend = function (){
			BoxCompute(1);	
		};
		Box2.ontouchend = function (){
			BoxCompute(2);	
		};
		Box3.ontouchend = function (){
			BoxCompute(3);	
		};
		Box4.ontouchend = function (){
			BoxCompute(4);	
		};
		Box5.ontouchend = function (){
			BoxCompute(5);	
		};

		box1Text.ontouchend = function (){		
			BoxCompute(1)	
		}
		box2Text.ontouchend = function (){		
			BoxCompute(2)	
		}
		box3Text.ontouchend = function (){		
			BoxCompute(3)	
		}
		box4Text.ontouchend = function (){		
			BoxCompute(4)	
		}
		box5Text.ontouchend = function (){		
			BoxCompute(5)
		}

		holdText.ontouchend = function (){		
			HoldCompute()
		}
		holdBox.ontouchend = function (){		
			HoldCompute()
		}
		//#endregion

		BoxCompute = function(n){
			score += Math.max(1, Math.floor(nomissbonus * next1 / 100))
			boxnum[n-1] += next1
			if (boxnum[n-1] > 10){
				gotdamage = true
				damage = Math.min(boxnum[n-1]-10, 10)
				life -= damage
				boxnum[n-1] = 0
				// damage 1 = 5% ~ damage 10 = 50%
				// damage 1 = x0.05 ~ damage 10 = x0.50 (둘 중 작은 쪽)
				let bonusdamage1 = (damage) * 5
				let bonusdamage2 = Math.floor((damage)*0.05 * nomissbonus)
				nomissbonus -= Math.min(bonusdamage1, bonusdamage2)
				nomissbonus = Math.max(100, nomissbonus)
				if (life <= 0){
				gameOverText.text = "SCORE  " + score.toLocaleString("ko-KR",0)
				game.popScene();				
				game.pushScene(endScene);	
				}
			}else{ 
				if (!BonusCompute()){
					if (nomissbonus < 200){
						nomissbonus += 1
					}else{
						nomissbonus += 1 / (1+0.01*(nomissbonus-200))
					}
					if (boxnum[n-1] == 10){
						boxnum[n-1] = 0
						score += Math.floor(SCOREGAIN * nomissbonus / 100)
					}
				}
			}
			next1 = next2
			next2 = next3
			next3 = GetRandomNumber()
		}

		BonusCompute = function(){
			let flag = false
			let a = boxnum[0]
			let b = boxnum[1]
			let c = boxnum[2]
			let d = boxnum[3]
			let e = boxnum[4]
			if(a == target1 && b == target2 && c == target3 && d == target4 && e == target5){
				score += Math.floor(4000 * nomissbonus / 100)
				life += 2
				boxnum = [0, 0, 0, 0, 0]
				nomissbonus += 21
				bonusText.text = 'TARGET COMPLETE'
				target1 = Math.max(1, GetRandomNumber())
				target2 = Math.max(1, GetRandomNumber())
				target3 = Math.max(1, GetRandomNumber())
				target4 = Math.max(1, GetRandomNumber())
				target5 = Math.max(1, GetRandomNumber())
				gotbonus = true
				flag = true
			}else if(a == b && b == c && c == d && d == e && a > 0){
				score += Math.floor(2000 * nomissbonus / 100)
				life += 1
				boxnum = [0, 0, 0, 0, 0]
				nomissbonus += 11
				bonusText.text = 'FIVE OF A KIND'
				gotbonus = true
				flag = true
			// else if(a == b && b == c && c == d && d == e && a < 0){
			// 	score += Math.floor(10000 * nomissbonus / 100)
			// 	life += 3
			// 	boxnum = [0, 0, 0, 0, 0]
			// 	nomissbonus += 31
			// 	bonusText.text = 'NEGATIVE FIVE OF A KIND!?'
			// 	gotbonus = true
			// 	flag = true
			// }
		    }else if(Math.abs(a-b) == 1 && Math.abs(b-c) == 1 && Math.abs(c-d) == 1 && Math.abs(d-e) == 1 && a != 0 && e != 0){
				score += Math.floor(2000 * nomissbonus / 100)
				life += 1
				boxnum = [0, 0, 0, 0, 0]
				nomissbonus += 11
				bonusText.text = 'STRAIGHT'
				gotbonus = true
				flag = true
			}
			return flag
		}

		HoldCompute = function(){
			if (hold == ''){
				hold = next1
				next1 = next2
				next2 = next3
				next3 = GetRandomNumber()
			}else{
				let temp = next1
				next1 = hold
				hold = temp
			}
		}

		game.onenterframe = function (){
			box1Text.text = boxnum[0]
			box2Text.text = boxnum[1]
			box3Text.text = boxnum[2]
			box4Text.text = boxnum[3]
			box5Text.text = boxnum[4]
			next1Text.text = next1
			next2Text.text = next2
			next3Text.text = next3
			target1Text.text = target1
			target2Text.text = target2
			target3Text.text = target3
			target4Text.text = target4
			target5Text.text = target5
			scoreText.text = score.toLocaleString("ko-KR",0)
			nomissbonusText.text = nomissbonusText.text = '  NO MISS BONUS  ×' + (nomissbonus/100).toFixed(2)
			lifeText.text = life
			holdText.text = hold
			
			if (gotdamage){
				if (life > 0){
					damaged.visible = true
					damaged.opacity = gotdamagetimer * 0.066
					gotdamagetimer -= 1
					if (gotdamagetimer <= 0){
						gotdamage = false
						damaged.visible = false
						gotdamagetimer = 15
					}
				} else {
					damaged2.visible = true
					damaged2.opacity = gotdamagetimer * 0.066
					gotdamagetimer -= 1
					if (gotdamagetimer <= 0){
						gotdamage = false
						damaged2.visible = false
						gotdamagetimer = 15
					}
				}
			}
			
			if (gotbonus){
				bonusText.visible = true
				bonusText.scaleX = 1 + (120-gotbonustimer) * 0.02
				bonusText.scaleY = 1 + (120-gotbonustimer) * 0.02
				bonusText.y -= 0.3
				bonusText.opacity = gotbonustimer * 0.0083
				gotbonustimer -= 1
				if (gotbonustimer <= 0){
					gotbonus = false
					bonusText.visible = false
					bonusText.scaleX = 1
					bonusText.scaleY = 1
					bonusText.y = 84
					gotbonustimer = 120
				}
			}
		};

		retryBtn.ontouchend = function () {
			Initialize()
			game.popScene()
			game.pushScene(mainScene)
		}

		tweetBtn.ontouchend = function () {
			const url = encodeURI("https://marchist.github.io/TEN/");
			window.open("http://twitter.com/intent/tweet?text=SCORE : " + score.toLocaleString("ko-KR",0) + ' ' + url); 	
		};

	};
	game.start();
};