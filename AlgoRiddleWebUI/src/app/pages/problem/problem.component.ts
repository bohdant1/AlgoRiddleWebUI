import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [CodeEditorModule],
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProblemComponent implements OnInit {
  id: string = '';
  theme = 'vs';

  model: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: '//Type you solution here'
  };

  options = {
    contextmenu: true,
    height:600,
    minimap: {
      enabled: true
    }
  };

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  onCodeChanged(value: any) {
    console.log('CODE', value);
  }


}
