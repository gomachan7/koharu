import { Res } from "Constants/Resources";
import { CustomState } from "Core/State/CustomState";
import { Coord } from "Core/Coord";
import { Button } from "UI/Button";

export class ResultState extends CustomState {

    private scoreText: Phaser.Text;
    private text: Phaser.Text;
    private score: number = 0;

    private retryButton: Button;
    private shareButton: Button;
    private yumekoha: Phaser.Sprite;

    constructor() {
        super();
    }

    init() {
        super.init();

        this.score = arguments[0];

        this.game.stage.backgroundColor = 0xF1BADE;

        this.text = this.game.add.text(10, 10, "Result", { font: '32px', fill: '#fff' });
        this.text.anchor.setTo(0.5, 0);
        this.text.position.setTo(Coord.worldCenterX, 20);
        this.scoreText = this.game.add.text(10, 10, "小春ちゃんを " + this.score + " 回愛でました。", { font: '18px', fill: '#fff' });
        this.scoreText.anchor.setTo(0.5, 0);
        this.scoreText.position.setTo(Coord.worldCenterX, 80);
        this.scoreText.resolution = window.devicePixelRatio;

        this.yumekoha = this.game.add.sprite(0, 120, Res.yumekoha.key);
        this.yumekoha.setSize(320, 180);

        this.retryButton = new Button(this.game, "もう一度遊ぶ");
        this.retryButton.setOnClickedCallback(() => {
            this.game.state.start("StartState");
        });
        this.retryButton.position.setTo(Coord.worldCenterX - 110, 320);
        this.game.add.existing(this.retryButton);

        this.shareButton = new Button(this.game, "Tweet");
        this.shareButton.setOnClickedCallback(() => {
            this.tweet();
        });
        this.shareButton.position.setTo(Coord.worldCenterX - 110, 370);
        this.game.add.existing(this.shareButton);
    }

    preload() {
    }

    create() {
    }

    private tweet() {
        const score = this.score;
        const twitter = "http://twitter.com/share"
        const url = location.href.toString();
        const hashtag = "小春ちゃんファクトリー,小春ちゃん可愛い";
        const text = '小春ちゃんファクトリーで遊んだ結果，' + score + '回小春ちゃんを愛でることができました!';

        window.location.href = twitter + '?url=' + url + '&hashtags=' + hashtag + '&text=' + text;
    }
}