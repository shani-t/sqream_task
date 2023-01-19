import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CharactersState } from '../store/characters.state';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { ChangePage, ChangePageSize, InitState } from '../store/characters.actions';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CharactersListComponent implements OnInit {
  @Select(CharactersState.characters) characters$: Observable<Character[]>;
  @Select(CharactersState.currentPage) currentPage$: Observable<number>;
  @Select(CharactersState.currentRows) currentRows$: Observable<string>;
  @Select(CharactersState.pageSize) pageSize$: Observable<number>;
  @Select(CharactersState.lastPage) lastPage$: Observable<number>;
  @Select(CharactersState.loading) loading$!: Observable<boolean>;

  subscription: Subscription;
  displayedColumns: string[] = [
    'name',
  ];

  constructor() {}

  ngOnInit() {
  }

  @Dispatch() currentPageChange = (value) => new ChangePage(value);
  @Dispatch() changePageSize = (value) => new ChangePageSize(value);
}

