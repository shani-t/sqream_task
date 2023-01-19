import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sq-zero-state',
  templateUrl: './zero-state.component.html',
  styleUrls: ['./zero-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZeroStateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
