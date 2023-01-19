import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CharactersComponent } from './characters.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PaginationModule } from '../../components/pagination/pagination.module';
import { CharactersFiltersComponent } from './characters-filters/characters-filters.component';
import { AutocompleteDoubleInputModule } from '../../components/autocomplete-double-input/autocomplete-double-input.module';
import { ZeroStateModule } from 'src/app/components/zero-state/zero-state.module';

@NgModule({
  declarations: [
    CharactersComponent,
    CharactersListComponent,
    CharactersFiltersComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CharactersRoutingModule,
    SharedModule,
    PaginationModule,
    AutocompleteDoubleInputModule,
    ZeroStateModule
  ],
  
})
export class CharactersModule {}
