import { ComponentType } from "@angular/cdk/overlay"

export class Captcha {
    constructor(public captchaData: {question: string, image: any, options: any, correctAnswer: any}, public captchaComponent?: ComponentType<unknown>) {}
}
