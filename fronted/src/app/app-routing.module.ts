import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'characters', 
  loadChildren: () => import('./pages/characters/characters.module').then(m => m.CharactersModule),
  },
  // {
  //   path: '**',
  //   redirectTo: '/page-not-found',
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes/*, { preloadingStrategy: PreloadAllModules }*/)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
