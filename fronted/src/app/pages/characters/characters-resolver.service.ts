import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap, of, mergeMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CharactersResolverService {

  constructor(
    private http: HttpClient,
  ) {}

  getFilms(searchText: string): Observable<any>{
    let urlFilms = 'https://swapi.dev/api/films';
    if(searchText){
      urlFilms = urlFilms.concat(`?title=${searchText}`)
    }
    return this.http.get<any>(urlFilms);
  }

  getCharacter(ch_url){
      return this.http.get<any>(ch_url).pipe(map(res => {
          return res.name;
        }, err => {
            console.log(err);
        }));
  }

getCharacters(searchDetails: {limit: number, offset: number, filmId: number}): Observable<{items: any[], totalCount: number}>{
  let urlFilms = `https://swapi.dev/api/films/${searchDetails.filmId}?expand=characters`;
  let total = 0;
  return this.http.get<any>(urlFilms).pipe(
    switchMap(film => {
      let requests = [];
      const pagainatedCharcters = film.characters.slice(searchDetails.offset, searchDetails.limit + searchDetails.offset);
      pagainatedCharcters.forEach(ch_url => {
           requests.push(this.http.get(ch_url));
      });
      total = film.characters?.length;
      return forkJoin(requests);
    }),
    mergeMap((res) => {
      let items = [];
      res.forEach(ch => {
      items.push({name:ch.name});
      });
      return of({items, totalCount: total});
    }),
  );
   
  }

}
