import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appViewcontainer]',
  standalone: true,
})
export class ViewcontainerDirective {
  constructor(public vc: ViewContainerRef) {}
}
