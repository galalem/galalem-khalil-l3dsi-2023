import { nationalities } from "../../../data/nationalities";
import { format } from "../../../utils/dates";
import { isBlank } from "../../../utils/strings";

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

export enum MaritalStatus {
    SINGLE = "SINGLE",
    MARRIED = "MARRIED",
    DIVORCED = "DIVORCED",
    WIDOWED = "WIDOWED",
}

export enum Contract {
    PERMANENT = "PERMANENT",
    CONTRACTOR = "CONTRACTOR"
};

export enum Role {
    ROLE_1 = "ROLE_1",
    ROLE_2 = "ROLE_2",
    ROLE_3 = "ROLE_3"
}

export enum MainParent {
    FATHER = "FATHER",
    MOTHER = "MOTHER",
    TUTOR = "TUTOR"
}

export enum Rank {
    RANK_1 = "RANK_1",
    RANK_2 = "RANK_2"
}

export class Attachment {
    id:number = 0;
    label:string = "";
    file!:File;
}

export class Address {
	street: string = "";
	city: string = "";
	state: string = "";
	country: string = "";
	code: string = "";

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
		return (isBlank(this.street) &&
			isBlank(this.city) &&
			isBlank(this.state) &&
			isBlank(this.country) &&
			isBlank(this.code));
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
	code: string = "";
	username: string = "";
	firstName: string = "";
	lastName: string = "";
	gender: Gender = Gender.MALE;
	civility: Civility = Civility.MR;

	/* -- ABOUT SECTION -- */
	about: string = "";

	/* -- IDENTITY -- */
	dateOfBirth: string = "";
	placeOfBirth: string = "";
	nationality: string = "TN";
	idType: ID = ID.NIC;
	idNumber: string = "";
	idDateOfIssue: string = "";
	idPlaceOfIssue: string = "";

	/* -- CONTACT -- */
	email: string = "";
	phone: string = "";
	phone2: string = "";
	address: Address = new Address();
    // GPSCoordinates:GPSCoordinates;

	/* -- TIMESTAMPS -- */
	createdAt: string = "";
	updatedAt: string = "";

	active:boolean = true;
	archived:boolean = false;
	deleted:boolean = false;





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
		target.active = origin.active
		target.archived = origin.archived
		target.deleted = origin.deleted
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

	public formattedDateOfBirth():string {
		return format(this.dateOfBirth, "DD MMMM YYYY");
	}

	public formattedIdDateOfIssue():string {
		return format(this.idDateOfIssue, "DD MMMM YYYY");
	}

	public formattedNationality():string {
		this.nationality = this.nationality.toUpperCase();
		return this.nationality + " - " + nationalities.find((nat) => nat.key === this.nationality)?.value;
	}

	public latestUpdate():string {
		return format(this.updatedAt, "dddd D MMMM YYYY à HH:mm");
	}
}

export default Person;