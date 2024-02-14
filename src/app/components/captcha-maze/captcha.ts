import { ComponentType } from "@angular/cdk/overlay"
import { ChoiceQuestionData } from "src/app/modules/openapi/models";
import { CaptchaData } from "./captchaData";

export class Captcha {
    public captchaData?: CaptchaData;
    public captchaComponent?: ComponentType<unknown>;

    constructor(captchaData?: CaptchaData, captchaComponent?: ComponentType<unknown>){
        this.captchaData = captchaData
        this.captchaComponent = captchaComponent
    }
}
