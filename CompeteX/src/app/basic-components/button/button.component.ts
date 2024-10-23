import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label: string = '';     // Button title
  @Input() icon: string = '';      // Material icon name (e.g., 'check')
  @Input() disabled: boolean = false;  // Button disabled state

  @Output() buttonClick = new EventEmitter<void>();  // Output event for click

  onClick() {
    this.buttonClick.emit();  // Emit the click event when button is clicked
  }
}