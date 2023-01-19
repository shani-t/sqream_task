import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {} from 'jasmine';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule, Store } from '@ngxs/store';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharactersResolverService } from './characters-resolver.service';
import { CharactersState } from './store/characters.state';
import { catchError, map, of } from 'rxjs';

describe('CharactersResolverService', () => {
  let service: CharactersResolverService;
  let originalTimeout;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ RouterTestingModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        HttpClientModule,
        NgxsModule.forRoot([CharactersState])],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(CharactersResolverService);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should be created CharactersResolverService', () => {
    expect(service).toBeTruthy();
  });


  it('should getFilms func - found data(valid search)',  (done) => {
    service.getFilms('A New Hope').subscribe({
      next(res){
        expect(res.results.length).toEqual(6);
        done();
      },
      error(msg) {
        console.log('Error:', msg);
        done();
      }
    });
  });

   it('should getFilms func - not found data(invalid search)',  (done) => {
      service.getFilms('sdfdskfsdfs').subscribe({
          next(res){
            expect(res.count).toEqual(0);
            done();
          },
          error(msg) {
            console.log('Error: ', msg);
            done();
          }
        });
      });
      

    it('should getCharacters func - found data(valid search)',  (done) => {
      service.getCharacters({limit: 10, offset:0, filmId: 4}).subscribe({
            next(data){
              expect(data.items).not.toEqual(null);
              expect(data.totalCount).toEqual(34);
              done();
            },
            error(msg) {
              console.log('Error: ', msg);
              done();
            }
          })
        });

    it('should getCharacters func - not found data(invalid search)', (done) => {
      service.getCharacters({limit: 10, offset:0, filmId: 12121}).subscribe({
        next(data){
        },
        error(msg) {
          expect(msg).not.toBeNull();
          done();
        }
      })
    });
      
});
