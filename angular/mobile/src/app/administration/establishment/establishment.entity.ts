import { Address } from 'ngx-core';

export class Establishment {

  logo:string;

  id: number = 0;
  name: string;
  acronym: string;

  about :string;

  email: string;
  phone: string;
  phone2: string;

  address: Address = new Address();

  createdAt: string;
  updatedAt: string;

  public static copy(origin: Establishment, target?:Establishment): Establishment {
		if (!target)
			target = new Establishment;
		target.logo = origin.logo;
		target.id = origin.id;
		target.name = origin.name;
		target.acronym = origin.acronym;
		target.about = origin.about;
		target.email = origin.email;
		target.phone = origin.phone;
		target.phone2 = origin.phone2;
		target.address = Address.copy(origin.address);
		target.createdAt = origin.createdAt;
		target.updatedAt = origin.updatedAt;
		return target;
	}
}

export default Establishment;