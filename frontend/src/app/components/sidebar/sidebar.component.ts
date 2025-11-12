import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { rxResource } from '@angular/core/rxjs-interop';
import { BoardReadDto, BoardService } from '../../swagger';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  activeRoute: string = '';

  private boardService = inject(BoardService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  isSidebarCollapsed = false;
  showSidebarText = true;
  dropdownOpen = false;
  selectedItem: string | null = '';
  isSettingsClicked = false;
  dropdownOpenLast = false;

  sidebarItems = [
    { name: '', label: 'Home', icon: 'assets/icons/überblick_normal.png' },
    { name: 'boardlayout', label: 'Board Layouts', icon: 'assets/icons/board_layout_normal.png' },
    { name: 'controlling', label: 'Controlling', icon: 'assets/icons/controlling_normal.png' },
    { name: 'changelog', label: 'Change Log', icon: 'assets/icons/log_normal.png' },
  ];

  /** 🧠 Live resource: fetches boards automatically via GET /api/Board */
  boardItemsRef = rxResource({
    loader: () => this.boardService.apiBoardGet()
  });

  /** 🧮 Computed signal: reactive list of boards */
  boardItems = computed(() => {
    const boards = this.boardItemsRef.value() ?? [];
    return boards.map((b: BoardReadDto) => ({
      id: b.id,
      name: b.name ?? 'Untitled Board',
      label: b.name ?? 'Untitled Board',
      icon: 'assets/icons/board_item_icon.png',
      hover: false
    }));
  });

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;

    if (this.isSidebarCollapsed) {
      document.body.classList.add('sidebar-collapsed');
      document.body.classList.remove('sidebar-expanded');
      this.showSidebarText = false;
      this.dropdownOpen = false;
    } else {
      document.body.classList.remove('sidebar-collapsed');
      document.body.classList.add('sidebar-expanded');

      if (this.dropdownOpenLast) {
        this.toggleDropdownFromParent();
      }

      setTimeout(() => (this.showSidebarText = true), 100);
    }
  }

  toggleDropdownFromParent() {
    if (!this.isSidebarCollapsed) {
      this.dropdownOpen = !this.dropdownOpen;
    } else {
      this.toggleSidebar();
      this.dropdownOpen = !this.dropdownOpen;
    }
    this.dropdownOpenLast = this.dropdownOpen;
  }

  onSelectItem(item: any) {
    if (!item?.name) return;

    if (
      item.name === '' ||
      item.name === 'boardlayout' ||
      item.name === 'controlling' ||
      item.name === 'changelog'
    ) {
      this.selectedItem = item.name;
      this.isSettingsClicked = false;
      this.router.navigate(['/' + item.name]);
    } else {
      this.selectedItem = item.name;
      this.isSettingsClicked = false;
      this.router.navigateByUrl(`retroboard/${item.id ?? item.name}`);
    }
  }

  onAddBoard(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/createboard']);
  }

  settingsClick() {
    this.router.navigate(['/settings']);
    this.selectedItem = null;
    this.isSettingsClicked = true;
  }

  getFirstLetterCapital(text: string): string {
    return text ? text.charAt(0).toUpperCase() : '';
  }

  onSidebarLogoClick() {
    this.router.navigate(['/']);
    this.selectedItem = '';
  }

  ngOnInit() {
    // Automatically refresh board list on navigation
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.boardItemsRef.reload());
  }


  onBoardItemAction(_t38: { id: string|undefined; name: string; label: string; icon: string; hover: boolean; }) {
    
  }

}
