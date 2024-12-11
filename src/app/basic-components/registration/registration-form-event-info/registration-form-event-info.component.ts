import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MemberService } from '../../../service/Member/member.service';

@Component({
  selector: 'app-registration-form-event-info',
  templateUrl: './registration-form-event-info.component.html',
  styleUrl: './registration-form-event-info.component.css',
})
export class RegistrationFormEventInfoComponent {
  @Input() parentForm!: FormGroup;

  memberOptions: { value: string; viewValue: string }[] = [];
  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.getMemberOptions();
  }
  // Getter methods to access each form control from the parent form
  get memberIdControl(): FormControl {
    return this.parentForm.get('member') as FormControl;
  }
  // get idControl(): FormControl {
  //   return this.parentForm.get('id') as FormControl;
  // }
  // get firstNameControl(): FormControl {
  //   return this.parentForm.get('firstName') as FormControl;
  // }
  // get lastNameControl(): FormControl {
  //   return this.parentForm.get('lastName') as FormControl;
  // }
  // get birthdayControl(): FormControl {
  //   return this.parentForm.get('birthday') as FormControl;
  // }
  // get mailAddressControl(): FormControl {
  //   return this.parentForm.get('mailAddress') as FormControl;
  // }
  // get phoneNumberControl(): FormControl {
  //   return this.parentForm.get('phoneNumber') as FormControl;
  // }
  getMemberOptions(): void {
    this.memberService.getMembers().subscribe((data) => {
      this.memberOptions = data.map((data) => ({
        value: JSON.stringify({
          id: data.id,
          name: data.firstName + ' ' + data.lastName || '',
        }),
        viewValue: data.firstName + ' ' + data.lastName,
      }));
    });
  }
}
