import { Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-seven-segment-display',
  templateUrl: './seven-segment-display.component.html',
  styleUrls: ['./seven-segment-display.component.scss']
})
export class SevenSegmentDisplayComponent implements OnInit, OnChanges {

  @Input() number: number;
  @ViewChildren('segment') segments: QueryList<ElementRef<SVGPathElement>>;

  public matrix = [
    [true, true, true, true, true, true, false],
    [false, true, true, false, false, false, false],
    [true, true, false, true, true, false, true],
    [true, true, true, true, false, false, true],
    [false, true, true, false, false, true, true],
    [true, false, true, true, false, true, true],
    [true, false, true, true, true, true, true],
    [true, true, true, false, false, false, false],
    [true, true, true, true, true, true, true],
    [true, true, true, true, false, true, true],
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.number.currentValue > 9) {
      this.number = 9;
    }
  }

}
