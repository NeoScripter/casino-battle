import { SelectorConcatenator } from './SelectorConcatenator';

const concatenator = new SelectorConcatenator();

export class TableHandler {
    private teamNumber: number;
    private scores: number[];
    public participants: string[];
    public deposits: boolean[];
    public refs: boolean[];

    constructor(teamNumber: number) {
        this.teamNumber = teamNumber;
        this.scores = [1, 1, 1];
        this.participants = ['', '', ''];
        this.refs = [false, false, false];
        this.deposits = [false, false, false];
    }

    init() {

        this.setupDepositEventListeners();
        this.setupRefEventListeners();
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

    updateDisplayScore() {
        const totalPoints = this.scores.reduce((acc, score) => acc + score, 0);
        const percentPerPoint = Math.floor((100 / totalPoints) * 100) / 100;

        for (let i = 1; i < 4; i++) {
            const scoreSelector = concatenator.getScore(this.teamNumber, i);
            const percentSelector = concatenator.getPercent(this.teamNumber, i);

            const score = document.getElementById(scoreSelector) as HTMLDivElement;
            const percent = document.getElementById(percentSelector) as HTMLDivElement;

            if (score == null || percent == null) throw new Error('score or percent are not found');

            score.textContent = `Балл: ${this.scores[i - 1]}`;
            percent.textContent = `${ Math.floor((this.scores[i - 1] * percentPerPoint) * 100) / 100}%`;
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
            const element = document.getElementById(selector);

            if (element == null) throw new Error('element is not found');

            const input = element.querySelector('input');

            if (input == null) throw new Error('input is not found');

            this.participants[i - 1] = input.value;
        }
    }
}
