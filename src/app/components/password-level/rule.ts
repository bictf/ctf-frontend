export class Rule {
    public rule ?: String;
    public verified ?: boolean;

    constructor(rule?: String, verified?: boolean){
        this.rule = rule
        this.verified = verified
    }
}