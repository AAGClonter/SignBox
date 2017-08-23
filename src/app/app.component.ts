import { Component } from '@angular/core';

import { BoxService } from './box/box.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BoxService]
})
export class AppComponent {
  title = 'app works!';
}
