import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  @Input() label: string = "";
  @Input() placeHolder: string = this.label;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onChange(event: any){
    this.valueChange.emit(event.target.value)
  }
}
