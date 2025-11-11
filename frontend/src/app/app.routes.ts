import { Routes } from '@angular/router';
import { RetroBoardComponent } from './pages/retro-board/retro-board.component';
import { CreateRetroBoardComponent } from './pages/create-retro-board/create-retro-board.component';

export const routes: Routes = [
    { path: 'retroboard/:id', component: RetroBoardComponent },
    { path: 'createboard', component: CreateRetroBoardComponent },
];
