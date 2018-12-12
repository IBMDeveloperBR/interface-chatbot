import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-output',
  templateUrl: './json-output.component.html',
  styleUrls: ['./json-output.component.scss']
})
export class JsonOutputComponent implements OnInit {
  output = null;
  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatService.outputAssistant.subscribe(res => this.output = res);
  }

}
