import { ComponentType } from "@angular/cdk/overlay"
import { QuestionData } from "src/app/modules/openapi/models";
import { CaptchaData } from "./captchaData";

export class Captcha {
    public captchaData?: CaptchaData;
    public captchaComponent?: ComponentType<unknown>;

    constructor(captchaData?: CaptchaData, questionData?: QuestionData, captchaImage?: String, captchaComponent?: ComponentType<unknown>) {
        if (captchaData !== undefined) {
            this.captchaData = captchaData;
        } else if (questionData !== undefined) {
            this.captchaData = {question: undefined, image: undefined, options: [], correctAnswer: null}

            this.captchaData.options = questionData.answers;
            this.captchaData.correctAnswer = questionData.correctAnswer;
            this.captchaData.question = questionData.title;
        }

        if (captchaImage !== undefined) {
            this.captchaData = {question: undefined, image: undefined, options: [], correctAnswer: null}

            this.captchaData.image = captchaImage;
        }
        
        this.captchaComponent = captchaComponent;
    }
}
