import './style.css';
import { TableCreator } from './ts/TableCreator';
import { CarouselHandler } from './ts/CarouselHanlder';
import { TableHandler } from './ts/TableHanlder';

const IDS = {
    BTN_LAUNCH_CAROUSEL: 'rotate-btn',
    BTN_RESET: 'reset-btn',
};

const tableCreator = new TableCreator();
const tableHanlderOne = new TableHandler(1);
const tableHanlderTwo = new TableHandler(2);
const carouselHanlderTeamOne = new CarouselHandler(1);
const carouselHanlderTeamTwo = new CarouselHandler(2);

class GameHanlder {
    public memo: Map<string, string>;

    constructor() {
        this.memo = new Map();
    }
    init() {
        this.setupBtnEventListener();
        tableCreator.populateTable(1);
        tableCreator.populateTable(2);

        tableHanlderOne.init();
        tableHanlderTwo.init();

        carouselHanlderTeamOne.init();
        carouselHanlderTeamTwo.init();
    }

    showRestartBtn() {
        const resetBtn = document.getElementById(IDS.BTN_RESET);
        const btn = document.getElementById(IDS.BTN_LAUNCH_CAROUSEL);

        if (btn == null || resetBtn == null) return;

        resetBtn.classList.remove('!hidden');
        btn.classList.add('!hidden');
    }

    showLaunchCarouselBtn() {
        const resetBtn = document.getElementById(IDS.BTN_RESET);
        const btn = document.getElementById(IDS.BTN_LAUNCH_CAROUSEL);

        if (btn == null || resetBtn == null) return;

        resetBtn.classList.add('!hidden');
        btn.classList.remove('!hidden');
    }

    setupBtnEventListener() {
        const btn = document.getElementById(IDS.BTN_LAUNCH_CAROUSEL);
        const resetBtn = document.getElementById(IDS.BTN_RESET);
        const calculateBtnOne = document.getElementById('calculate-team-1');
        const calculateBtnTwo = document.getElementById('calculate-team-2');

        if (
            btn == null ||
            resetBtn == null ||
            calculateBtnOne == null ||
            calculateBtnTwo == null
        )
            return;

        btn.addEventListener('click', () => {
            tableHanlderOne.resetCalculateInputFields();
            tableHanlderTwo.resetCalculateInputFields();
            this.resetWinner();
            this.launchCarousel();
            tableHanlderOne.showCalculateResult();
            tableHanlderTwo.showCalculateResult();
            tableHanlderOne.saveParticipantsNames();
            tableHanlderTwo.saveParticipantsNames();
            setTimeout(() => this.showRestartBtn(), 10000)
        });

        resetBtn.addEventListener('click', () => {
            this.cleanup();
            tableHanlderOne.fullReset();
            tableHanlderTwo.fullReset();

        });

        calculateBtnTwo.addEventListener('click', () => {
            setTimeout(() => this.assignWinner(), 100);
        });

        calculateBtnOne.addEventListener('click', () => {
            setTimeout(() => this.assignWinner(), 100);
        });
    }

    cleanup() {
        tableCreator.populateTable(1);
        tableCreator.populateTable(2);
        carouselHanlderTeamOne.resetDisplay();
        carouselHanlderTeamTwo.resetDisplay();
        tableHanlderOne.hideCalculateResult();
        tableHanlderTwo.hideCalculateResult();
        tableHanlderOne.init();
        tableHanlderTwo.init();
        tableHanlderOne.resetTotalScoreDisplay();
        tableHanlderTwo.resetTotalScoreDisplay();
        tableHanlderOne.resetCalculateInputFields();
        tableHanlderTwo.resetCalculateInputFields();
        this.showLaunchCarouselBtn();
        this.resetWinner();
    }

    launchCarousel() {
        carouselHanlderTeamOne.startInfiniteRotation();
        carouselHanlderTeamTwo.startInfiniteRotation();
    }

    assignWinner() {
        if (tableHanlderOne.score != null && tableHanlderTwo.score != null) {
            const containerTeamOne =
                document.getElementById('container-team-1');
            const containerTeamTwo =
                document.getElementById('container-team-2');

            if (containerTeamOne == null || containerTeamTwo == null) return;

            if (tableHanlderOne.score > tableHanlderTwo.score) {
                containerTeamOne.classList.add('winner');
                containerTeamTwo.classList.add('loser');

                this.saveWins(
                    tableHanlderOne.price,
                    tableHanlderOne.participants,
                    tableHanlderOne.percents
                );
            } else if (tableHanlderOne.score < tableHanlderTwo.score) {
                containerTeamOne.classList.add('loser');
                containerTeamTwo.classList.add('winner');

                this.saveWins(
                    tableHanlderTwo.price,
                    tableHanlderTwo.participants,
                    tableHanlderTwo.percents
                );
            }
        }
    }

    saveWins(price: number | null, participants: string[], percents: number[]) {
        if (price == null) throw new Error('the price is null');

        for (let i = 0; i < 3; i++) {
            const participant = participants[i];
            const percent = percents[i];
            console.log(participant, price, percent);
            this.memo.set(participant, Math.floor((price / 100) * percent).toString());
        }
    }

    resetWinner() {
        if (tableHanlderOne.score != null && tableHanlderTwo.score != null) {
            const containerTeamOne =
                document.getElementById('container-team-1');
            const containerTeamTwo =
                document.getElementById('container-team-2');

            if (containerTeamOne == null || containerTeamTwo == null) return;

            containerTeamOne.classList.remove('winner');
            containerTeamTwo.classList.remove('loser');
            containerTeamOne.classList.remove('loser');
            containerTeamTwo.classList.remove('winner');
        }
    }
}

const gameHandler = new GameHanlder();

gameHandler.init();
