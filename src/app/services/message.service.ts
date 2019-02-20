import {Injectable, ViewContainerRef} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService) {
  }

  showSuccess(message: string, title?: string, errorCode?: number) {
    this.toastr.success(message, title);
  }

  showInfo(message: string, title?: string, errorCode?: number) {
    this.toastr.error(message, title);
  }

  showWarning(message: string, title?: string, errorCode?: number) {
    this.toastr.error(message, title);
  }

  showError(message: string, title?: string, errorCode?: number) {
    this.toastr.error(message, title);
  }
}
