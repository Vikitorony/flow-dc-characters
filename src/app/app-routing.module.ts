import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { AddCharacterComponent } from './components/add-character.component';
import { CharacterDetailsComponent } from './components/character-details.component';
import { CharactersComponent } from './components/characters.component';
import { LoginComponent } from './components/login.component';
import { UpdateCharacterComponent } from './components/update-character.component';
import { Role } from './model/user.model';
import { RoleGuard } from './guards/role.guard';
import { CharacterResolver } from './resolvers/character.resolver';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full',
  },
  {
    path: 'characters/new',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN] },
    component: AddCharacterComponent,
  },
  {
    path: 'characters',
    component: CharactersComponent,
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    children: [
      {
        path: ':id',
        component: CharacterDetailsComponent,
        resolve: { character: CharacterResolver },
        data: { roles: [Role.EDITOR, Role.ADMIN] },
      },
    ],
  },
  {
    path: 'characters/edit/:id',
    component: UpdateCharacterComponent,
    canActivate: [AuthGuard, RoleGuard],
    canDeactivate: [CanDeactivateGuard],
    resolve: { character: CharacterResolver },
    data: { roles: [Role.EDITOR, Role.ADMIN] },
  },
  {
    path: '**',
    redirectTo: '/characters',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
