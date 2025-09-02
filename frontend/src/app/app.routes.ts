import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BoardlayoutComponent } from './pages/boardlayout/boardlayout.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'boardlayout', component: BoardlayoutComponent },
];
