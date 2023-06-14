import Person from "../person.entity";

export enum Contract {
    PERMANENT = "PERMANENT",
    CONTRACTOR = "CONTRACTOR"
}

export enum Role {
    ROLE_1 = "ROLE_1",
    ROLE_2 = "ROLE_2",
    ROLE_3 = "ROLE_3"
}

export class Staff extends Person {

    dateOfRecruitment:string;
    typeOfContract:Contract;
    role:Role;
    function:string;
    mailer:string;

    public static override copy(origin:Staff, target?:Staff):Staff {
        if (!target)
            target = new Staff;

        Person.copy(origin, target);
        target.dateOfRecruitment = origin.dateOfRecruitment;
        target.typeOfContract = origin.typeOfContract;
        target.role = origin.role;
        target.function = origin.function;
        target.mailer = origin.mailer;

        return target;
    }

	public localeTypeOfContract(): string {
		switch (this.typeOfContract) {
			case Contract.PERMANENT:
				return "Titulaire";
			case Contract.CONTRACTOR:
				return "Vacataire";
		}
	}

	public localeRole(): string {
		switch (this.role) {
			case Role.ROLE_1:
				return "Role 1";
			case Role.ROLE_2:
				return "Role 2";
			case Role.ROLE_3:
				return "Role 3";
		}
	}
}
export default Staff;