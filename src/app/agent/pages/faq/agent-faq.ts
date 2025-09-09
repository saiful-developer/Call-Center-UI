import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';

//components
import { FaqSection1 } from './faq-section-1/faq-section-1';
import { FaqSection2 } from './faq-section-2/faq-section-2';
import { FaqSection3 } from './faq-section-3/faq-section-3';

@Component({
  selector: 'app-agent-faq',
  imports: [FaqSection1, FaqSection2, FaqSection3, PageHeader],
  templateUrl: './agent-faq.html',
  styleUrl: './agent-faq.css'
})
export class AgentFaq {

}
