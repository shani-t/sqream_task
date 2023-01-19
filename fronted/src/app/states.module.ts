import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CharactersState } from './pages/characters/store/characters.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forFeature([
      CharactersState,
    ]),
  ]
})
export class StatesModule { }
