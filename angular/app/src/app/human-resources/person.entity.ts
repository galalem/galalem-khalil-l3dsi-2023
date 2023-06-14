import { StringUtils } from 'ngx-core';

export enum Gender {
	MALE = "MALE",
	FEMALE = "FEMALE"
}

export enum Civility {
	MR = "MR",
	MRS = "MRS",
	MISS = "MISS",
}

export enum ID {
	NIC = "NIC",
	PASSPORT = "PASSPORT",
	RP = "RP",
}

export class Address {
	street: string;
	city: string;
	state: string;
	country: string;
	code: string;

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

export class Person {

	/* -- PHOTO -- */
	private _photo: string | undefined | null;
	get photo(): string {
		if (this._photo)
			return this._photo;
		if (this.gender === Gender.FEMALE)
			return "assets/img/default-avatar-female.png";
		return "assets/img/default-avatar-male.png";
	}
	set photo(value: string | undefined | null) {
		this._photo = value;
	}

	/* -- GENERAL INFORMATIONS -- */
	id: number = 0;
	code: string;
	username: string;
	firstName: string;
	lastName: string;
	gender: Gender = Gender.MALE;
	civility: Civility = Civility.MR;

	/* -- ABOUT SECTION -- */
	about: string;

	/* -- IDENTITY -- */
	dateOfBirth: string;
	placeOfBirth: string;
	nationality: string = "TN";
	idType: ID = ID.NIC;
	idNumber: string;
	idDateOfIssue: string;
	idPlaceOfIssue: string;

	/* -- CONTACT -- */
	email: string;
	phone: string;
	phone2: string;
	address: Address = new Address();

	/* -- TIMESTAMPS -- */
	createdAt: string;
	updatedAt: string;





	/* -- Parsing -- */
	public static copy(origin: Person, target?:Person): Person {
		if (!target)
			target = new Person;
		target.id = origin.id
		target.code = origin.code
		target.photo = origin.photo
		target.username = origin.username
		target.firstName = origin.firstName
		target.lastName = origin.lastName
		target.gender = origin.gender
		target.civility = origin.civility
		target.about = origin.about
		target.dateOfBirth = origin.dateOfBirth
		target.placeOfBirth = origin.placeOfBirth
		target.nationality = origin.nationality
		target.idType = origin.idType
		target.idNumber = origin.idNumber
		target.idDateOfIssue = origin.idDateOfIssue
		target.idPlaceOfIssue = origin.idPlaceOfIssue
		target.email = origin.email
		target.phone = origin.phone
		target.phone2 = origin.phone2
		if (origin.address) target.address = Address.copy(origin.address);
		//if (origin.gpsCoordinates) target.gpsCoordinates = GPSCoordinates.copy(origin.gpsCoordinates);
		target.createdAt = origin.createdAt
		target.updatedAt = origin.updatedAt
		return target;
	}

	/* -- Locale Mapping Methods -- */
	public localeCivility(short: boolean = false): string {
		switch (this.civility) {
			case Civility.MR:
				return short ? "M." : "Monsieur";
			case Civility.MRS:
				return short ? "Mme." : "Madame";
			case Civility.MISS:
				return short ? "Mlle." : "Mademoiselle";
		}
	}
	public localeGender(): string {
		switch (this.gender) {
			case Gender.MALE:
				return "Male";
			case Gender.FEMALE:
				return "Femelle";
		}
	}
	public localeIdType(): string {
		switch (this.idType) {
			case ID.NIC:
				return "Carte d'Identité Nationale";
			case ID.PASSPORT:
				return "Passport";
			case ID.RP:
				return "Carte de Séjour";
		}
	}

	public name():string {
		return this.firstName + ' ' + this.lastName
	}
}

export default Person;