import { accessDomElement } from './accessDomElement';
import { PREFIXES, SelectorConcatenator } from './SelectorConcatenator';

const IDS = {
    REGULAR_CELL: 'regular-cell',
    HEAD_CELL: 'head-cell',
    TEXT_INPUT: 'text-input-field',
    CHECKBOX_INPUT: 'checkbox-input-field',
    RESULT_TABLE: 'table-results-team',
};

export function cIds(...classes: unknown[]): string {
    return classes.filter((c): c is string => typeof c === 'string').join('');
}

const concatenator = new SelectorConcatenator();

export class TableCreator {
    populateTable(team: number) {
        const table = document.getElementById(
            PREFIXES.TABLE + '-' + team.toString()
        ) as HTMLDivElement;

        if (table == null) {
            throw new Error('The table is not found');
        }

        table.innerHTML = '';
        table.classList.remove('winner-cols');

        table.appendChild(this.createFirstColumn(team));
        table.appendChild(this.createSecondColumn(team));
        table.appendChild(this.createThirdColumn(team));
        table.appendChild(this.createFourthColumn(team));
        table.appendChild(this.createFifthColumn(team));
    }

    createFifthColumn(team: number) {
        const div = document.createElement('div');

        div.appendChild(this.getTableHead('ДЕПОЗИТ'));

        for (let n = 1; n < 4; n++) {
            div.appendChild(this.getDeposit(n, team));
        }

        return div;
    }

    createFourthColumn(team: number) {
        const div = document.createElement('div');

        div.appendChild(this.getTableHead('ПРОЦЕНТ'));

        for (let n = 1; n < 4; n++) {
            div.appendChild(this.getPercentCell(n, team));
        }

        return div;
    }

    createThirdColumn(team: number) {
        const div = document.createElement('div');

        div.appendChild(this.getTableHead('БАЛЛ'));

        for (let n = 1; n < 4; n++) {
            div.appendChild(this.getScoreCell(n, team));
        }

        return div;
    }

    createSecondColumn(team: number) {
        const div = document.createElement('div');

        div.appendChild(this.getTableHead('РЕФ'));

        for (let n = 1; n < 4; n++) {
            div.appendChild(this.getRef(n, team));
        }

        return div;
    }

    createFirstColumn(team: number) {
        const div = document.createElement('div');

        div.appendChild(this.getTableHead('Участник'));
        for (let n = 1; n < 4; n++) {
            div.appendChild(
                this.getTextInput('Участник ' + n.toString(), n, team)
            );
        }

        return div;
    }

    getTableHead(text: string) {
        const clonedContent = this.extractTemplateContent(IDS.HEAD_CELL);

        const divElement = clonedContent.querySelector(
            'div'
        ) as HTMLDivElement | null;

        if (divElement == null) {
            throw new Error('The template does not contain div element');
        }

        divElement.textContent = text;

        return clonedContent;
    }

    getPercentCell(percent: number, team: number) {
        const clonedContent = this.extractTemplateContent(IDS.REGULAR_CELL);

        const divElement = clonedContent.querySelector(
            'div'
        ) as HTMLDivElement | null;

        if (divElement == null) {
            throw new Error('The template does not contain div element');
        }

        divElement.textContent = '33.33%';
        divElement.id = concatenator.getPercent(team, percent);

        return clonedContent;
    }

    getScoreCell(score: number, team: number) {
        const clonedContent = this.extractTemplateContent(IDS.REGULAR_CELL);

        const divElement = clonedContent.querySelector(
            'div'
        ) as HTMLDivElement | null;

        if (divElement == null) {
            throw new Error('The template does not contain div element');
        }

        divElement.textContent = 'Балл: 1';
        divElement.id = concatenator.getScore(team, score);

        return clonedContent;
    }

    getDeposit(deposit: number, team: number) {
        const clonedContent = this.extractTemplateContent(IDS.CHECKBOX_INPUT);

        const inputElement = clonedContent.querySelector(
            'input'
        ) as HTMLInputElement | null;

        if (inputElement == null) {
            throw new Error('The template does not contain input element');
        }

        inputElement.id = concatenator.getDeposit(team, deposit);

        return clonedContent;
    }

