import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  activeRoute: string = '';

  isSelected = false;

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    this.activeRoute = this.router.url;
  }

  isSidebarCollapsed = false;
  showSidebarText = true;

 toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;

    // Toggle body class for global CSS styling
    if (this.isSidebarCollapsed) {
      document.body.classList.add('sidebar-collapsed');
      document.body.classList.remove('sidebar-expanded');
      this.showSidebarText = false;

      this.dropdownOpen = false;

    } else {
      document.body.classList.remove('sidebar-collapsed');
      document.body.classList.add('sidebar-expanded');

      // this.dropdownOpen = true;

      setTimeout(() => {
        this.showSidebarText = true;
      }, 100); // match transition duration
    }
  }




  navigateTo(item: any) {
    
  }


  getSanitizedSvg(svgString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }


  sidebarItems = [
    { name: 'home', label: 'Home', icon: 'assets/icons/überblick_normal.png' },
    { name: 'boardlayout', label: 'Board Layout', icon: 'assets/icons/board_layout_normal.png' },
    { name: 'controlling', label: 'Controlling', icon: 'assets/icons/controlling_normal.png' },
    { name: 'retroboard', label: 'Retro Boards', icon: 'assets/icons/boards_normal.png' },
    { name: 'changeLog', label: 'Change Log', icon: 'assets/icons/log_normal.png' }
  ];

  boardItems = [
    { name: 'retroQ1', label: 'Retro Q1', icon: 'assets/icons/board_item_icon.png', hover: false  },
    { name: 'retroQ2', label: 'Retro Q2', icon: 'assets/icons/board_item_icon.png', hover: false  },
    { name: 'retroQ3', label: 'Retro Q2', icon: 'assets/icons/board_item_icon.png', hover: false  },
    { name: 'retroQ4', label: 'Retro Q4', icon: 'assets/icons/board_item_icon.png', hover: false  },
    { name: 'retroQ5', label: 'Retro Q5', icon: 'assets/icons/board_item_icon.png', hover: false  },
    { name: 'retroQ6', label: 'Retro Q6', icon: 'assets/icons/board_item_icon.png', hover: false  },
    { name: 'retroQ7', label: 'Retro Q7', icon: 'assets/icons/board_item_icon.png', hover: false  },
    { name: 'retroQ8', label: 'Retro Q8', icon: 'assets/icons/board_item_icon.png', hover: false  },
    { name: 'retroQ9', label: 'Retro Q9', icon: 'assets/icons/board_item_icon.png', hover: false  },
    { name: 'retroQ10', label: 'Retro 10', icon: 'assets/icons/board_item_icon.png', hover: false  },
    { name: 'retroQ11', label: 'Retro Q11', icon: 'assets/icons/board_item_icon.png', hover: false  },
    { name: 'retroQ12', label: 'Retro Q12', icon: 'assets/icons/board_item_icon.png', hover: false  },
  ];

  selectedItem: string | null = '';
  dropdownOpen = false;
  isSettingsClicked = false;


  onSelectItem(item: any) {
    this.selectedItem = item.name;
    this.isSettingsClicked = false;

    console.log(item);

    
    this.router.navigate(['/' + this.selectedItem]);


  }


  onAddBoard(event: MouseEvent) {
    event.stopPropagation();
    this.selectedItem = 'retroboard';
    this.router.navigate(['/createboard']);
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation(); // Prevent parent click
    this.dropdownOpen = !this.dropdownOpen;

  }

  settingsClick(){
    this.router.navigate(['/settings']);
    this.selectedItem = null;
    this.isSettingsClicked = true;
  }

  getFirstLetterCapital(text: string): string {
    return text ? text.charAt(0).toUpperCase() : '';
  }

  onBoardItemAction(item: any) {
    console.log('Action triggered for:', item);
  }


  onSidebarLogoClick(){
    this.router.navigate(['/']);
    this.selectedItem = '';
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const path = event.urlAfterRedirects.split('/')[1];

        const matchedItem = this.sidebarItems.find(item => item.name === path)
                         || this.boardItems.find(item => item.name === path);

        if (matchedItem) {
          this.selectedItem = matchedItem.name;
        } else if (path !== 'createboard') {
          this.selectedItem = '';
        }
      });
  }


}