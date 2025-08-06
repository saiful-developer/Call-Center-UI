import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {

  teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      img: 'https://news.miami.edu/miamiherbert/_news-assets/images/2020/10/zoomfounder-hero-940x529.jpg',
      linkedin: 'https://linkedin.com/in/alicejohnson',
      twitter: 'https://twitter.com/alicejohnson',
      facebook: 'https://facebook.com/alicejohnson',
    },
    {
      name: 'Jane Smith',
      role: 'Chief Technology Officer',
      img: 'https://t3.ftcdn.net/jpg/06/33/27/94/360_F_633279418_h3GnqYTqjC9vl0gF9wuqUOQinOWdHZAq.jpg',
      linkedin: 'https://linkedin.com/in/alicejohnson',
      twitter: 'https://twitter.com/alicejohnson',
      facebook: 'https://facebook.com/alicejohnson',
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer',
      img: 'https://t4.ftcdn.net/jpg/06/45/77/79/360_F_645777959_fNnaNoeVO4qxCNPW9MWr3gQlPFSGA9yL.jpg',
      linkedin: 'https://linkedin.com/in/alicejohnson',
      twitter: 'https://twitter.com/alicejohnson',
      facebook: 'https://facebook.com/alicejohnson',
    },
    {
      name: 'Emily Davis',
      role: 'Product Manager',
      img: 'https://thumbs.dreamstime.com/b/smiling-happy-confident-old-mature-professional-business-woman-corporate-leader-senior-middle-aged-female-executive-lady-bank-305923664.jpg',
      linkedin: 'https://linkedin.com/in/alicejohnson',
      twitter: 'https://twitter.com/alicejohnson',
      facebook: 'https://facebook.com/alicejohnson',
    }
  ];

}
