import { cIds } from "./TableCreator";

export const PREFIXES = {
    TEAM: 'team',
    PARTICIPANT: 'participant',
    REF: 'ref',
    SCORE: 'score',
    PERCENT: 'percent',
    DEPOSIT: 'deposit',
    TABLE: 'table-parent-team',
    CAROUSEL: "carousel-team",
    TOTAL_SCORE: "total-score-team",
    WINNER: "carousel-winner-team",
};


export class SelectorConcatenator {

    getWinnerImgContainer(team: number) {
        return cIds(PREFIXES.WINNER, '-', team.toString());
    }
    getTotalScore(team: number) {
        return cIds(PREFIXES.TOTAL_SCORE, '-', team.toString());
    }

    getParticipant(team: number, participant: number) {
        return cIds(PREFIXES.TEAM, '-', team.toString(),'-', PREFIXES.PARTICIPANT,'-', participant.toString());
    }
    
    getRef(team: number, ref: number) {
        return cIds(PREFIXES.TEAM, '-', team.toString(),'-', PREFIXES.REF,'-', ref.toString());
    }
    getScore(team: number, score: number) {
        return cIds(PREFIXES.TEAM, '-', team.toString(),'-', PREFIXES.SCORE,'-', score.toString());
    }
    
    getPercent(team: number, percent: number) {
        return cIds(PREFIXES.TEAM, '-', team.toString(),'-', PREFIXES.PERCENT,'-', percent.toString());
    }
    getDeposit(team: number, deposit: number) {
        return cIds(PREFIXES.TEAM, '-', team.toString(),'-', PREFIXES.DEPOSIT,'-', deposit.toString());
    }
}