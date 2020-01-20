import { AgencyDto } from "src/app/home/models/agency.model";

export class LoadAgencyInformation {
  static readonly type = "Load agency information";
  constructor() {}
}

export class AddAgency {
  static readonly type = "Add agency";
  constructor(public agency: AgencyDto) {}
}
