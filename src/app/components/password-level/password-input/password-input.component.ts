import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import Swal from "sweetalert2";

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
  FIRE_EMOJI = '🔥'
  FIRE_SPREAD_INTERVAL_IN_MS = 1000

  @Input() ruleId?: number
  @Input() rule?: string
  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>()
  public passwordForm: FormGroup
  @Input() buttonText!: string

  constructor(formBuilder: FormBuilder) {
    this.passwordForm = formBuilder.group({
      password: ['', Validators.required]
    })
  }

  getPassword() {
    return this.passwordForm.get('password')?.value as string
  }

  private setPassword(newPassword: string) {
    for (const char of newPassword) {

    }
    this.passwordForm.get('password')?.setValue(newPassword)
  }

  checkAnswer() {
    this.onSubmit.emit(this.getPassword())
  }

  burnPasswordAndIndicate() {
    this.burnPassword()

    Swal.fire({
      title: 'Who started the fire!?\n🔥🔥🔥🔥🔥🔥',
      color: "darkred",
      background: "black",
      confirmButtonText: "We didn't start the fire!",
      icon: 'warning',
      iconHtml: '<img src="/assets/elmo-burning.gif">',
      customClass: {
        popup: 'burning-popup',
        title: 'burning-title',
        confirmButton: 'burning-confirm-button',
      }
    });
  }

  private burnPassword() {
    this.initiatePasswordFire()

    let fireSpreadInterval = setInterval(() => {
      if (this.isOnFire(this.getPassword())) {
        this.spreadFireInPassword();
      } else {
        clearInterval(fireSpreadInterval);
      }
    }, this.FIRE_SPREAD_INTERVAL_IN_MS)
  }

  private initiatePasswordFire() {
    let firePassword = this.getPassword()

    let fireEndIndex = Math.round((Math.random() * firePassword.length) + 1)
    firePassword = firePassword.substring(0, fireEndIndex) + this.FIRE_EMOJI + firePassword.substring(fireEndIndex + 1);
    this.setPassword(firePassword);
  }

  private spreadFireInPassword() {
    let firePassword = this.getPassword();

    firePassword = this.spreadFireIfLit(firePassword);
    this.setPassword(firePassword);
  }

  private spreadFireIfLit(burningText: string): string {
    if (this.isOnFire(burningText)) {
      let firstFireIndex: number = burningText.indexOf(this.FIRE_EMOJI);
      let lastFireIndex: number = burningText.lastIndexOf(this.FIRE_EMOJI);

      return burningText.substring(0, firstFireIndex - 1)
        + this.FIRE_EMOJI
        + burningText.substring(firstFireIndex, lastFireIndex)
        + this.FIRE_EMOJI
        + burningText.substring(lastFireIndex + 3); // +3 because 🔥 is a unicode character. Not sure why its 3 and not 4, as unicode characters take 4 bytes, but it took me 2.5 hours to get it working and it's currently 23:41 so you're not getting an explanation today.
    }
    return burningText;
  }

  private isOnFire(text: string): boolean {
    return text.includes(this.FIRE_EMOJI);
  }
}
