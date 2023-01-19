import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {} from 'jasmine';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule, Store } from '@ngxs/store';
import { By } from '@angular/platform-browser';
import { CharactersState } from '../store/characters.state';
import { ChangePage, ChangePageSize, FetchCharacters, SetFilm } from '../store/characters.actions';
import { CharactersFiltersComponent } from './characters-filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../shared/shared.module';
import { AutocompleteDoubleInputModule } from '../../../components/autocomplete-double-input/autocomplete-double-input.module';

export const SOME_DESIRED_STATE = {
    characters: [{id:1, name:'Panda'}],
    isLoading: false,
    filters: {film: {id: 1, title: ''}},
    total: 0,
    pageIndex: 0,
    pageSize: 10,
  };
describe('CharactersFiltersComponent', () => {
  let component: CharactersFiltersComponent;
  let fixture: ComponentFixture<CharactersFiltersComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersFiltersComponent
      ],
      imports: [ RouterTestingModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        HttpClientModule,
        SharedModule,
        AutocompleteDoubleInputModule,
        NgxsModule.forRoot([CharactersState])],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
    store.reset({
        ...store.snapshot(),
        Characters: SOME_DESIRED_STATE
      });
  });

  it('should create CharactersFiltersComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should check if compnent "sq-autocomplete-double-input" exists', () => {
    const autocompleteComp = fixture.debugElement.query(By.css('sq-autocomplete-double-input'));
    expect(autocompleteComp).toBeTruthy();
    expect(autocompleteComp.nativeElement).toBeTruthy();
  });

  it('should dispactch Characters', () => {
    store.dispatch(new FetchCharacters());

    const data = store.selectSnapshot(state => state.Characters.characters);
    expect(data.length).toBe(1);
  });

  it('should dispactch SetFilm', async () => {
    store.dispatch(new SetFilm(1, 'A New Hope'));
    const filters = store.selectSnapshot(state => state.Characters.filters);
    expect(filters.film).toEqual({id: 1, title: 'A New Hope'});
  });

  it('Testing _filter function- update charcters list', async()=>{
    component._filter('A New Hope');
    const isLoading = store.selectSnapshot(state => state.Characters.isLoading);
    expect(isLoading).toBe(true);
    component._filter('A New Hope').subscribe(res=>{
        expect(res.legnth).toBeGreaterThan(0);
        const isLoading = store.selectSnapshot(state => state.Characters.isLoading);
        expect(isLoading).toBe(false);
    });

})

it('Testing setSearch function- update charcters list', async()=>{
    component.setSearch('A New Hope');
    const characters = store.selectSnapshot(state => state.Characters.characters);
    expect(characters.length).toBeGreaterThan(0);
})

it('Testing filmSelected function- update film on state', async()=>{
    component.filmSelected({title: 'Return of the Jedi', id: 6});
    const filters = store.selectSnapshot(state => state.Characters.filters);
    expect(filters.film).toEqual({title: 'Return of the Jedi', id: 6});

})

it('Testing onInit', async()=>{
    component.changedFilm$.subscribe(res=>{
        const characters = store.selectSnapshot(state => state.Characters.characters);
        expect(characters.length).toBeGreaterThan(0);
    })
    component.ngOnInit();
    component.setSearch('Return of the Jedi');
    
})


});