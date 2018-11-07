import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-welcome',
  template: `
    <div class="welcome" fxLayout="column" fxLayout.gt-lg="row" fxLayoutAlign="center center" fxLayoutGap="5%">
      <section *ngFor="let message of messages">
        <h1>{{message.title | uppercase}}</h1>
        <p>{{message.message}}</p>
      </section>
    </div>
  `,
  styles: [
    `
      .welcome {
        text-align: center;
      }
    `,
  ],
})
export class WelcomeComponent implements OnInit {
  messages: any[]
  constructor() {}

  ngOnInit() {
    this.messages = [
      { title: 'Activity', message: 'Stay active and enjoy better health and more fun!' },
      { title: 'Community', message: 'Get to know other people who share your passion!' },
      { title: 'Challenges', message: 'Never stop! Dive into new chanlleges every day!' },
    ]
  }
}
