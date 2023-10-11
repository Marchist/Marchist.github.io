enchant();

window.onload = function () {
	const game = new Game(500, 700);  				
	game.fps = 30;



	var ASSETS = {
		'retryImgUrl':'Retry.png',
		'tweetImgUrl':'Tweet.png',
		'box':'box.png',
		'boxsmall':'boxsmall.png',
		'boxsmallred':'boxsmallred.png',
	};
	game.preload(ASSETS);



	game.onload = function () {					

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

		//////////////////////////////// mainScene

		let score, noholdbonus, life, boxnum, hold, next1, next2, next3
		const SCOREGAIN = 100;

		Initialize = function(){
			score = 0;		
			noholdbonus = 100;
			life = 20;
			boxnum = [0, 0, 0, 0, 0];
			hold = '';
			next1 = GetRandomNumber();
			next2 = GetRandomNumber();
			next3 = GetRandomNumber();
		}

		Initialize()

		const mainScene = new Scene();					
		game.pushScene(mainScene);  					
		mainScene.backgroundColor = "White"; 	

		const scoreLabel = new Label(); 					
		scoreLabel.font = "40px BebasNeue";				
		scoreLabel.color = 'rgba(0,0,0,1)';		
		scoreLabel.width = 216;							
		scoreLabel.moveTo(28, 174);						
		mainScene.addChild(scoreLabel);					
		scoreLabel.text = "SCORE";			
		scoreLabel.textAlign = 'center';

		const scoreText = new Label(); 					
		scoreText.font = "40px BebasNeue";				
		scoreText.color = 'rgba(0,0,0,1)';			
		scoreText.width = 216;		
		scoreText.moveTo(28, 220);			
		mainScene.addChild(scoreText);					
		scoreText.text = score.toLocaleString("ko-KR",0);		
		scoreText.textAlign = 'center';

		const lifeLabel = new Label(); 					
		lifeLabel.font = "40px BebasNeue";				
		lifeLabel.color = 'rgba(243,82,82,1)';		
		lifeLabel.width = 216;							
		lifeLabel.moveTo(261, 174);						
		mainScene.addChild(lifeLabel);					
		lifeLabel.text = "LIFE";			
		lifeLabel.textAlign = 'center';

		const lifeText = new Label(); 					
		lifeText.font = "40px BebasNeue";				
		lifeText.color = 'rgba(243,82,82,1)';				
		lifeText.width = 216;		
		lifeText.moveTo(261, 220);			
		mainScene.addChild(lifeText);					
		lifeText.text = life.toLocaleString("ko-KR",0);		
		lifeText.textAlign = 'center';

		const holdLabel = new Label(); 					
		holdLabel.font = "25px BebasNeue";				
		holdLabel.color = 'rgba(0,0,0,1)';				
		holdLabel.width = 52;		
		holdLabel.moveTo(59, 293);			
		mainScene.addChild(holdLabel);					
		holdLabel.text = 'HOLD';		
		holdLabel.textAlign = 'center';

		const nextLabel = new Label(); 					
		nextLabel.font = "25px BebasNeue";				
		nextLabel.color = 'rgba(0,0,0,1)';				
		nextLabel.width = 52;		
		nextLabel.moveTo(278, 293);			
		mainScene.addChild(nextLabel);					
		nextLabel.text = 'NEXT';		
		nextLabel.textAlign = 'center';

		const Box1 = new Sprite(80, 80);				
		Box1.moveTo(55, 60);						
		Box1.image = game.assets['box'];			
		mainScene.addChild(Box1);		

		const Box2 = new Sprite(80, 80);				
		Box2.moveTo(133, 60);						
		Box2.image = game.assets['box'];			
		mainScene.addChild(Box2);				

		const Box3 = new Sprite(80, 80);				
		Box3.moveTo(211, 60);						
		Box3.image = game.assets['box'];			
		mainScene.addChild(Box3);			

		const Box4 = new Sprite(80, 80);				
		Box4.moveTo(289, 60);						
		Box4.image = game.assets['box'];			
		mainScene.addChild(Box4);	

		const Box5 = new Sprite(80, 80);				
		Box5.moveTo(367, 60);						
		Box5.image = game.assets['box'];			
		mainScene.addChild(Box5);		

		const box1Text = new Label(); 					
		box1Text.font = "50px BebasNeue";				
		box1Text.color = 'rgba(0,0,0,1)';			
		box1Text.width = 68;		
		box1Text.moveTo(61, 80);			
		mainScene.addChild(box1Text);					
		box1Text.text = boxnum[0];	
		box1Text.textAlign = 'center';

		const box2Text = new Label(); 					
		box2Text.font = "50px BebasNeue";				
		box2Text.color = 'rgba(0,0,0,1)';			
		box2Text.width = 68;		
		box2Text.moveTo(139, 80);			
		mainScene.addChild(box2Text);					
		box2Text.text = boxnum[0];	
		box2Text.textAlign = 'center';

		const box3Text = new Label(); 					
		box3Text.font = "50px BebasNeue";				
		box3Text.color = 'rgba(0,0,0,1)';			
		box3Text.width = 68;		
		box3Text.moveTo(217, 80);			
		mainScene.addChild(box3Text);					
		box3Text.text = boxnum[0];	
		box3Text.textAlign = 'center';

		const box4Text = new Label(); 					
		box4Text.font = "50px BebasNeue";				
		box4Text.color = 'rgba(0,0,0,1)';			
		box4Text.width = 68;		
		box4Text.moveTo(295, 80);			
		mainScene.addChild(box4Text);					
		box4Text.text = boxnum[0];	
		box4Text.textAlign = 'center';

		const box5Text = new Label(); 					
		box5Text.font = "50px BebasNeue";				
		box5Text.color = 'rgba(0,0,0,1)';			
		box5Text.width = 68;		
		box5Text.moveTo(373, 80);			
		mainScene.addChild(box5Text);					
		box5Text.text = boxnum[0];	
		box5Text.textAlign = 'center';

		const holdBox = new Sprite(60, 60);				
		holdBox.moveTo(55, 321);						
		holdBox.image = game.assets['boxsmall'];			
		mainScene.addChild(holdBox);	

		const nextBox1 = new Sprite(60, 60);				
		nextBox1.moveTo(274, 321);						
		nextBox1.image = game.assets['boxsmallred'];			
		mainScene.addChild(nextBox1);	

		const nextBox2 = new Sprite(60, 60);				
		nextBox2.moveTo(332, 321);						
		nextBox2.image = game.assets['boxsmall'];			
		mainScene.addChild(nextBox2);	

		const nextBox3 = new Sprite(60, 60);				
		nextBox3.moveTo(388, 321);						
		nextBox3.image = game.assets['boxsmall'];			
		mainScene.addChild(nextBox3);

		const noHoldBonusText = new Label(); 					
		noHoldBonusText.font = "25px BebasNeue";				
		noHoldBonusText.color = 'rgba(0,0,0,1)';				
		noHoldBonusText.width = 140;		
		noHoldBonusText.moveTo(15,392);			
		mainScene.addChild(noHoldBonusText);					
		noHoldBonusText.text = '  NO HOLD BONUS  ×' + (noholdbonus/100).toFixed(2) ;		
		noHoldBonusText.textAlign = 'center';

		const holdText = new Label(); 					
		holdText.font = "40px BebasNeue";				
		holdText.color = 'rgba(160,160,160,1)';				
		holdText.width = 60;		
		holdText.moveTo(55, 335);			
		mainScene.addChild(holdText);					
		holdText.text = hold;		
		holdText.textAlign = 'center';

		const next1Text = new Label(); 					
		next1Text.font = "40px BebasNeue";				
		next1Text.color = 'rgba(0,0,0,1)';				
		next1Text.width = 60;		
		next1Text.moveTo(274, 335);			
		mainScene.addChild(next1Text);					
		next1Text.text = next1;		
		next1Text.textAlign = 'center';

		const next2Text = new Label(); 					
		next2Text.font = "40px BebasNeue";				
		next2Text.color = 'rgba(0,0,0,1)';				
		next2Text.width = 60;		
		next2Text.moveTo(331, 335);			
		mainScene.addChild(next2Text);					
		next2Text.text = next2;		
		next2Text.textAlign = 'center';

		const next3Text = new Label(); 					
		next3Text.font = "40px BebasNeue";				
		next3Text.color = 'rgba(0,0,0,1)';				
		next3Text.width = 60;		
		next3Text.moveTo(388, 335);			
		mainScene.addChild(next3Text);					
		next3Text.text = next3;		
		next3Text.textAlign = 'center';

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

		BoxCompute = function(n){	
			boxnum[n-1] += next1
			if (boxnum[n-1] == 10){
				boxnum[n-1] = 0
				score += Math.floor(SCOREGAIN * noholdbonus / 100)
			}else if (boxnum[n-1] > 10){
				life -= (boxnum[n-1] - 10)
				boxnum[n-1] = 0
				if (life <= 0){
				gameOverText.text = "SCORE " + score.toLocaleString("ko-KR",0)
				game.popScene();				
				game.pushScene(endScene);	
				}
			}
			next1 = next2
			next2 = next3
			next3 = GetRandomNumber()
			if (noholdbonus < 200){
				noholdbonus += 1
			}else{
				noholdbonus += 1 / (1+0.01*(noholdbonus-200))
			}
			TextCompute(n);		
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
			noholdbonus = Math.max(noholdbonus - 10, 100)
			TextCompute()
		}

		TextCompute = function(n){
			switch(n){
				case 1:
					box1Text.text = boxnum[n-1];
					break
				case 2:
					box2Text.text = boxnum[n-1];
					break
				case 3:
					box3Text.text = boxnum[n-1];
					break
				case 4:
					box4Text.text = boxnum[n-1];
					break
				case 5:
					box5Text.text = boxnum[n-1];
					break
			}	
			box1Text.text = boxnum[0]
			box2Text.text = boxnum[1]
			box3Text.text = boxnum[2]
			box4Text.text = boxnum[3]
			box5Text.text = boxnum[4]
			next1Text.text = next1
			next2Text.text = next2
			next3Text.text = next3
			scoreText.text = score.toLocaleString("ko-KR",0)
			noHoldBonusText.text = noHoldBonusText.text = '  NO HOLD BONUS  ×' + (noholdbonus/100).toFixed(2)
			lifeText.text = life
			holdText.text = hold
		}

		game.onenterframe = function (){

		};

		//////////////////////////////// mainScene

		const endScene = new Scene()
		endScene.backgroundColor = "White"

		const gameOverLabel = new Label()
		gameOverLabel.font = "50px BebasNeue"
		gameOverLabel.color = 'rgba(0,0,0,1)'
		gameOverLabel.width = 500
		gameOverLabel.moveTo(0, 100)
		gameOverLabel.text = "GAME OVER!"
		gameOverLabel.textAlign = 'center'
		endScene.addChild(gameOverLabel)

		const gameOverText = new Label()
		gameOverText.font = "40px BebasNeue"
		gameOverText.color = 'rgba(0,0,0,1)'
		gameOverText.width = 500		
		gameOverText.moveTo(0, 200)
		gameOverText.textAlign = 'center'	
		endScene.addChild(gameOverText)

		const retryBtn = new Sprite(100, 50)
		retryBtn.moveTo(100, 300)
		retryBtn.image = game.assets['retryImgUrl']		
		endScene.addChild(retryBtn)
			
		retryBtn.ontouchend = function () {
			Initialize()
			TextCompute()
			game.popScene()
			game.pushScene(mainScene)
		}

		const tweetBtn = new Sprite(100, 50)
		tweetBtn.moveTo(290, 300)
		tweetBtn.image = game.assets['tweetImgUrl']
		endScene.addChild(tweetBtn)

		tweetBtn.ontouchend = function () {
			const url = encodeURI("https://marchist.github.io/TEN/");
			window.open("http://twitter.com/intent/tweet?text=SCORE : " + score.toLocaleString("ko-KR",0) + ' ' + url); 	
		};

	};
	game.start();
};