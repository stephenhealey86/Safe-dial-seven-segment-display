import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  numbers: [number, number] = [0, 0];

  public setNumber(num: number): void {
    this.numbers[0] = Math.floor(num / 10);
    this.numbers[1] = num % 10;
  }
}
