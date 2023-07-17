import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-go-to-maze-dialog',
  templateUrl: './go-to-maze-dialog.component.html',
  styleUrls: ['./go-to-maze-dialog.component.scss']
})
export class GoToMazeDialogComponent {
  @Input() isOpen: boolean = false
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
}
