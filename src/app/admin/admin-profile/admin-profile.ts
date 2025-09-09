import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-profile',
  imports: [CommonModule],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css'
})
export class AdminProfile {
  
  admin = {
    name: 'Saiful Islam',
    role: 'Admin',
    email: 'admin@example.com',
    phone: '+880 1234-567890',
    address: 'Gulshan, Dhaka',
    type: 'Admin',
    status: 'Active',
    image: 'https://i.pravatar.cc/150?img=12',
    stats: [
      { label: 'Agents', value: 12 },
      { label: 'Users', value: 250 },
      { label: 'Supervisors', value: 6 }
    ]
  };

}
