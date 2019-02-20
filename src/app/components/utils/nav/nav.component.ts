import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IMenuItemNav } from './menu.interface';
import { NavService } from './nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnChanges {

    @Input() menu: IMenuItemNav[];

    constructor(private _nav: NavService) { }

    ngOnInit() {
        this._nav.updatedMenu.subscribe((menu: IMenuItemNav[]) => {
            this.menu = menu;
        });
    }

    ngOnChanges () {
        this._nav.update(this.menu);
    }

}
