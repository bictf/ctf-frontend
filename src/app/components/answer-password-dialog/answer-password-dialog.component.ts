import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-answer-password-dialog',
  templateUrl: './answer-password-dialog.component.html',
  styleUrls: ['./answer-password-dialog.component.scss'],
})
export class AnswerPasswordDialogComponent {
  password = '';

  @Input() isOpen: boolean = false
  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
}
