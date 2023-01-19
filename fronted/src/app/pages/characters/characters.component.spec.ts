import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CharactersComponent } from './characters.component';
import {} from 'jasmine';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { CharactersState } from './store/characters.state';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersFiltersComponent } from './characters-filters/characters-filters.component';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersComponent,
      ],
      imports: [ RouterTestingModule,
        MatSnackBarModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([CharactersState])],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CharactersComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should check if compnent "app-characters-filters" and "app-characters-list" exists', () => {
    const charactersFiltersComp = fixture.debugElement.query(By.css('app-characters-filters'));
    expect(charactersFiltersComp).toBeTruthy();
    expect(charactersFiltersComp.nativeElement).toBeTruthy();
    const charactersListComp = fixture.debugElement.query(By.css('app-characters-list'));
    expect(charactersListComp).toBeTruthy();
    expect(charactersListComp.nativeElement).toBeTruthy();
  });
});