import './style.css';
import { TableCreator } from './ts/TableCreator';
import { CarouselHandler } from './ts/CarouselHanlder';
import { TableHandler } from './ts/TableHanlder';
import { SelectorConcatenator } from './ts/SelectorConcatenator';

const IDS = {
    BTN_LAUNCH_CAROUSEL: 'rotate-btn',
    BTN_RESET: 'reset-btn',
    BTN_RESULTS: 'results-btn',
    RESULT_POPUP: 'result-popup',
    RESULT_POPUP_CELL: 'result-popup-cell',
};

const tableCreator = new TableCreator();
const tableHanlderOne = new TableHandler(1);
const tableHanlderTwo = new TableHandler(2);
const carouselHanlderTeamOne = new CarouselHandler(1);
const carouselHanlderTeamTwo = new CarouselHandler(2);

const concatenator = new SelectorConcatenator();

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
        const btn = document.getElementById(
            IDS.BTN_LAUNCH_CAROUSEL
        ) as HTMLButtonElement;
        const resetBtn = document.getElementById(IDS.BTN_RESET);
        const calculateBtnOne = document.getElementById('calculate-team-1');
        const calculateBtnTwo = document.getElementById('calculate-team-2');
        const resultBtn = document.getElementById(IDS.BTN_RESULTS);

        if (
            btn == null ||
            resetBtn == null ||
            calculateBtnOne == null ||
            calculateBtnTwo == null ||
            resultBtn == null
        )
            throw new Error('One of the buttons is undefined');

        btn.addEventListener('click', () => {
            btn.disabled = true;
            tableHanlderOne.resetCalculateInputFields();
            tableHanlderTwo.resetCalculateInputFields();
            this.resetWinner();
            this.launchCarousel();
            tableHanlderOne.showCalculateResult();
            tableHanlderTwo.showCalculateResult();
            tableHanlderOne.saveParticipantsNames();
            tableHanlderTwo.saveParticipantsNames();
      /*       tableHanlderOne.hideTotalScoreTable();
            tableHanlderTwo.hideTotalScoreTable(); */
            setTimeout(() => {
                this.showRestartBtn();
                btn.disabled = false;
            }, 10000);
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

        resultBtn.addEventListener("click", () => this.showResultPopup());

        const resultPopup = document.getElementById(IDS.RESULT_POPUP);
        
        if (resultPopup == null)
            throw new Error('result popup is undefined');

        resultPopup.addEventListener("click", (event) => {
            if (event.target !== event.currentTarget) return; 
        
            resultPopup.style.opacity = "0%";
            setTimeout(() => {
                resultPopup.classList.add("hidden");
                resultPopup.style.opacity = "100%";
            }, 500);
        });
    }

    showResultPopup() {
        const resultPopup = document.getElementById(IDS.RESULT_POPUP);

        const template = document.getElementById(
            IDS.RESULT_POPUP_CELL
        ) as HTMLTemplateElement;

        
        if (resultPopup == null || template == null)
            throw new Error('result popup is undefined');
        
        const resultPopupChild = resultPopup.querySelector('div');
        if (resultPopupChild == null)
            throw new Error('result popup child is undefined');
        resultPopupChild.innerHTML = '';

        this.memo.forEach((value, key) => {
            const clonedKeyContent = template.content.cloneNode(
                true
            ) as DocumentFragment;

            const keyDiv = clonedKeyContent.querySelector('div.text-center');
            if (keyDiv == null) return;
            keyDiv.textContent = key;
            resultPopupChild.appendChild(clonedKeyContent);

            const clonedValueContent = template.content.cloneNode(
                true
            ) as DocumentFragment;

            const valueDiv = clonedValueContent.querySelector('div.text-center');
            if (valueDiv == null) return;
            valueDiv.textContent = `${value} РУБ.`;
            resultPopupChild.appendChild(clonedValueContent);
        });

        resultPopup.style.opacity = "0%";
        resultPopup.classList.remove('hidden');
        resultPopup.style.opacity = "100%";
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
                    tableHanlderOne.percents,
                    1
                );
            } else if (tableHanlderOne.score < tableHanlderTwo.score) {
                containerTeamOne.classList.add('loser');
                containerTeamTwo.classList.add('winner');

                this.saveWins(
                    tableHanlderTwo.price,
                    tableHanlderTwo.participants,
                    tableHanlderTwo.percents,
                    2
                );
            }
        }
    }

    saveWins(price: number | null, participants: string[], percents: number[], teamNumber: number) {
        if (price == null) throw new Error('the price is null');

        const payments = [];
        for (let i = 0; i < 3; i++) {
            const participant = participants[i];
            const percent = percents[i];
            const payment = Math.ceil((price / 100) * percent);
            payments.push(payment);
            
            this.memo.set(
                participant,
                payment.toString()
            );
        }

        tableCreator.populateWinnerTable(teamNumber, payments, percents, participants);

        const totalScoreValue = `Выплата на команду: ${price} РУБ.`;
        this.showTotalScore(teamNumber, totalScoreValue);

    }
    
    showTotalScore(teamNumber: number, value: string) {
        const totalScoreSelector = concatenator.getTotalScore(teamNumber);
        const totalScore = document.getElementById(totalScoreSelector) as HTMLDivElement;

        if (totalScore == null) throw new Error('total score is not found');

        totalScore.classList.remove('!hidden');
        totalScore.classList.add('winner-text');
        totalScore.textContent = value;
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
