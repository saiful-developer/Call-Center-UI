import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-projectlist',
  imports: [DatePipe, HttpClientModule, ReactiveFormsModule],
  templateUrl: './projectlist.html',
  styleUrl: './projectlist.css'
})
export class Projectlist implements OnInit {

  // searchResultProjectList: any[] = [];

  projects = [
    {
      user_name: "Saiful",
      user_id: "A101",
      user_role: "Agent",
      email: "saiful@example.com",
      project_title: "Call Center App",
      project_type: "Client",
      assigned_by: "Manager",
      start_time: "2025-08-07 10:00:00",
      end_time: "2025-08-07 18:00:00",
      project_description: "Dashboard development",
      created_at: new Date()
    }
  ];


  //reactive form
  searchForm = new FormGroup({
    search_name: new FormControl(''),
    search_id: new FormControl(''),
    search_role: new FormControl(''),
    search_email: new FormControl(''),
    search_project_title: new FormControl(''),
    search_prject_type: new FormControl(''),
    search_assigned_by: new FormControl(''),

  });

  constructor(private http: HttpClient) { }

  getProjectData(): void {
    this.http.get<any[]>('http://localhost:3000/call-center/agent/all-projects').subscribe({
      next: data => this.projects = data,
      error: err => console.error('Error fetching project data:', err)
    });
  }

  ngOnInit() {
    this.getProjectData()
  }

  getSearchedResult() {
    console.log(this.searchForm.value)
    const { search_name, search_id, search_role, search_email, search_project_title, search_prject_type, search_assigned_by } = this.searchForm.value;

    this.http.get<any[]>('http://localhost:3000/call-center/agent/search-result', {
      params: {
        search_name: search_name ?? '',
        search_id: search_id ?? '',
        search_role: search_role ?? '',
        search_email: search_email ?? '',
        search_project_title: search_project_title ?? '',
        search_prject_type: search_prject_type ?? '',
        search_assigned_by: search_assigned_by ?? ''

      }
    }).subscribe({
      next: (response) => {
        this.projects = Array.isArray(response) ? response : [response];
        console.log(this.projects);
      },
      error: (error) => {
        console.log(error)
      }
    })

  }



  



}
