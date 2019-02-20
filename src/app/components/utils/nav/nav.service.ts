import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IMenuItemNav } from './menu.interface';

@Injectable({
  providedIn: 'root'
})
export class NavService {

    public menu: IMenuItemNav[] = [];
    public updatedMenu: BehaviorSubject<IMenuItemNav[]> = new BehaviorSubject<IMenuItemNav[]>([]);

    constructor() { }

    public update (menu: IMenuItemNav[]) {
        this.menu = menu;
        this.updatedMenu.next(this.menu);
    }
}
