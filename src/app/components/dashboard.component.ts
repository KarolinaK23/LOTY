import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { IMenuItemNav } from './utils/nav/menu.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public menu: IMenuItemNav[] = [
        {name: 'Flights', url: ['/dashboard/flights'], icon: 'fas fa-fighter-jet'},
        {name: 'Tourists', url: ['/dashboard/tourists'], icon: 'fas fa-user-friends'},
        {name: 'Add tourist', url: ['/dashboard/tourist/tourist-form'], icon: 'fa fa-user-plus'},
        {name: 'Add flight', url: ['/dashboard/flight/flight-form'], icon: 'fa fa-plane' },
        {name: 'Countries' , url: ['/dashboard/country'], icon: 'fa fa-address-book' }
    ];

  constructor(private _activatedRoute: ActivatedRoute) { }

    public ngOnInit() {}
}
