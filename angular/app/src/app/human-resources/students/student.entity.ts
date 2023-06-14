import Parent from "../parents/parent.entity";
import Person, { Address } from "../person.entity";

export enum MainParent {
    FATHER = "FATHER",
    MOTHER = "MOTHER",
    TUTOR = "TUTOR"
}

export class Student extends Person {

    useParentAddress:boolean;
    mainParent:MainParent;
    parentAddress:Address;
    // parentGPSCoordinates:GPSCoordinates;

    father?:Parent;
    mother?:Parent;
    tutor?:Parent;

    public static override copy(origin:Student, target?:Student):Student {
        if (!target)
            target = new Student;

        Person.copy(origin, target);
        target.useParentAddress = origin.useParentAddress;
        target.mainParent = origin.mainParent;
        target.parentAddress = Address.copy(origin.parentAddress);
        //target.parentGPSCoordinates = GPSCoordinates.copy(origin.parentGPSCoordinates);
    
        
        if (origin.father) target.father = Parent.copy(origin.father);
        if (origin.mother) target.mother = Parent.copy(origin.mother);
        if (origin.tutor)  target.tutor  = Parent.copy(origin.tutor);

        return target;
    }
}
export default Student;