import { Component, input, OnInit, inject, signal } from '@angular/core';
import { BoardService, BoardReadDto } from '../../swagger';
import { RetroBoardTableComponent } from "../../components/retro-board-table/retro-board-table.component";

@Component({
  selector: 'app-retro-board',
  templateUrl: './retro-board.component.html',
  styleUrl: './retro-board.component.css',
  imports: [RetroBoardTableComponent],
})
export class RetroBoardComponent implements OnInit {
  id = input<string>();
  boardService = inject(BoardService);

  board = signal<BoardReadDto | null>(null);
  retroName = signal<string>('');

  ngOnInit(): void {
    const boardId = this.id();

    if (!boardId) {
      console.warn('No board ID provided!');
      return;
    }

    this.boardService.apiBoardIdGet(boardId).subscribe({
      next: (data) => {
        this.board.set(data);
        this.retroName.set(data.name ?? 'Unnamed Board');
        console.log(data);
      },
      error: (err) => {
        console.error('Error loading board:', err);
      },
    });
  }

  getFirstLetterCapital(text: string): string {
    return text ? text.charAt(0).toUpperCase() : '';
  }
}
