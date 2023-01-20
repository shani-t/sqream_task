import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import {
  InitState,
  SetFilm,
  SetLoading,
} from '../store/characters.actions';

import { CharactersResolverService } from '../characters-resolver.service';
import { catchError, debounceTime, map, Observable, of, Subject, switchMap } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CharactersState } from '../store/characters.state';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Character } from '../models/character.model';
import { Film } from '../models/film.model';

@Component({
  selector: 'app-characters-filters',
  templateUrl: './characters-filters.component.html',
  styleUrls: ['./characters-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersFiltersComponent implements OnInit {
  constructor(
    private charactersService: CharactersResolverService,
    private store: Store,
    private snackBar: MatSnackBar,

  ) {
  }

  filteredOptions: Observable<any>;
  changedFilm$ = new Subject<string>();
  @Select(CharactersState.selectedFilm) selectedFilm: Observable<Film>;
  
  ngOnInit(): void {
    this.filteredOptions = this.changedFilm$.pipe(
      debounceTime(500),
      switchMap((title) => {
        return this._filter(title);
      })
    );
  }

  _filter(name) {
    this.store.dispatch(new SetLoading(true));
    return this.charactersService.getFilms(name).pipe(
      map((data: any) => {
        this.store.dispatch(new SetLoading(false));
        return data.results.map(e => ({ title: e.title, id: e.episode_id }));
      }), 
      catchError(err => {
        this.snackBar.open('Internal Server Error', 'OK', {
          duration: 5000,
        });
        return of(null);
      }),
    );
  }

  setSearch(value: any){
    let title = value;
    if(value && typeof value == 'object'){
      title = value?.title;
    }
    if (title && title !== ""){
      this.changedFilm$.next(title);
    }
  }
  

  filmSelected(film) {
    if (film?.id){
      this.store.dispatch(new SetFilm(film.id, film.title));
    } 
  }
}
