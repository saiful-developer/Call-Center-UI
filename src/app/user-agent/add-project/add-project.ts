import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  imports: [FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css'
})
export class AddProject {

  projectTypes = ['Internal', 'Client', 'Research', 'Prototype'];

  
  agentProjectForm = new FormGroup ({
    fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    id:new FormControl('', [Validators.required, Validators.minLength(5)]),
    role:new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    projectTitle: new FormControl('', [Validators.required, Validators.minLength(5)]),
    projectType: new FormControl('', [Validators.required, Validators.minLength(5)]),
    assignedBy: new FormControl('', [Validators.required, Validators.minLength(4)]),
    startTime: new FormControl('', [Validators.required]),
    currentlyWorking: new FormControl('', [Validators.required]),
    endTime: new FormControl(''),
    description: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  agentProjectSubmit() {
    
  }



}
