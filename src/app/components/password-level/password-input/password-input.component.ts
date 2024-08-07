import {Component, EventEmitter, input, Input, Output} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent {
  private readonly MAX_LINES = 4

  @Input() ruleId?: number
  @Input() rule?: string
  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>()
  public passwordForm: FormGroup;
  @Input() buttonText!: string;

  constructor(formBuilder: FormBuilder) {
    this.passwordForm = formBuilder.group({
      password: ['', Validators.required]
    })
  }

  getPassword() {
    return this.passwordForm.get('password')?.value as string
  }

  checkAnswer() {
    this.onSubmit.emit(this.getPassword())
  }

  adjustHeight(inputTextEvent: Event) {
    const inputField = inputTextEvent.target as HTMLTextAreaElement;

    const lineHeight = parseInt(window.getComputedStyle(inputField).lineHeight, 10);
    console.log(lineHeight)
    const maxHeight = lineHeight * this.MAX_LINES;

    inputField.style.height = 'auto';
    if (inputField.scrollHeight <= maxHeight) {
      inputField.style.height = inputField.scrollHeight + 'px';
    } else {
      inputField.style.height = maxHeight + 'px';
    }
  }
}
