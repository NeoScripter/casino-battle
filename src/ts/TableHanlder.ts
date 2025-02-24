import { SelectorConcatenator } from './SelectorConcatenator';
import { cIds } from './TableCreator';

const concatenator = new SelectorConcatenator();

const IDS = {
    CALCULATE_BTN: "calculate-team",
    BONUS_INPUT: "bonus-team",
    PERCENT_INPUT: "percent-team",
    BET_INPUT: "bet-team",
    RESULT_TABLE: "table-results-team",
    PARENT_TABLE: "table-parent-team",
}

export class TableHandler {
    private teamNumber: number;
    private scores: number[];
    public participants: string[];
    public percents: number[];
    public deposits: boolean[];
    public refs: boolean[];
    public score: number | null;
    public price: number | null;

    constructor(teamNumber: number) {
        this.teamNumber = teamNumber;
        this.scores = [1, 1, 1];
        this.participants = ['', '', ''];
        this.percents = [33.33,33.33,33.33];
        this.refs = [false, false, false];
        this.deposits = [false, false, false];
        this.score = null;
        this.price = null;
    }

    init() {
        this.setupDepositEventListeners();
        this.setupRefEventListeners();
        this.setupCalculateBtnEvent();
    }

    fullReset() {
        this.scores = [1, 1, 1];
        this.participants = ['', '', ''];
        this.percents = [33.33,33.33,33.33];
        this.refs = [false, false, false];
        this.deposits = [false, false, false];
        this.score = null;
        this.price = null;
    }

    updateScore() {
        for (let i = 0; i < 3; i++) {
            if (this.deposits[i] === true) {
                this.scores[i] = 3;
            } else if (this.refs[i] === true) {
                this.scores[i] = 2;
            } else {
                this.scores[i] = 1;
            }
        }
    }

    setupCalculateBtnEvent() {
        const calculateBtn = document.getElementById(cIds(IDS.CALCULATE_BTN, "-", this.teamNumber.toString()));
        const bonusInput = document.getElementById(cIds(IDS.BONUS_INPUT, "-", this.teamNumber.toString())) as HTMLInputElement;
        const betInput = document.getElementById(cIds(IDS.BET_INPUT, "-", this.teamNumber.toString())) as HTMLInputElement;
        const percentInput = document.getElementById(cIds(IDS.PERCENT_INPUT, "-", this.teamNumber.toString())) as HTMLInputElement;

        if (calculateBtn == null || bonusInput == null|| betInput == null|| percentInput == null) return;

        calculateBtn.addEventListener('click', () => {
            if (bonusInput.value == ''|| betInput.value == ''|| percentInput.value == '') return;

            const bonusInputResult = parseFloat(bonusInput.value);
            const betInputResult = parseFloat(betInput.value);
            const percentInputResult = parseFloat(percentInput.value);

            if (isNaN(bonusInputResult) || isNaN(betInputResult) || isNaN(percentInputResult)) return;
            const result = Math.floor((bonusInputResult + betInputResult) / percentInputResult);

            const totalScoreSelector = concatenator.getTotalScore(this.teamNumber);
            const totalScore = document.getElementById(totalScoreSelector) as HTMLDivElement;
    
            if (totalScore == null) throw new Error('total score is not found');
    
            totalScore.textContent = `X${result}`;
            this.score = result;
            this.price = bonusInputResult;
        })
    }
    
    resetCalculateInputFields() {
        const bonusInput = document.getElementById(cIds(IDS.BONUS_INPUT, "-", this.teamNumber.toString())) as HTMLInputElement;
        const betInput = document.getElementById(cIds(IDS.BET_INPUT, "-", this.teamNumber.toString())) as HTMLInputElement;
        const percentInput = document.getElementById(cIds(IDS.PERCENT_INPUT, "-", this.teamNumber.toString())) as HTMLInputElement;

        if (bonusInput == null|| betInput == null|| percentInput == null) return;

        bonusInput.value = '';
        betInput.value = '';
        percentInput.value = '';
    }

