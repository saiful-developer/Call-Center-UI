import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-about-us',
  imports: [PageHeader],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {

  teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      img: 'assets/agent/images/about 1.jpg',
      linkedin: 'https://linkedin.com/in/alicejohnson',
      twitter: 'https://twitter.com/alicejohnson',
      facebook: 'https://facebook.com/alicejohnson',
    },
    {
      name: 'Jane Smith',
      role: 'Chief Technology Officer',
      img: 'assets/agent/images/about 2.jpg',
      linkedin: 'https://linkedin.com/in/alicejohnson',
      twitter: 'https://twitter.com/alicejohnson',
      facebook: 'https://facebook.com/alicejohnson',
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer',
      img: 'assets/agent/images/about 3.jpg',
      linkedin: 'https://linkedin.com/in/alicejohnson',
      twitter: 'https://twitter.com/alicejohnson',
      facebook: 'https://facebook.com/alicejohnson',
    },
    {
      name: 'Emily Davis',
      role: 'Product Manager',
      img: 'assets/agent/images/about 4.webp',
      linkedin: 'https://linkedin.com/in/alicejohnson',
      twitter: 'https://twitter.com/alicejohnson',
      facebook: 'https://facebook.com/alicejohnson',
    }
  ];

}
