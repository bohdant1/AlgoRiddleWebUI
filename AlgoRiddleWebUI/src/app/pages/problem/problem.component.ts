import { Component, ViewEncapsulation } from '@angular/core';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [CodeEditorModule],
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProblemComponent {
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

  onCodeChanged(value: any) {
    console.log('CODE', value);
  }
}
