import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-safe-dial',
  templateUrl: './safe-dial.component.html',
  styleUrls: ['./safe-dial.component.scss']
})
export class SafeDialComponent implements OnInit, AfterViewInit {

  @ViewChild('dial') dial: ElementRef<SVGGElement>;
  @ViewChild('knob') knob: ElementRef<SVGGElement>;
  @Output() marker = new EventEmitter<number>();

  public referenceAngle: number;
  public dialAngle = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.configure();
  }

  public mousemove(event: MouseEvent): void {
    if (this.referenceAngle !== undefined) {
      const deg = this.getAngle(event);
      this.dialAngle = deg - this.referenceAngle;
      this.dialAngle = this.dialAngle > 0 ? this.dialAngle > 360 ? this.dialAngle - 360 : this.dialAngle : 360 + this.dialAngle;
      this.dialAngle = Math.floor(this.dialAngle / 3.6) * 3.6;
      let marker = Math.round(this.mapRange(0, 360, 100, 0, this.dialAngle));
      marker = marker === 100 ? 0 : marker;
      this.dial.nativeElement.style.transform = `rotate(${this.dialAngle}deg)`;
      this.marker.emit(marker);
      console.clear();
      console.log(marker);
    }
  }

  public mousedown(event: MouseEvent): void {
    this.referenceAngle = this.getAngle(event) - this.dialAngle;
  }

  private getAngle(event: MouseEvent): number {
    const rect = this.dial.nativeElement.getBoundingClientRect();
    let a1 = rect.left; let a2 = a1 + rect.width; let b1 = 1; let b2 = -1;
    const x = this.mapRange(a1, a2, b1, b2, event.x);
    a1 = rect.top; b1 = 1; b2 = -1;
    a2 = a1 + rect.height;
    const y = this.mapRange(a1, a2, b1, b2, event.y);
    let radians = Math.atan2(y, x);
    if (radians < 0) {
      radians += 2 * Math.PI;
    }
    let deg = radians * (180 / Math.PI);
    deg = deg - 90; deg = deg < 0 ? 360 + deg : deg;
    return Math.round(deg * 10) / 10;
  }

  private mapRange(a1: number, a2: number, b1: number, b2: number, value: number): number {
    return b1 + ((value - a1) * (b2 - b1)) / (a2 - a1);
  }

  private configure(): void {
    for (let i = 0; i < 100; i++) {
      this.configureDial(i);
      this.configureKnob(i);
    }
  }

  private configureDial(i: number): void {
    let tickLine;
    if (i % 5 === 0) {
      tickLine = this.createSVGLine(50, 16.5, 50, 11);
      tickLine.setAttribute('stroke', '#EEE');
      tickLine.setAttribute('stroke-width', '1');
      if (i % 10 === 0) {
        const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txt.innerHTML = i.toString();
        txt.setAttribute('x', '50');
        txt.setAttribute('y', '21');
        txt.setAttribute('transform-origin', '50px 50px');
        txt.style.transform = `rotate(${i * 3.6}deg)`;
        txt.classList.add('dial-numbers');
        this.dial.nativeElement.appendChild(txt);
      }
    } else {
      tickLine = this.createSVGLine(50, 15, 50, 11);
      tickLine.setAttribute('stroke', '#EEE');
      tickLine.setAttribute('stroke-width', '0.5');
    }
    tickLine.style.transform = `rotate(${i * 3.6}deg)`;
    this.dial.nativeElement.appendChild(tickLine);
  }

  private configureKnob(i: number): void {
    let tickLine;
    if (i % 2 === 0) {
      tickLine = this.createSVGLine(50, 30, 50, 31.5);
      tickLine.setAttribute('stroke', '#202020');
      tickLine.setAttribute('stroke-width', '1');
      tickLine.style.transform = `rotate(${i * 3.6}deg)`;
      this.knob.nativeElement.appendChild(tickLine);
    }
  }

  private createSVGLine(x1: number, y1: number, x2: number, y2: number): SVGLineElement {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.positionSVGLine(line, x1, y1, x2, y2);
    return line;
  }

  private positionSVGLine(line: SVGLineElement, x1: number, y1: number, x2: number, y2: number): void {
    line.setAttribute('x1', x1.toString());
    line.setAttribute('x2', x2.toString());
    line.setAttribute('y1', y1.toString());
    line.setAttribute('y2', y2.toString());
    line.setAttribute('transform-origin', '50px 50px');
  }

}
