import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../../shared/services/script.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private scriptService: ScriptService) { 
    //this.scriptService.loadScripts();
  }

  ngOnInit(): void {
  }

}
