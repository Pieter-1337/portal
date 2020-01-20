import { FormBuilder, FormGroup } from "@angular/forms";
import { AgencyDto } from "./agency.model";
export class AgencyForm {
  public static getForm(fb: FormBuilder) {
    const form = fb.group({
      name: [{ value: "", disabled: false }],
      street: [{ value: "", disabled: false }],
      houseNumber: [{ value: "", disabled: false }],
      postalBox: [{ value: "", disabled: false }],
      zipCode: [{ value: "", disabled: false }],
      city: [{ value: "", disabled: false }]
    });

    return form;
  }

  public static getValue(form: FormGroup): AgencyDto {
    return form.value as AgencyDto;
  }
}
