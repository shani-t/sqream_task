import { Component, OnInit } from '@angular/core';
import { InitState, Store } from '@ngxs/store';

@Component({
  selector: 'app-characters',
  styleUrls: ['./characters.component.scss'],
  templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit {

  constructor(
    private store: Store,
  ) { }

  ngOnInit() {
    // this.store.dispatch(new InitState());
  }

}
