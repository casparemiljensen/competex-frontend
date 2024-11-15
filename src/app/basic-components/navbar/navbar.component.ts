import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isDrawerOpen = false;
  isSmallScreen: boolean = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    // Observe screen size to determine if it's small
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  closeSidenav() {
    // Method to close the sidenav
    if (this.isSmallScreen && this.isDrawerOpen) {
      this.isDrawerOpen = false; // Close the drawer
      this.sidenav.close(); // Close the sidenav
    }
  }
}
