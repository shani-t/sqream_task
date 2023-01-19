import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {} from 'jasmine';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule, Store } from '@ngxs/store';
import { By } from '@angular/platform-browser';
import { CharactersListComponent } from './characters-list.component';
import { CharactersState } from '../store/characters.state';
import { ChangePage, ChangePageSize, FetchCharacters } from '../store/characters.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharactersModule } from '../characters.module';
import { SharedModule } from '../../../shared/shared.module';
import { PaginationModule } from '../../../components/pagination/pagination.module';
import { ZeroStateModule } from '../../../components/zero-state/zero-state.module';

export const SOME_DESIRED_STATE = {
    characters: [{id:1, title:'Panda'}],
    isLoading: false,
    filters: {film: {id: 1, title: ''}},
    total: 0,
    pageIndex: 0,
    pageSize: 10,
  };
describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersListComponent,
      ],
      imports: [ RouterTestingModule,
        CharactersModule,
        MatSnackBarModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        PaginationModule,
        ZeroStateModule,
        NgxsModule.forRoot([CharactersState])],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
    store.reset({
        ...store.snapshot(),
        Characters: SOME_DESIRED_STATE
      });
      
  });

  it('should create CharactersListComponent', () => {
    expect(component).toBeTruthy();
  });


  it('should check if compnent "sq-pagination" and "sq-zero-state" exists', () => {
    const paginationComp = fixture.debugElement.query(By.css('sq-pagination'));
    expect(paginationComp).toBeTruthy();
    expect(paginationComp.nativeElement).toBeTruthy();
    const zeroStateComp = fixture.debugElement.query(By.css('sq-zero-state'));
    expect(zeroStateComp).toBeTruthy();
    expect(zeroStateComp.nativeElement).toBeTruthy();
  });

  it('should dispactch Characters', () => {
    store.dispatch(new FetchCharacters());

    const data = store.selectSnapshot(state => state.Characters.characters);
    expect(data.length).toBe(1);
  });

  it('should dispactch ChangePage', async () => {
    store.dispatch(new ChangePage(3));
    const data = store.selectSnapshot(state => state.Characters.pageIndex);
    expect(data).toBe(2);
  });

  it('should dispactch ChangePageSize', async () => {
    store.dispatch(new ChangePageSize(3));
    const pageIndex = store.selectSnapshot(state => state.Characters.pageIndex);
    const pageSize = store.selectSnapshot(state => state.Characters.pageSize);
    expect(pageSize).toBe(3);
    expect(pageIndex).toBe(0);
  });

});