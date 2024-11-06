import { Component } from '@angular/core';

@Component({
  selector: 'app-comp-start',
  templateUrl: './comp-start.component.html',
  styleUrl: './comp-start.component.css'
})
export class CompStartComponent {
  testButtonClick() {
    console.log('Button clicked!');
    alert('Button click event triggered!');  // You can also trigger any other logic here
  }
}
