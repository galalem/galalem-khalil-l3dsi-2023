package com.ngx.rh.exceptions;

public class UniqueFieldTakenException extends BadRequestException {
    public UniqueFieldTakenException(String field, String label) {
        super("{\"" + field + "\":\"La valeur de " + label + " est déja utilisée\"}");
    }
    public UniqueFieldTakenException(String field, String label, Throwable cause) {
        super("{\"" + field + "\":\"La valeur de " + label + " est déja utilisée\"}", cause);
    }
}
