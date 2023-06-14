import { Person, Attachment, Contract, Rank } from "./person.entity";

export class Teacher extends Person {

    dateOfRecruitment:string = "";
    typeOfContract:Contract = Contract.PERMANENT;
    rank:Rank = Rank.RANK_1;
    title:string = "";

    attachments:Attachment[] = [];

    public static override copy(origin:Teacher, target?:Teacher):Teacher {
        if (!target)
            target = new Teacher;

        Person.copy(origin, target);
        target.dateOfRecruitment = origin.dateOfRecruitment;
        target.typeOfContract = origin.typeOfContract;
        target.rank = origin.rank;
        target.title = origin.title;
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
	public localeRank(): string {
		switch (this.rank) {
			case Rank.RANK_1:
				return "Grade 1";
			case Rank.RANK_2:
				return "Grade 2";
		}
	}
}

export default Teacher;