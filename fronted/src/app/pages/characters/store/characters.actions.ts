import { Character } from "../models/character.model";

export const SET_CHARCTERS = '[Characters] Set Characters';
export const FETCH_DELIVERIES = '[Characters] Fetch Characters';
export const FETCH_CHARCTERS ='[Characters] Fetch Charcters';

export class InitState {
  static readonly type = '[Characters] Init Characters';
  constructor() { }
}

export class SetLoading {
  static readonly type = '[Characters] Set Loading';
  constructor(public bool: boolean) { }
}

export class ChangePage {
  static readonly type = '[Characters] Change Page';
  constructor(public pageNumber: number) { }
}

export class ChangePageSize {
  static readonly type = '[Characters] Change Page Size';
  constructor(public pageSize: number) { }
}

export class SetFilm {
  static readonly type = '[Characters] Set Film';
  constructor(public id: number, public title: string) { }
}

export class SetCharacters {
  readonly type = SET_CHARCTERS;

  constructor(public character: Character[]) {}
}


export class FetchCharacters {
  static readonly type = FETCH_CHARCTERS;
  constructor(){}
}
