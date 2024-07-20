export class Rule {
    public rule ?: string;
    public verified ?: boolean;

    constructor(rule?: string, verified?: boolean){
        this.rule = rule
        this.verified = verified
    }
}