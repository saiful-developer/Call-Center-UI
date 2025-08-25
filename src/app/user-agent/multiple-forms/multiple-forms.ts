import { Component } from '@angular/core';

//components
import { PageHeader } from '../../components/page-header/page-header';
import { BasicFormElements } from './basic-form-elements/basic-form-elements';
import { BasicInputGroups } from './basic-input-groups/basic-input-groups';
import { CheckboControls } from './checkbo-controls/checkbo-controls';
import { DegaultForm } from './degault-form/degault-form';
import { HorizontalForm } from './horizontal-form/horizontal-form';
import { HorizontalTwoColumn } from './horizontal-two-column/horizontal-two-column';
import { InlineForms } from './inline-forms/inline-forms';
import { InputSize } from './input-size/input-size';
import { Select2 } from './select-2/select-2';
import { SelectSize } from './select-size/select-size';
import { Typeahead } from './typeahead/typeahead';


@Component({
  selector: 'app-multiple-forms',
  imports: [PageHeader, DegaultForm, HorizontalForm, BasicFormElements, InputSize, Select2, SelectSize, CheckboControls, InlineForms, HorizontalTwoColumn, Typeahead, BasicInputGroups],
  templateUrl: './multiple-forms.html',
  styleUrl: './multiple-forms.css'
})
export class MultipleForms {

}

