import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-start-captchas-dialog',
  standalone: true,
  imports: [],
  templateUrl: './start-captchas-dialog.component.html',
  styleUrl: './start-captchas-dialog.component.scss'
})
export class StartCaptchasDialogComponent {
  @Input() isOpen: boolean = false
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
}
