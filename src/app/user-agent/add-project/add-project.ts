import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { PageHeader } from '../../components/page-header/page-header';

@Component({
  selector: 'app-add-project',
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, PageHeader],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css'
})
export class AddProject {

  projectTypes = ['Internal', 'Client', 'Research', 'Prototype'];

  constructor(private http: HttpClient) { }


  agentProjectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    id: new FormControl('', [Validators.required, Validators.minLength(3)]),
    role: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    project_title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    project_type: new FormControl('', [Validators.required, Validators.minLength(5)]),
    assigned_by: new FormControl('', [Validators.required, Validators.minLength(4)]),
    start_time: new FormControl('', [Validators.required]),
    // currentlyWorking: new FormControl('', [Validators.required]),
    end_time: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  agentProjectSubmit() {

    console.log(this.agentProjectForm.value)

    this.http.post('http://localhost:3000/call-center/agent/add-projects', this.agentProjectForm.value).subscribe({
      next: (response) => {
        console.log(response);
        // this.agentProjectForm.reset();
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

}
