import { Directive } from '@angular/core';

@Directive({ selector: 'input[noahInput]', standalone: true, host: { class: 'noah-input' } })
export class NoahInputDirective {}
