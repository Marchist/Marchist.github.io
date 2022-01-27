enchant();

window.onload = function () {
	const game = new Game(400, 500);  				//画面サイズを400*500にする。（このサイズだとスマホでも快適なのでおススメ）

	/////////////////////////////////////////////////
	//ゲーム開始前に必要な画像・音を読み込む部分

	//リトライボタン
	const retryImgUrl = "retry.png";						//game.htmlからの相対パス
	game.preload([retryImgUrl]);					//データを読み込んでおく

	//ツイートボタン
	const tweetImgUrl = "tweet.png";						//game.htmlからの相対パス
	game.preload([tweetImgUrl]);					//データを読み込んでおく		

	//読み込み終わり
	/////////////////////////////////////////////////

	game.onload = function () {					//ロードが終わった後にこの関数が呼び出されるので、この関数内にゲームのプログラムを書こう

		/////////////////////////////////////////////////
		//グローバル変数 

		let score = 0;									//ポイント
		let turn = 1;
		let multiplier = 1;
		let multiupchance = 0.1;
		let status = 0

		//グローバル変数終わり
		/////////////////////////////////////////////////

		const mainScene = new Scene();					//シーン作成
		game.pushScene(mainScene);  					//mainSceneシーンオブジェクトを画面に設置
		mainScene.backgroundColor = "White"; 			

		//////////////////////////テキスト
		const scoreText = new Label(); 					//テキストはLabelクラス
		scoreText.font = "20px Meiryo";				//フォントはメイリオ 20px 変えたかったらググってくれ
		scoreText.color = 'rgba(0,0,0,1)';		//色　RGB+透明度　今回は白
		scoreText.width = 400;							
		scoreText.moveTo(0, 30);						
		mainScene.addChild(scoreText);					//mainSceneシーンにこの画像を埋め込む
		scoreText.text = "Score : " + score;			

		const FrameText = new Label(); 					
		FrameText.font = "20px Meiryo";				
		FrameText.color = 'rgba(0,0,0,1)';		
		FrameText.width = 400;							
		FrameText.moveTo(0, 50);						
		mainScene.addChild(FrameText);			

		const multiText = new Label(); 					//テキストはLabelクラス
		multiText.font = "20px Meiryo";				//フォントはメイリオ 20px 変えたかったらググってくれ
		multiText.color = 'rgba(0,0,0,1)';		//色　RGB+透明度　今回は白
		multiText.width = 400;							
		multiText.moveTo(0, 70);						
		mainScene.addChild(multiText);					//mainSceneシーンにこの画像を埋め込む
		multiText.text = "Multiplier : " + multiplier;

		const multichanceText = new Label(); 					//テキストはLabelクラス
		multichanceText.font = "20px Meiryo";				//フォントはメイリオ 20px 変えたかったらググってくれ
		multichanceText.color = 'rgba(0,0,0,1)';		//色　RGB+透明度　今回は白
		multichanceText.width = 400;							
		multichanceText.moveTo(0, 90);						
		mainScene.addChild(multichanceText);					//mainSceneシーンにこの画像を埋め込む
		multichanceText.text = "Chance : " + multiplier;

		const RNGText = new Label(); 					//テキストはLabelクラス
		RNGText.font = "20px Meiryo";				//フォントはメイリオ 20px 変えたかったらググってくれ
		RNGText.color = 'rgba(0,0,0,1)';		//色　RGB+透明度　今回は白
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
		//結果画面
		const endScene = new Scene();
		endScene.backgroundColor = "White";

		//GAMEOVER
		const gameOverText = new Label(); 					//テキストはLabelクラス
		gameOverText.font = "20px Meiryo";				//フォントはメイリオ 20px 変えたかったらググってくれ
		gameOverText.color = 'rgba(0,0,0,1)';		//色　RGB+透明度　今回は白
		gameOverText.width = 400;							//横幅指定　今回画面サイズ400pxなので、width:400pxだと折り返して二行目表示してくれる
		gameOverText.moveTo(0, 30);						//移動位置指定
		endScene.addChild(gameOverText);						//endSceneシーンにこの画像を埋め込む

		//リトライボタン
		const retryBtn = new Sprite(100, 50);				//画像サイズをここに書く。使う予定の画像サイズはプロパティで見ておくこと
		retryBtn.moveTo(50, 300);						//リトライボタンの位置
		retryBtn.image = game.assets[retryImgUrl];			//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		endScene.addChild(retryBtn);					//endSceneにこのリトライボタン画像を貼り付ける  

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
			window.open("http://twitter.com/intent/tweet?text=SCORE : " + score + " / "+ turn + " frames survived" + url); //ハッシュタグにahogeタグ付くようにした。
		};

	};
	game.start();
};