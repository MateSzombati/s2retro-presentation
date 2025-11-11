import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
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

  boardsService = inject(BoardService);

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    this.activeRoute = this.router.url;
  }

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
    { name: 'changelog', label: 'Change Log', icon: 'assets/icons/log_normal.png' }
  ];

  boardItemsRef = rxResource({
    loader: () => this.boardsService.apiBoardGet()
  });

  boardItems1 = computed(() => this.boardItemsRef.value() ?? []);


  boardItems = [
    { name: 'retroQ1', label: 'Retro Q1', icon: 'assets/icons/board_item_icon.png', hover: false },
    { name: 'retroQ2', label: 'Retro Q2', icon: 'assets/icons/board_item_icon.png', hover: false },
    { name: 'retroQ3', label: 'Retro Q3', icon: 'assets/icons/board_item_icon.png', hover: false },
    { name: 'retroQ4', label: 'Retro Q4', icon: 'assets/icons/board_item_icon.png', hover: false },
    { name: 'retroQ5', label: 'Retro Q5', icon: 'assets/icons/board_item_icon.png', hover: false },
    { name: 'retroQ6', label: 'Retro Q6', icon: 'assets/icons/board_item_icon.png', hover: false },
    { name: 'retroQ7', label: 'Retro Q7', icon: 'assets/icons/board_item_icon.png', hover: false },
    { name: 'retroQ8', label: 'Retro Q8', icon: 'assets/icons/board_item_icon.png', hover: false },
    { name: 'retroQ9', label: 'Retro Q9', icon: 'assets/icons/board_item_icon.png', hover: false },
    { name: 'retroQ10', label: 'Retro 10', icon: 'assets/icons/board_item_icon.png', hover: false },
    { name: 'retroQ11', label: 'Retro Q11', icon: 'assets/icons/board_item_icon.png', hover: false },
    { name: 'retroQ12', label: 'Retro Q12', icon: 'assets/icons/board_item_icon.png', hover: false },
  ];

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

      if(this.dropdownOpenLast) {
        this.toggleDropdownFromParent();
      }

      setTimeout(() => {
        this.showSidebarText = true;
      }, 100);
    }
  }

  toggleDropdownFromParent() {
    if (!this.isSidebarCollapsed) {
      this.dropdownOpen = !this.dropdownOpen;
    }
    else {
      this.toggleSidebar();
      this.dropdownOpen = !this.dropdownOpen;
    }
    this.dropdownOpenLast = this.dropdownOpen;
  }

  onSelectItem(item: any) {
  if (item?.name == null) return;
  if(item?.name === '' || item?.name === 'boardlayout' || item?.name === 'controlling' || item?.name === 'changelog') {
    this.selectedItem = item.name;
    this.isSettingsClicked = false;
    this.router.navigate(['/' + item.name]);
  }
  else {
    this.selectedItem = item.name;
    this.isSettingsClicked = false;
    this.router.navigateByUrl(`retroboard/${item.name}`);
  }
  
  console.log(item.name);
}

  onAddBoard(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/createboard']);
  }

  onBoardItemAction(item: any) {
    console.log('Action triggered for:', item);
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
    console.log(this.boardItems1());
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const segments = event.urlAfterRedirects.split('/').filter(Boolean);

      // If route is like /retroboard/retroQ2
      if (segments[0] === 'retroboard' && segments[1]) {
        this.selectedItem = segments[1];   // retroQ2
        return;
      }

      // Otherwise match normal sidebar items
      const matchedItem =
        this.sidebarItems.find(item => item.name === segments[0]) ||
        this.boardItems.find(item => item.name === segments[0]);

      if (matchedItem) {
        this.selectedItem = matchedItem.name;
      } else if (segments[0] !== 'createboard') {
        this.selectedItem = '';
      }
    });
  }
}
