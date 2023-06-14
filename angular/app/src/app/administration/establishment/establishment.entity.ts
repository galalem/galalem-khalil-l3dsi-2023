import { StringUtils } from 'ngx-core';

export class Address {
  street:string;
  city:string;
  state:string;
  country:string;
  code:string;
  
	public static copy(origin: Address): Address {
		let address = new Address();
		address.street = origin.street;
		address.city = origin.city;
		address.state = origin.state;
		address.country = origin.country;
		address.code = origin.code;
		return address;
	}

	public isEmpty():boolean {
		return (StringUtils.isBlank(this.street) &&
			StringUtils.isBlank(this.city) &&
			StringUtils.isBlank(this.state) &&
			StringUtils.isBlank(this.country) &&
			StringUtils.isBlank(this.code));
	}

	public toString():string {
		return `${this.street}, ${this.city}, ${this.state}, ${this.country} ${this.code}.`;
	}
}


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