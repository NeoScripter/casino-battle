import { cIds } from "./TableCreator";

export const PREFIXES = {
    TEAM: 'team',
    PARTICIPANT: 'participant',
    REF: 'ref',
    SCORE: 'score',
    PERCENT: 'percent',
    DEPOSIT: 'deposit',
    TABLE: 'table-parent-team',
};


export class SelectorConcatenator {
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