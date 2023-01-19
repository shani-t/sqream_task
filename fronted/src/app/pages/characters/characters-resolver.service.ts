import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { concat,zip, forkJoin, map, Observable, switchMap, of, mergeMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CharactersResolverService {

  constructor(
    private store: Store,
    private http: HttpClient,
  ) {}

  getCharacters_test(searchDetails: {limit: number, offset: number, searchText: string}): Observable<{items: any[], totalCount: number}>{
    // let paramsT = new HttpParams().set("limit",searchDetails.limit).set("offset", searchDetails.offset).set("search", searchDetails.searchText); //Create new HttpParams
    let urlFilms = 'https://swapi.dev/api/films/';
    if(searchDetails.searchText){
      urlFilms = urlFilms.concat(`?title=${searchDetails.searchText}`)
    }

    const characters = [];
    // return this.http.get<any>(urlFilms).pipe(
    //   switchMap(async films => {
    //     let requests = [];
    //     for (const film of films.results) {
    //       film.characters.forEach( ch_url=>{
    //         requests.push(this.http.get(ch_url));

    //       //   this.http.get(ch_url).pipe(map(res => res)).subscribe(data => {
    //       //     return data;
    //       // });
          
    //         // .subscribe(ch_data => {
    //         //   return { chName: ch_data.name, filmName: film.title };
    //         // });
    //       });
    //     }
    //     // return requests;
    //     // const concatAllData = concat(...requests);
    //     // return concatAllData;
    //     // concatAllData.pipe(switchMap(async (val) => val)).subscribe(data => console.log(data));
        
    //     return forkJoin(requests);
      
    //     // return characters;
    //     // characters.push(character);
    //     // const res = await films.results.forEach(async film => { 
    //     //    await film.characters.forEach( async ch_url=>{
    //     //     // this.http.get<any>(ch_url).pipe(map(ch_data => {
    //     //     //   characters.push({ chName: ch_data.name, filmName: film.title });
    //     //     // }));
    //     //     // console.log(rest);
    //     //     return this.getCharacter(ch_url).subscribe(ch_data => {
    //     //       return { chName: ch_data.name, filmName: film.title };
    //     //     });
    //     //   });
    //     //   characters.push(chh);
    //     // });
    //     // return characters;
    //   }),
    //   map(res=>{
    //     // const concatAllData = concat(...requests);
    //     // concatAllData.pipe(switchMap(async (val) => val)).subscribe(data => console.log(data));
    //     let items = [];
    //     res.subscribe(results=>{
    //       results.forEach(ch=>{
    //         items.push(ch);
    //       })
    //     })
    //     // return res;
    //     return {items, totalCount: items.length};
    //   })
    // );
    return this.http.get<any>(urlFilms).pipe(
    switchMap(films => {
      let requests = [];
      let allCharacters: string[] = films.results.map(x=>x.characters);
      allCharacters = [].concat.apply([], allCharacters);
      const pagainatedCharcters = allCharacters.slice(searchDetails.offset, searchDetails.limit);
      pagainatedCharcters.forEach(ch_url => {
            requests.push(this.http.get(ch_url));
      });
      // for (const film of films.results) {
      //   film.characters.forEach(ch_url => {
      //     requests.push(this.http.get(ch_url));
      //   });
      //   }      
      return forkJoin(requests);
    }),
    mergeMap(res => {
      let items = [];
      res.forEach(ch => {
        items.push({name: ch.name});
      });
      return of({items, totalCount: items.length});
    })
  );
      
    // (film=>{
    //   film.characters(async ch_url=>{
    //     this.http.get<any>(ch_url).subscribe(ch_data=>{
    //       characters.push({chName: ch_data.name, filmName: film.name});
    //     });
    //   });
    // });
    // return {items: characters, totalCount: characters.length};
  }

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
