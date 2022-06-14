import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../../shared/services/script.service';

@Component({
  selector: 'app-settingpanel',
  templateUrl: './settingpanel.component.html',
  styleUrls: ['./settingpanel.component.css']
})
export class SettingpanelComponent implements OnInit {

  constructor(private scriptService: ScriptService) { 
    //this.scriptService.loadScripts();
  }

  ngOnInit(): void {
  }

}
