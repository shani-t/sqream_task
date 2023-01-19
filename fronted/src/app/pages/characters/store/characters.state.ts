import { Action, State, StateContext, Selector, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { CharactersResolverService } from '../characters-resolver.service';
import { Character } from '../models/character.model';
import { ChangePage, ChangePageSize, FetchCharacters, InitState, SetCharacters, SetFilm, SetLoading } from './characters.actions';


export interface Filters {
  film: {id: number, title: string};
}
export interface CharactersModel {
   characters: Character[];
   isLoading: boolean;
   filters: Filters
   total: number;
   pageIndex: number;
   pageSize: number;
 
  }
  
  const initialState: CharactersModel = {
    characters: [],
    isLoading: false,
    filters: {film: {id: null, title: ''}},
    total: 0,
    pageIndex: 0,
    pageSize: 10,
  };
  
  @State<CharactersModel>({
    name: 'Characters',
    defaults: initialState,
  })
  @Injectable()
  export class CharactersState {
    constructor(
      private snackBar: MatSnackBar,
      private charactersService: CharactersResolverService,
      private store: Store,
      private router: Router
    ) { }

    @Selector([CharactersState])
    static loading({ isLoading }: CharactersModel): boolean {
      return isLoading;
    }
  
    @Selector([CharactersState])
    static characters({ characters }: CharactersModel): Character[] {
      return characters;
    }

    @Selector([CharactersState])
    static pageIndex({ pageIndex }: CharactersModel) {
      return pageIndex;
    }
  
    @Selector([CharactersState])
    static pageSize({ pageSize }: CharactersModel) {
      return pageSize;
    }

    @Selector([CharactersState])
    static totalCount({ total }: CharactersModel) {
      return total;
    }
  
    @Selector([CharactersState])
    static currentRows({ total, pageIndex, pageSize }: CharactersModel) {
      const firstRow = total === 0 ? 0 : pageIndex * pageSize + 1;
      const lastRowOfCurrentpage = (pageIndex + 1) * pageSize;
      const lastRow = lastRowOfCurrentpage > total ? total : lastRowOfCurrentpage;
      return `${firstRow}-${lastRow} of ${total}`;
    }


  @Selector([CharactersState])
  static currentPage({ pageIndex }: CharactersModel) {
    return pageIndex + 1;
  }

  @Selector([CharactersState])
  static lastPage({ total, pageSize }: CharactersModel) {
    const lastPage = Math.ceil(total / pageSize);
    return lastPage === 0 ? 1 : lastPage;
  }


  @Selector([CharactersState])
  static selectedFilm({ filters }: CharactersModel) {
    return filters.film;
  }

  /** Actions **/
  @Action(InitState)
  InitState(ctx: StateContext<CharactersModel>) {
    ctx.setState(initialState);
  }
  
  @Action(SetFilm)
  SetFilm(ctx: StateContext<CharactersModel>, { id, title }) {
    const { filters } = ctx.getState();
    ctx.patchState({
      filters: { ...filters, film: {id, title} }
    });
    ctx.dispatch(new ChangePage(1));
    ctx.dispatch(new FetchCharacters());
  }

  

    @Action(ChangePage)
    ChangePage(ctx: StateContext<CharactersModel>, { pageNumber }) {
      ctx.setState({ ...ctx.getState(), pageIndex: pageNumber - 1 });
      ctx.dispatch(new FetchCharacters());
    }
  
    @Action(ChangePageSize)
    ChangePageSize(ctx: StateContext<CharactersModel>, { pageSize }: ChangePageSize) {
      ctx.setState({ ...ctx.getState(), pageSize, pageIndex: 0 });
      ctx.dispatch(new FetchCharacters());
    }
  

    @Action(SetLoading)
    SetLoading(ctx: StateContext<CharactersModel>, { bool }: SetLoading): any {
      ctx.setState({ ...ctx.getState(), isLoading: bool });
    }
  

    @Action(FetchCharacters)
    FetchCharcters(ctx: StateContext<CharactersModel>): any {
      const { filters, pageSize, pageIndex } = ctx.getState();
      const body: any = {
          limit: pageSize,
          offset: pageIndex * pageSize,
          filmId: filters.film.id
      };
  
      ctx.dispatch(new SetLoading(true));
      return this.charactersService.getCharacters(body).pipe(
        map((data) => {
          ctx.setState({
            ...ctx.getState(),
            total: data.totalCount,
            characters: data.items
          });
          
        }),
        catchError(err => {
          console.log(err);
          this.snackBar.open('Internal Server Error', 'OK', {
            duration: 5000,
          });
          return of(null);
        }),
        finalize(() => {
          ctx.dispatch(new SetLoading(false));
        })
      );
    }


    }