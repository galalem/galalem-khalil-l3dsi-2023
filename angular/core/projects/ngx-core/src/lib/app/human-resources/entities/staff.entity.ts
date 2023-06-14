import { Person, Contract, Role } from "./person.entity";



export class Staff extends Person {

    dateOfRecruitment:string = "";
    typeOfContract:Contract = Contract.PERMANENT;
    role:Role = Role.ROLE_1;
    function:string = "";
    mailer:string = "";

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