import StartMenu from './states/startMenu';
import IntroText from './states/introText';
import Dancing from './states/dancing';
import JudgeResult from './states/judgeResult';
import Feedback from './states/feedback';

const game = new Phaser.Game(800, 600, Phaser.AUTO, 'russian-judge-redemption');

game.state.add('startMenu', new StartMenu());
game.state.add('introText', new IntroText());
game.state.add('dancing', new Dancing());
game.state.add('judgeResult', new JudgeResult());
game.state.add('feedback', new Feedback());

game.state.start('startMenu');
