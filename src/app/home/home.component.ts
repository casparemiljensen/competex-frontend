import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = "this is the tile of the home"
  testButtonClick() {
    console.log('Button clicked!');
    alert('Button click event triggered!');  // You can also trigger any other logic here
  }
}
