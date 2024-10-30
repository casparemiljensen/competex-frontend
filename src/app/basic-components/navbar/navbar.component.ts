import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSmallScreen: boolean = false;

  @ViewChild('sidenav') sidenav!: MatSidenav; // Ensure sidenav is available in the template

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    // Observe screen size to determine if it's small
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  closeSidenav() {
    // Method to close the sidenav
    if (this.isSmallScreen) {
      this.sidenav.close();
    }
  }

  toggleSidenav() {
    // Method to toggle the sidenav's visibility
    this.sidenav.toggle();
  }
}
