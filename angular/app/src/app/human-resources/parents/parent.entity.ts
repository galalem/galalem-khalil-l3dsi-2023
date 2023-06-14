import Person from "../person.entity";

export enum MaritalStatus {
    SINGLE = "SINGLE",
    MARRIED = "MARRIED",
    DIVORCED = "DIVORCED",
    WIDOWED = "WIDOWED",
}

export class Parent extends Person {

    profession:string;
    organisation:string;
    maritalStatus:MaritalStatus;

    children:any[];

    public static override copy(origin:Parent, target?:Parent):Parent {
        if (!target)
            target = new Parent;

        Person.copy(origin, target);
        target.profession = origin.profession;
        target.organisation = origin.organisation;
        target.maritalStatus = origin.maritalStatus;
        if(origin.children?.length) target.children = origin.children.map(child => {
            if (!child.photo)
                child.photo = "assets/img/default-avatar-" + (child.gender == "FEMALE" ? "fe" : "") + "male.png"; 
            return child;
        });
        return target;
    }

    public localeMaritalStatus(): string {
		switch (this.maritalStatus) {
			case MaritalStatus.SINGLE:
				return "Célibataire";
			case MaritalStatus.MARRIED:
				return "Marié(e)";
			case MaritalStatus.DIVORCED:
				return "Divorcé(e)";
			case MaritalStatus.WIDOWED:
				return "Veuf(ve)";
		}
	}
}
export default Parent;