    showCalculateResult() {
        const resultTable = document.getElementById(cIds(IDS.RESULT_TABLE, "-", this.teamNumber.toString()));
        const parentTable = document.getElementById(cIds(IDS.PARENT_TABLE, "-", this.teamNumber.toString()));


        if (resultTable == null || parentTable == null) return;

        resultTable.classList.remove("!hidden");
        parentTable.classList.add("!hidden");
    }

    hideCalculateResult() {
        const resultTable = document.getElementById(cIds(IDS.RESULT_TABLE, "-", this.teamNumber.toString()));
        const parentTable = document.getElementById(cIds(IDS.PARENT_TABLE, "-", this.teamNumber.toString()));

        if (resultTable == null || parentTable == null) return;

        resultTable.classList.add("!hidden");
        parentTable.classList.remove("!hidden");
    }

    resetTotalScoreDisplay() {
        const totalScoreSelector = concatenator.getTotalScore(this.teamNumber);
        const totalScore = document.getElementById(totalScoreSelector) as HTMLDivElement;

        if (totalScore == null) throw new Error('total score is not found');

        totalScore.textContent = "Общий балл: 3";
    }

    updateDisplayScore() {
        const totalPoints = this.scores.reduce((acc, score) => acc + score, 0);
        const percentPerPoint = Math.floor((100 / totalPoints) * 100) / 100;

        const totalScoreSelector = concatenator.getTotalScore(this.teamNumber);
        const totalScore = document.getElementById(totalScoreSelector) as HTMLDivElement;

        if (totalScore == null) throw new Error('total score is not found');

        totalScore.textContent = `Общий балл: ${totalPoints}`;

        for (let i = 1; i < 4; i++) {
            const scoreSelector = concatenator.getScore(this.teamNumber, i);
            const percentSelector = concatenator.getPercent(this.teamNumber, i);

            const score = document.getElementById(scoreSelector) as HTMLDivElement;
            const percent = document.getElementById(percentSelector) as HTMLDivElement;

            if (score == null || percent == null) throw new Error('score or percent are not found');

            score.textContent = `Балл: ${this.scores[i - 1]}`;

            const roundedPercentValue = Math.floor((this.scores[i - 1] * percentPerPoint) * 100) / 100;
            this.percents[i - 1] = roundedPercentValue;
            percent.textContent = `${roundedPercentValue}%`;
        }

    }

    setupDepositEventListeners() {
        for (let i = 1; i < 4; i++) {
            const selector = concatenator.getDeposit(this.teamNumber, i);
            const element = document.getElementById(selector);

            if (element == null) throw new Error('deposit is not found');

            element.addEventListener('change', () => {
                this.updateDeposits();
                this.updateScore();
                this.updateDisplayScore();
            });
        }
    }

    setupRefEventListeners() {
        for (let i = 1; i < 4; i++) {
            const selector = concatenator.getRef(this.teamNumber, i);
            const element = document.getElementById(selector);

            if (element == null) throw new Error('ref is not found');
            element.addEventListener('change', () => {
                this.updateRefs();
                this.updateScore();
                this.updateDisplayScore();
            });
        }
    }

    updateRefs() {
        for (let i = 1; i < 4; i++) {
            const selector = concatenator.getRef(this.teamNumber, i);
            const element = document.getElementById(selector) as HTMLInputElement;

            if (element == null) throw new Error('ref is not found');

            this.refs[i - 1] = element.checked;
        }
    }

    updateDeposits() {
        for (let i = 1; i < 4; i++) {
            const selector = concatenator.getDeposit(this.teamNumber, i);
            const element = document.getElementById(selector)  as HTMLInputElement;

            if (element == null) throw new Error('deposit is not found');


            this.deposits[i - 1] = element.checked;
        }
    }

    saveParticipantsNames() {
        for (let i = 1; i < 4; i++) {
            const selector = concatenator.getParticipant(this.teamNumber, i);
            const element = document.getElementById(selector) as HTMLInputElement;

            if (element == null) throw new Error('element is not found');

            this.participants[i - 1] = element.value;
        }
    }
}
