import { Component, input } from '@angular/core';
import { RetroBoardTableComponent } from "../../components/retro-board-table/retro-board-table.component";

@Component({
  selector: 'app-retro-board',
  imports: [RetroBoardTableComponent],
  templateUrl: './retro-board.component.html',
  styleUrl: './retro-board.component.css'
})
export class RetroBoardComponent {
  id = input<string>();

  retroName = 'Sprint 23 / Team Alpha';

  getFirstLetterCapital(text: string): string {
    return text ? text.charAt(0).toUpperCase() : '';
  }
}
