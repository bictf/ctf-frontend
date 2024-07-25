import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {DownloadFileButtonComponent} from "../download-file-button/download-file-button.component";

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
    DownloadFileButtonComponent
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent {
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
}