    getRef(ref: number, team: number) {
        const clonedContent = this.extractTemplateContent(IDS.CHECKBOX_INPUT);

        const inputElement = clonedContent.querySelector(
            'input'
        ) as HTMLInputElement | null;

        if (inputElement == null) {
            throw new Error('The template does not contain input element');
        }

        inputElement.id = concatenator.getRef(team, ref);

        return clonedContent;
    }

    getTextInput(
        placeholder: string = 'Участник',
        participant: number,
        team: number
    ) {
        const clonedContent = this.extractTemplateContent(IDS.TEXT_INPUT);

        const inputElement = clonedContent.querySelector(
            'input'
        ) as HTMLInputElement | null;

        if (inputElement == null) {
            throw new Error('The template does not contain input element');
        }

        inputElement.placeholder = placeholder;
        inputElement.id = concatenator.getParticipant(team, participant);

        return clonedContent;
    }

    extractTemplateContent(selector: string) {
        const template = document.getElementById(
            selector
        ) as HTMLTemplateElement;

        if (template == null || template.content == null) {
            throw new Error('The template is empty or non existent');
        }

        const clonedContent = template.content.cloneNode(
            true
        ) as DocumentFragment;
        return clonedContent;
    }

    // Winning table

    populateWinnerTable(
        team: number,
        payments: number[],
        percents: number[],
        names: string[]
    ) {
        const table = document.getElementById(
            PREFIXES.TABLE + '-' + team.toString()
        ) as HTMLDivElement;
        const resultTable = document.getElementById(
            cIds(IDS.RESULT_TABLE, '-', team.toString())
        );

        if (resultTable == null || table == null) return;

        resultTable.classList.add('!hidden');

        table.innerHTML = '';
        table.classList.remove('!hidden');
        table.classList.add('winner-cols');

        table.appendChild(this.createFirstWinnerColumn(team, names));
        table.appendChild(this.createSecondWinnerColumn(team, percents));
        table.appendChild(this.createThirdWinnerColumn(team, payments));
    }

    createThirdWinnerColumn(team: number, payments: number[]) {
        const div = document.createElement('div');

        div.appendChild(this.getTableHead('ВЫПЛАТА'));

        for (let n = 1; n < 4; n++) {
            div.appendChild(this.getWinnerScoreCell(n, team, payments[n - 1]));
        }

        return div;
    }

    createSecondWinnerColumn(team: number, percents: number[]) {
        const div = document.createElement('div');

        div.appendChild(this.getTableHead('%'));

        for (let n = 1; n < 4; n++) {
            div.appendChild(
                this.getWinnerPercentCell(n, team, percents[n - 1])
            );
        }

        return div;
    }

    createFirstWinnerColumn(team: number, names: string[]) {
        const div = document.createElement('div');

        div.appendChild(this.getTableHead('Участник'));
        for (let n = 1; n < 4; n++) {
            div.appendChild(
                this.getWinnerParticipantCell(n, team, names[n - 1])
            );
        }

        return div;
    }

    getWinnerParticipantCell(participant: number, team: number, value: string) {
        const clonedContent = this.extractTemplateContent(IDS.TEXT_INPUT);

        const inputElement = accessDomElement(
            'input',
            HTMLInputElement,
            clonedContent
        );

        inputElement.readOnly = true;
        inputElement.value = value;
        inputElement.id = concatenator.getParticipant(team, participant);

        return clonedContent;
    }

    getWinnerScoreCell(score: number, team: number, value: number) {
        const clonedContent = this.extractTemplateContent(IDS.REGULAR_CELL);

        const divElement = accessDomElement(
            'div',
            HTMLDivElement,
            clonedContent
        );

        divElement.textContent = `${value} РУБ.`;
        divElement.id = concatenator.getScore(team, score);

        return clonedContent;
    }

    getWinnerPercentCell(percent: number, team: number, value: number) {
        const clonedContent = this.extractTemplateContent(IDS.REGULAR_CELL);

        const divElement = accessDomElement(
            'div',
            HTMLDivElement,
            clonedContent
        );

        divElement.textContent = `${value}%`;
        divElement.id = concatenator.getPercent(team, percent);

        return clonedContent;
    }
}
