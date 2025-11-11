import { Component, HostListener, ViewChild } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, SidebarComponent]
})
export class AppComponent { 
  @ViewChild('sidebar') childComponent!: SidebarComponent;


  @HostListener('window:keydown', ['$event'])
  handleKeyboardShortcut(event: KeyboardEvent) {
    if (event.shiftKey && event.key.toLowerCase() === 's') {
      event.preventDefault(); 
      this.onShiftSaveShortcut();
    }
  }

  onShiftSaveShortcut() {
    console.log('Shift+S detected! Running action...');
    this.childComponent.toggleSidebar();
  }
}
