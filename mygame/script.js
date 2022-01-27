enchant();

window.onload = function () {
	const game = new Game(400, 500);  				

	/////////////////////////////////////////////////
	//ゲーム開始前に必要な画像・音を読み込む部分

	const retryImgUrl = "Retry.png";					
	game.preload([retryImgUrl]);					

	const tweetImgUrl = "Tweet.png";					
	game.preload([tweetImgUrl]);		

	const SilverstarImgUrl = "Silverstar.png";					
	game.preload([SilverstarImgUrl]);			

	//読み込み終わり
	/////////////////////////////////////////////////

	game.onload = function () {					

		/////////////////////////////////////////////////

		let score = 0;								
		let turn = 1;
		let multiplier = 1;
		let multiupchance = 0.1;
		let status = 0

		/////////////////////////////////////////////////

		const mainScene = new Scene();					//シーン作成
		game.pushScene(mainScene);  					//mainSceneシーンオブジェクトを画面に設置
		mainScene.backgroundColor = "White"; 			

		//////////////////////////テキスト
		const scoreText = new Label(); 					
		scoreText.font = "20px Meiryo";				
		scoreText.color = 'rgba(0,0,0,1)';		
		scoreText.width = 400;							
		scoreText.moveTo(0, 30);						
		mainScene.addChild(scoreText);					
		scoreText.text = "Score : " + score;			

		const FrameText = new Label(); 					
		FrameText.font = "20px Meiryo";				
		FrameText.color = 'rgba(0,0,0,1)';		
		FrameText.width = 400;							
		FrameText.moveTo(0, 50);						
		mainScene.addChild(FrameText);			

		const multiText = new Label(); 					
		multiText.font = "20px Meiryo";				
		multiText.color = 'rgba(0,0,0,1)';		
		multiText.width = 400;							
		multiText.moveTo(0, 70);						
		mainScene.addChild(multiText);					
		multiText.text = "Multiplier : " + multiplier;

		const multichanceText = new Label(); 				
		multichanceText.font = "20px Meiryo";				
		multichanceText.color = 'rgba(0,0,0,1)';		
		multichanceText.width = 400;							
		multichanceText.moveTo(0, 90);						
		mainScene.addChild(multichanceText);					
		multichanceText.text = "Chance : " + multiplier;

		const RNGText = new Label(); 					
		RNGText.font = "20px Meiryo";				
		RNGText.color = 'rgba(0,0,0,1)';		
		RNGText.width = 400;							
		RNGText.moveTo(0, 130);						
		mainScene.addChild(RNGText);					

		//////////////////////////テキスト

		//メインループ　ここに主要な処理をまとめて書こう
		game.onenterframe = function () {
			if (status == 0){
			RNG = Math.random()
			}
			if (RNG < 0.99 && status == 0){
				score += turn*multiplier;
				turn += 1;
				if (multiupchance > Math.random()){
					multiplier += 1;
					multiupchance = 0.1;
				} else {
					multiupchance += 0.01;
				}
				scoreText.text = "Score : " + score; 				
				multiText.text = "Multiplier : " + multiplier;
				multichanceText.text = "+1 Chance : " + Math.round(multiupchance * 100) + "%"
				RNGText.text = "RNG : " + RNG.toFixed(5);
				FrameText.text = "Frames : " + turn
			} else {		
				status = 1	
				FinalRNG = RNG
				game.popScene();				
				game.pushScene(endScene);				
				gameOverText.text = "RNG " + FinalRNG.toFixed(5) + "! SCORE : " + score + "<br/>" + turn + " frames survived"			
			}

		};

		////////////////////////////////////////////////////////////////

		const endScene = new Scene();
		endScene.backgroundColor = "White";

		const gameOverText = new Label(); 					
		gameOverText.font = "20px Meiryo";				
		gameOverText.color = 'rgba(0,0,0,1)';		
		gameOverText.width = 400;						
		gameOverText.moveTo(0, 30);					
		endScene.addChild(gameOverText);					

		const retryBtn = new Sprite(100, 50);				//画像サイズをここに書く。使う予定の画像サイズはプロパティで見ておくこと
		retryBtn.moveTo(50, 300);						//リトライボタンの位置
		retryBtn.image = game.assets[retryImgUrl];			//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		endScene.addChild(retryBtn);					//endSceneにこのリトライボタン画像を貼り付ける  

		const Sstar = new Sprite(64, 64);				
		if (score >= 1000000) {
			Sstar.moveTo(200,250);	
		} else {
			Sstar.moveTo(800,800);	
		}
		Sstar.image = game.assets[SilverstarImgUrl];			
		endScene.addChild(Sstar);				

		retryBtn.ontouchend = function () {				//S_Retryボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			status = 0;
			score = 0;
			multiupchance = 0.1;
			multiplier = 1;
			turn = 0;
			game.popScene();						//endSceneシーンを外す
			game.pushScene(mainScene);					//mainSceneシーンを入れる
		};

		//ツイートボタン
		const tweetBtn = new Sprite(100, 50);				//画像サイズをここに書く。使う予定の画像サイズはプロパティで見ておくこと
		tweetBtn.moveTo(230, 300);						//リトライボタンの位置
		tweetBtn.image = game.assets[tweetImgUrl];			//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		endScene.addChild(tweetBtn);					//endSceneにこのリトライボタン画像を貼り付ける  

		tweetBtn.ontouchend = function () {				//S_Tweetボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			//ツイートＡＰＩに送信
			//結果ツイート時にURLを貼るため、このゲームのURLをここに記入してURLがツイート画面に反映されるようにエンコードする
			const url = encodeURI("");
			window.open("http://twitter.com/intent/tweet?text=SCORE : " + score + " / "+ turn + " frames survived" + url); 
		};

	};
	game.start();
};