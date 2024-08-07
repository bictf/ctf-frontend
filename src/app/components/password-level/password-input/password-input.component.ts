import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatOption, MatSelect } from "@angular/material/select";

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
  @Input() ruleId?: number
  @Input() rule?: string
  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>()
  public passwordForm: FormGroup;
  @Input() buttonText!: string;
  private fireTask;

  constructor(formBuilder: FormBuilder) {
    this.passwordForm = formBuilder.group({
      password: ['', Validators.required]
    })
    this.fireTask = setInterval(() => {
      let password = this.getPassword();
      let newPassword = [];
      let index = 0;
      while (index < password.length) {
        if (password[index] === "🔥") {
            // Replace a single 🔥 with three 🔥
            newPassword.pop();  // Remove the last character if it was added
            newPassword.push("🔥");
            newPassword.push("🔥");
            newPassword.push("🔥");
            index += 2;  // Move past the 🔥
        } else {
            newPassword.push(password[index]);
            index += 1;  // Move to the next character
        }
    }
    this.setPassword(newPassword.join(""))
    }, 1000)
  }

  getPassword() {
    return this.passwordForm.get('password')?.value as string
  }

  setPassword(newPassword: string) {
    this.passwordForm.get('password')?.setValue(newPassword)
  }

  checkAnswer() {
    this.onSubmit.emit(this.getPassword())
  }

  startFire() {
    let firePassword = this.getPassword()
    let randomIndex = Math.round((Math.random() * firePassword.length) + 1)
    firePassword = firePassword.substring(0, randomIndex) + "🔥" + firePassword.substring(0, randomIndex)
    this.setPassword(firePassword)
  }
}